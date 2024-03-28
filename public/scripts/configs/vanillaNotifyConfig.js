function notify (type,msg) {
    const data = {
        title: '',
        text: '',
        fadeInDuration: 400,
        fadeOutDuration: 400,
        fadeInterval: 50,
        visibleDuration: 2500,
        postHoverVisibleDuration: 500,
        position: 'topRight',
        sticky: false,
        showClose: false
    };
    data.title = msg.title
    data.text = msg.text

    switch (type) {
        case 200:
            vNotify.success(data)
            break;
        case 201:
            vNotify.success(data)
            break;
        case 500:
            vNotify.error(data)
            break;
        case 501:
            vNotify.error(data)
            break;
        case 'delet':
            data.visibleDuration = 1250
            data.fadeInDuration = 200
            data.fadeOutDuration = 200
            vNotify.warning(data)
            break;
        default:
            vNotify.notify(data)
            break;
    }
}

/* Crea una alerta box */
function notify__box (type, msg){
    const notify__box = document.querySelector('#notify__box')
    let nClass = 'notify__box '
    switch (type) {
        case 200:
            nClass += 'notify__box--sucess'
            break;
        case 401:
            nClass += 'notify__box--danger'
            break;
        case 500:
            nClass += 'notify__box--danger'
            break;
        case 501:
            nClass += 'notify__box--info'
            break;
    }
    notify__box.innerHTML = `<div class="${nClass}">${msg}</div>`
    return true
}

/* Limpia una alerta box */
function notify__box_clear (){
    const notify__box = document.querySelector('#notify__box')
    notify__box.innerHTML = ""
    return false
}