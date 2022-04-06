/*
fgt.js
version: 2.0.0
created by: Felipe Fernandes
*/

const fgt = {
    form: () => { return fgtForm() },
    title: (value) => { return fgtTitle(value) },
    caption: (value) => { return fgtCaption(value) },
    text: (value) => { return fgtText(value) },
    input: (type) => { return fgtInput(type) },
    image: (src, size) => { return fgtImage(src, size) },
    button: (value, functionClick) => { return fgtButton(value, functionClick) }
}

function fgtForm() {
    const body = document.querySelector('body')

    const background = document.createElement('div')
    background.classList.add('fgtBackground')
    body.appendChild(background)

    const form = document.createElement('form')
    form.classList.add('fgtForm')
    background.appendChild(form)

    return form
}

function fgtTitle(value) {
    const forms = document.querySelectorAll('.fgtForm')

    const h1 = document.createElement('h1')
    h1.classList.add('fgtTitle')
    forms[0].appendChild(h1)

    h1.innerText = value

    return h1
}

function fgtCaption(value) {
    const forms = document.querySelectorAll('.fgtForm')

    const h2 = document.createElement('h2')
    h2.classList.add('fgtCaption')
    forms[0].appendChild(h2)

    h2.innerText = value

    return h2
}

function fgtText(value) {
    const forms = document.querySelectorAll('.fgtForm')

    const p = document.createElement('p')
    p.classList.add('fgtText')
    forms[0].appendChild(p)

    p.innerText = value

    return p
}

function fgtInput(type) {
    const forms = document.querySelectorAll('.fgtForm')

    const input = document.createElement('input')
    input.classList.add('fgtInput')
    forms[0].appendChild(input)

    input.type = type

    return input
}

function fgtImage(src, size = 60) {
    const forms = document.querySelectorAll('.fgtForm')

    const img = document.createElement('img')
    img.classList.add('fgtImage')
    forms[0].appendChild(img)

    img.src = src

    img.style.width = `${size}%`

    return img
}

function fgtButton(value, functionClick) {
    const forms = document.querySelectorAll('.fgtForm')

    const input = document.createElement('input')
    input.classList.add('fgtButton')
    forms[0].appendChild(input)

    input.type = 'button'
    input.value = value
    
    input.addEventListener('click', () => {
        const fgtBackground = document.querySelectorAll('.fgtBackground')
        fgtBackground[0].remove()
    })

    input.addEventListener('click', functionClick)

    return input
}