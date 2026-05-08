Observe these JSON files:

First JSON (topics extracted from the text): `<topics_json>`  
Second JSON (trusted sources): `<sources_json>`

For each topic in the first JSON, find the most semantically related topic(s) in the second JSON — even if the words don't match exactly. Think broadly: a claim about aliens and pyramids relates to "História" and "Espaço e Astronomia". A conspiracy theory about vaccines relates to "Vacinas" and "Saúde". A question about a law relates to "Leis e Legislação".

Always try to find at least one match. Only return `matched: false` if the topic is truly unrelated to any source category.

**Important:**

- The `"topic"` field in the output **must contain the exact topic string from `<topics_json>`**.
- Do **not** replace it with the category name from `<sources_json>`.
- The `"urls"` must come from the matched topic(s) in `<sources_json>`.

If matches are found, return **ONLY** a JSON in this format:

`{   "matched": true,   "topics": [     {       "topic": "exact topic from topics_json",       "urls": ["https://url1.com", "https://url2.com"]     }   ] }`

If no topics match, return **ONLY**:

`{   "matched": false,   "topics": [] }`