import 'dotenv/config';
import { OpenRouter } from '@openrouter/sdk'; // Imports

const openRouter = new OpenRouter({
  apiKey: process.env.API_KEY
});

// Variables

let SearchStarted = false





// ---------------------------

// Functions

async function TextVerify(input) {

        const completion = await openRouter.chat.send({
    chatRequest: {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
        {
            role: 'user',
            content: `       
                    Analyze the text: "${input}"
                    Classify it as YES or NO:
                    YES — if it is a statement or question that can be investigated or verified, dont is i. NO — if it makes no sense, is absurd, empty, or is a pure opinion that cannot be verified.
                    ONLY return YES or NO with no extra text.
                    Examples:
                    "Aliens built the pyramids." - YES
                    "Pizza is delicious." - NO
                    "" - NO`,
        },
        ],
    },
    });

    const anwser = completion.choices[0].message.content

    if (anwser.startsWith('YES')) return 'YES';
    if (anwser.startsWith('NO')) return 'NO';
}; 


/// let response =  await TextVerify("")

function StartSearch() {
    


}

const VerifyButton = document.getElementById('Verify')

VerifyButton.addEventListener('click', function() {
    VerifyButton.textContent = 'test';
});