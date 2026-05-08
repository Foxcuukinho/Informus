const VerifyButton = document.getElementById('Verify')
let searching = false

const input = document.getElementById('input')

VerifyButton.addEventListener('click', async function() {

    VerifyButton.textContent = "..."
    VerifyButton.style.backgroundColor = "rgb(63, 89, 117)"
    const input_text = input.value

    if (searching == false) {

        searching = true

        const res = await fetch('/startsearch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ text: input_text})
        })
        
        const data = await res.json()
        
        if (data.ok) {
            console.log('Tudo certo!')
            console.log(data.result) 
        }       
        else {
            console.log('No')
            console.log(data)
        }

        VerifyButton.textContent = "Verify"
        VerifyButton.style.backgroundColor = ""
        searching = false
    }
})