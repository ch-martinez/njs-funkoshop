const authForm = document.querySelector('.auth-form')
const inputs = document.querySelectorAll('.input')
let notify__box_status = false

authForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const res = await fetch('/auth/login',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        })
    })
    if (res.ok) {
        const resJson = await res.json()
        if(resJson.redirect){
            window.location.href = resJson.redirect
        }
    }else{
        const resJson = await res.json()
        notify__box_status = notify__box(res.status, resJson.message)
    }
})

inputs.forEach(input => {
    input.addEventListener("input", () =>{
        if (notify__box_status) {
            notify__box_status = notify__box_clear()
        }
    })
});