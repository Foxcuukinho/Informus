<<<<<<< HEAD
 Analyze the text: "<text>"
A topic/information is defined by its meaning, and can be:
- a fact
- a question
If the text contains only one topic, return ONLY: { "topics": [] }
If the text contains two or more topics, identify and separate each one, then return ONLY a JSON like this, with no extra text: { "topics": [ "First topic here", "Second topic here" ] }
Examples:
"Aliens built the pyramids, but they don't know!" → { "topics": [ "Aliens built the pyramids", "They don't know aliens built the pyramids" ] }"Aliens built the pyramids." → { "topics": [] }

=======
Analyze the text: "<text>"

A topic/information is defined by its meaning, and can be:

- a fact
- a question

If the text contains only one topic, return ONLY: { "topics": [] }

If the text contains two or more topics, identify and separate each one, then return ONLY a JSON like this, with no extra text: { "topics": [ "First topic here", "Second topic here" ] }

Examples:

"Aliens built the pyramids, but they don't know!" → { "topics": [ "Aliens built the pyramids", "They don't know about it" ] }

"Aliens built the pyramids." → { "topics": [] }
>>>>>>> 8723e4cf0863bf551795a07e3937179e721df283
