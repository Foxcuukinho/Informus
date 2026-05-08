import 'dotenv/config';
import OpenAI from 'openai';
import express from 'express';
import sources from './sources.json' assert { type: 'json'};

const openRouter = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
});

const app = express();
app.use(express.static('frontend'));
app.use(express.json());
app.listen(3000, () => console.log('rodando'));

async function callApi(prompt) {
    const completion = await openRouter.chat.completions.create({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
    });
    return completion.choices[0].message.content;
}

async function textVerify(text) {
    console.log('TextVerify Chamado')
    const result = await callApi(`
    Analyze the text: "${text}"
    Classify it as YES or NO:
    YES — if it is a clear, standalone statement or question about the real world that can be fact-checked or investigated (e.g., "Aliens built the pyramids", "Is the Earth flat?").
    NO — if it is:
    - A conversational fragment or reply (e.g., "and I asked?", "really?", "ok")
    - A pure opinion with no verifiable claim (e.g., "Pizza is delicious")
    - Empty, nonsensical, or out of context
    - A question that only makes sense inside a conversation
    ONLY return YES or NO. No punctuation, no spaces, no explanations.
    `);
    return result.trim();
}

async function separateTopics(text) {
    const result = await callApi(`
        Analyze the text: "${text}"
        
        A topic is a verifiable claim or question about the real world that can be fact-checked independently.
        If a topic would be ambiguous without the surrounding text, rewrite it to be self-contained.
        Do not invent or infer topics that are not explicitly present in the text.
        Ignore opinions or statements that cannot be verified (e.g. "it's amazing", "I think it's wrong").
        
        If the text contains only one topic, return ONLY:
        { "topics": ["Topic here"] }
        
        If the text contains two or more topics, return ONLY:
        { "topics": ["First topic here", "Second topic here"] }
    `);

    try {
        return JSON.parse(result.trim());
    } catch {
        return { topics: [] };
    }
}

async function verifyTrueSources(topics) {
    console.log('verifyTrueSources chamado')
    const result = await callApi(`
        Analyze the text: "${JSON.stringify(topics)}"

        For each topic, find the most semantically related category in the sources below.
        Think broadly: a claim about aliens and pyramids relates to "História" and "Espaço e Astronomia".
        Always try to find at least one match. Only return matched: false if the topic is truly unrelated to any category.

        Sources:
        ${JSON.stringify(sources)}

        Return ONLY valid JSON in this format:
        { "matched": true, "topics": [{ "topic": "exact topic from input", "urls": ["https://url1.com"] }] }

        If no topics match any category, return ONLY:
        { "matched": false, "topics": [] }
    `);

    try {
        return JSON.parse(result.trim());
    } catch {
        return { matched: false, topics: [] }
    }
}

async function startSearch(text) {
    console.log('StartSearch Chamado')
    const TextVerification = await textVerify(text)

    if (TextVerification === "YES") {
        const topics_list = await separateTopics(text)
        const result = await verifyTrueSources(topics_list)
        return { ok: true, result }
    } else {
        return { ok: false }
    }
}

app.post('/startsearch', async (req, res) => {
    const text = req.body.text;
    const final_result = await startSearch(text);
    res.json(final_result);
});