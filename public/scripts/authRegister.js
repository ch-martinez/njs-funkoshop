const authForm = document.querySelector('.auth-form')
const inputs = document.querySelectorAll('.input')
let notify__box_status = false

authForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.querySelector('#name').value
    const fetchRes = await fetch('/auth/register',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            lastname: document.querySelector('#lastname').value,
            email: document.querySelector('#email').value,
            tel: document.querySelector('#tel').value,
            password: document.querySelector('#password').value,
            adress_street: document.querySelector('#adress_street').value,
            adress_nro: document.querySelector('#adress_nro').value,
            adress_detail: document.querySelector('#adress_detail').value,
            adress_city: document.querySelector('#adress_city').value,
            adress_state: document.querySelector('#adress_state').value,
            adress_zipCode: document.querySelector('#adress_zipCode').value
        })
    })

    if (fetchRes.ok) {
        const resJson = await res.json()
        if(resJson.redirect){
            notify('success', {text: resJson.message})
            setTimeout(() => {
                window.location.href = resJson.redirect // Redirije al login si el registro es ok
            }, 1500);
        }
    }else{
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