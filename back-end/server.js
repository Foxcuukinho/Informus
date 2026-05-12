import 'dotenv/config';
import OpenAI from 'openai';
import express from 'express';
import prompts from './prompts.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const sources = JSON.parse(
  readFileSync(new URL('./sources.json', import.meta.url))
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openRouter = new OpenAI({
    apiKey: process.env.IA_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1'
});

const app = express();

app.use(express.static(join(__dirname, '../front-end')));
app.use(express.json());

app.listen(3000, () => {
    console.log('[SERVER] Rodando na porta 3000');
});

app.post('/startsearch', async (req, res) => {

    try {

        const text = req.body.text;

        console.log('[REQUEST]', text);

        const finalResult = await main(text);

        res.json(finalResult);

    } catch (err) {

        console.log('[ROUTE_ERROR]', err.message);

        res.status(500).json({
            error: 'Erro interno no servidor'
        });
    }
});

async function callIA(prompt) {

    try {
        const completion = await openRouter.chat.completions.create({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        return completion.choices?.[0]?.message?.content;

    } catch (err) {
        console.log('[IA_MAIN_ERROR]', err.message);
        const completion = await openRouter.chat.completions.create({
            model: 'openrouter/free',
            provider: {
                ignore: [
                    'nvidia/nemotron-nano-9b-v2:free',
                    'nvidia/nemotron-nano-12b-v2:free',
                    'lfm/lfm2-1.2b:free'
                ]
            },
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        return completion.choices?.[0]?.message?.content;
    }
}

async function main(input) {

    const claimsData = await generateClaimsData(input);

    return await searchToVerdict(claimsData);
}

function makeClaimDataPrompt(input) {
    const prompt =  `
    
        Analyze the following text: "${input}"
    
        ${prompts[0]}

        ${JSON.stringify(sources)}

        ${prompts[1]}
        `

        return prompt
}

async function generateClaimsData(input) {

    const prompt = makeClaimDataPrompt(input)
    const raw = await callIA(prompt);

    try {

        return JSON.parse(raw.trim());

    } catch (err) {

        console.log('[JSON_PARSE_ERROR]');
        console.log(raw);

        return {
            checkable: false,
            matched: false,
            claims: []
        };
    }
}

async function searchToVerdict(claimsData) {

    for (const claim of claimsData.claims) {

        if (claim.urls.length > 0) {

            console.log('[SEARCH]', claim.claimText);

            claim.searchUrl = await searchSerper(
                claim.claimText,
                claim.urls[0]
            )
        }
    }

    return claimsData;
}

async function searchSerper(claimText, url) {

    const domain = new URL(url).hostname;

    const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
            'X-API-KEY': process.env.SERPER_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: `site:${domain} ${claimText}`,
            gl: 'br',
            hl: 'pt'
        })
    });

    const data = await response.json();

    return data.organic
        ?.slice(0, 3)
        .map(result => result.link) || [];
}