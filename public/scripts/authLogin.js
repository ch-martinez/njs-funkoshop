const authForm = document.querySelector('.auth-form')

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
        return //mensajeError.classList.toggle('--hide')
    }
})