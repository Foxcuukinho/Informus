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
app.listen(3000, () => console.log('Servidor Rodando'));

app.post('/startsearch', async (req, res) => {
    const text = req.body.text;
    const final_result = await main(text);
    res.json(final_result);
});


async function callIA(prompt) {
    const completion = await openRouter.chat.completions.create({ 
        model: 'openrouter/free',
        messages: [{ role: 'user', content: prompt }],
    });
    return completion.choices[0].message.content;
}


async function main(input) {
    console.log('main')
    let inputInfoJSON = await analysInputAndProcess(input)
    return await inputInfoJSON

}

async function analysInputAndProcess(input) {
    console.log('2')
    return await callIA(`
            Analyze: "${input}"
            1:
            Return YES if the text is a standalone real-world claim/question that can be fact-checked.
            Return NO if conversational, opinion-only, nonsense/out of context, or dependent on previous messages.
            2:
            Extract independently verifiable topics.
            Rewrite topics to be self-contained if needed.
            Do not invent information.
            Ignore opinions.
            3:
            Match each topic with the most semantically related categories from:
            ${JSON.stringify(sources)}
            Think broadly.
            Only use matched:false if absolutely nothing relates.
            Return ONLY:
            {"checkable":true,"matched":true,"topics":[{"topic":"exact topic","urls":["https://url1.com"]}]}
            If invalid:
            {"checkable":false,"matched":false,"topics":[]}
`);
}
