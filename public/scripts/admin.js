const logout_btn = document.querySelector('#logout_btn')

logout_btn.addEventListener('click', () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
})