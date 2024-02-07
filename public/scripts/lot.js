const input = document.querySelector('.lot__input')
const input__max = input.getAttribute('max')
const btn__add = document.querySelector('.lot__btn--add')
const btn__substract = document.querySelector('.lot__btn--substract')

btn__add.addEventListener('click', () => {
    let value = Number(input.value)
    if (value < 8) {
        input.value = value + 1
    }
})

btn__substract.addEventListener('click', () => {
    let value = Number(input.value)
    if (value > 1) {
        input.value = value - 1
    }
})