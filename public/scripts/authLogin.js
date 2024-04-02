const authForm = document.querySelector('.auth-form')
const inputs = document.querySelectorAll('.input')
let notify__box_status = false

authForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const fetchRes = await fetch('/auth/login',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        })
    })
    const resJson = await fetchRes.json()
    if (fetchRes.ok) {
        if(resJson.redirect){
            window.location.href = resJson.redirect
        }
    }else{
        notify__box_status = notify__box(fetchRes.status, resJson.message)
    }
})



inputs.forEach(input => {
    input.addEventListener("input", () =>{
        if (notify__box_status) {
            notify__box_status = notify__box_clear()
        }
    })
});