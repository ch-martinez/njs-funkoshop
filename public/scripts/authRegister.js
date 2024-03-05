const authForm = document.querySelector('.auth-form')

authForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.querySelector('#name').value
    const res = await fetch('/auth/register',{
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
})