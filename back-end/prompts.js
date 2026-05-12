const generateClaimsDataPrompt = [
    `1. Determine whether the text contains standalone factual claims or factual questions 
        that can be independently verified in the real world.
        Return "checkable": true if at least one factual/verifiable claim or question exists.
        Return "checkable": false if the text is conversational, opinion-only, nonsense, roleplay, emotional,
        dependent on previous context, or impossible to verify.

        2. Extract independently verifiable factual claims/questions.
        Rules: Preserve the original meaning, rewrite claims to be fully self-contained when necessary, 
        include implied context for clarity, keep the actual assertion being made, keep claims concise, 
        do NOT generalize into themes/categories, do NOT summarize into subjects, do NOT invent unrelated information,
        ignore opinions/jokes/emotions/sarcasm/speculation, avoid duplicates.

        Examples:
        Input: "A terra é plana"
        GOOD: "The Earth is flat"
        BAD: "Flat Earth Theory"
    `,
    `3. For each extracted claim, match the most semantically relevant URLs/categories from the JSON
        Rules: Think broadly and semantically, claims may match multiple URLs, never invent URLs, only use URLs from the source list.
        If no URLs match a specific claim, still include the claim with an empty "urls" array.
        Only use "matched": false at the top level if NO claims could be matched to ANY URL.

        OUTPUT RULES:
        Return ONLY valid raw JSON.

        VALID RESPONSE FORMAT:
        {"checkable":true,"matched":true,"claims":[{"claimText":"exact rewritten claim","urls":["https://example.com"]}]}
    `
]

export default generateClaimsDataPrompt