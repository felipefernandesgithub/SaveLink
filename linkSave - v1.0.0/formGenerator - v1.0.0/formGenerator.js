/*
form generator
version: 1.0.0
created by: Felipe Fernandes
*/

function formGenerator() {
    const background = document.createElement("div")
    background.classList.add('formGeneratorBackground')

    const form = document.createElement("form")
    form.classList.add('formGeneratorForm')
    background.appendChild(form)

    const body = document.querySelector('body')
    body.appendChild(background)

    return background
}

function addBlockFormGenerator(block, form) {
    const forms = document.querySelectorAll('.formGeneratorForm')
    forms[form].appendChild(block)
}

function titleForm(value) {
    const h1 = document.createElement("h1")
    h1.classList.add('formGeneratorTitle')

    h1.innerHTML = value

    return h1
}

function paragraphForm(value) {
    const p = document.createElement("p")
    p.classList.add('formGeneratorParagraph')

    p.innerHTML = value

    return p
}

function inputForm(type, placeholder, value) {
    const input = document.createElement("input")
    input.classList.add('formGeneratorInput')
    input.type = type

    if (placeholder != undefined) {
        input.placeholder = placeholder
    }

    if (value != undefined) {
        input.value = value
    }

    return input
}

function buttonForm(value, functionElement) {
    const button = document.createElement("input")
    button.type = 'button'
    button.value = value
    button.classList.add('formGeneratorButton')

    button.addEventListener('click', () => {
        const formGeneratorBackground = document.querySelectorAll('.formGeneratorBackground')
        formGeneratorBackground[0].remove()
    })

    if (functionElement) {
        button.addEventListener('click', functionElement)
    }

    return button
}

function boxForm() {
    const div = document.createElement('div')

    return div
}

function clickForm(element, functionElement) {
    document.querySelector(element).addEventListener('click', functionElement)
}