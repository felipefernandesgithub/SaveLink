/*
saveLink
version: 1.0.1
created by: Felipe Fernandes
*/
const navbar = document.querySelector('#navbar')
var ListLink = []
const tableLink = document.querySelector('#tableLink')

if (localStorage.getItem('ListLink')) {
    if (localStorage.getItem('ListLink') != 'n/a') {
        ListLink = JSON.parse(localStorage.getItem('ListLink'))
    }
} else {
    localStorage.setItem('ListLink', 'n/a')
    const form = formGenerator()
    addBlockFormGenerator(titleForm('Bem-vindo!'), 0)
    addBlockFormGenerator(paragraphForm('Bem-vindo ao SaveLink! Ao usar nosso programa você concorda em permitir o uso de dados e cookies para o funcionamento da aplicação.'), 0)
    addBlockFormGenerator(buttonForm('Aceito'), 0)
}

navbar.addEventListener('click', navbarOptions)

function navbarOptions(element) {
    if (buttonsInNavbar[element.target.id]()) {
        buttonsInNavbar[element.target.id]()
    }
}

const buttonsInNavbar = {
    addLinkButton: () => { formWhereUserAddLink() },
    deleteLinkButton: () => { formDeleteLink() },
    deleteDataUser: () => { formDeleteDataUser() }
}

function updateListLink() {
    localStorage.setItem('ListLink', JSON.stringify(ListLink))
    ListLink = JSON.parse(localStorage.getItem('ListLink'))
}

function formWhereUserAddLink() {
    var name, link
    const form = formGenerator()
    addBlockFormGenerator(paragraphForm('Nome:'), 0)
    name = inputForm('text')
    addBlockFormGenerator(name, 0)

    addBlockFormGenerator(paragraphForm('Link:'), 0)
    link = inputForm('text')
    addBlockFormGenerator(link, 0)
    const box = boxForm()
    addBlockFormGenerator(box, 0)
    box.appendChild(buttonForm('Adicionar', () => {
        name = name.value
        link = link.value
        if (name == '' || link == '') {
            const form = formGenerator()
            addBlockFormGenerator(titleForm('Valor inválido!'), 0)
            addBlockFormGenerator(buttonForm('Ok'), 0)
        } else {
            ListLink.push([name, link])
            updateListLink()
            eraseTableLink()
            createTableLink()
        }
    }))
    box.appendChild(buttonForm('Cancelar'))
}

function formDeleteLink() {
    const cellName = document.querySelectorAll('.cellName')
    function deleteEffectOn() {
        cellName.forEach((name) => {
            name.style.backgroundColor = '#ec7241'
            name.style.fontWeight = 'bold'
            name.style.cursor = 'pointer'
            name.addEventListener('click', deleteLink)
        })
    } deleteEffectOn()

    function deleteEffectOff() {
        cellName.forEach((name) => {
            name.style.backgroundColor = 'white'
            name.style.fontWeight = 'normal'
            name.style.cursor = 'text'
            name.removeEventListener('click', deleteLink)
        })
    }

    function deleteLink(link) {
        const form = formGenerator()
        addBlockFormGenerator(titleForm('AVISO!'), 0)
        addBlockFormGenerator(paragraphForm(`Tem certeza que deseja apagar o atalho "${link.target.innerHTML}"?`), 0)
        const box = boxForm()
        addBlockFormGenerator(box, 0)
        box.appendChild(buttonForm('Ok', () => {
            for (i = 0; i < ListLink.length; i++) {
                if (link.target.innerHTML == ListLink[i][0]) {
                    ListLink.splice(ListLink.indexOf(ListLink[i]), 1)
                    updateListLink()
                    eraseTableLink()
                    createTableLink()
                }
            }
            deleteEffectOff()
        }))
        box.appendChild(buttonForm('Cancelar', () => {
            deleteEffectOff()
        }))
    }
}

function formDeleteDataUser() {
    const form = formGenerator()
    addBlockFormGenerator(titleForm('AVISO!'), 0)
    addBlockFormGenerator(paragraphForm('Deseja excluir os seus dados? Depois que essa ação for feita não poderá ser desfeita.'), 0)
    const box = boxForm()
    addBlockFormGenerator(box, 0)
    box.appendChild(buttonForm('Ok', () => {
        localStorage.removeItem('ListLink')
        location.reload()
    }))
    box.appendChild(buttonForm('Cancelar'))
}

function createTableLink() {
    for (i = 0; i < ListLink.length; i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td')
        td1.classList.add('cellName')
        td1.innerHTML = ListLink[i][0]
        tr.appendChild(td1)

        var td2 = document.createElement('td')
        td2.classList.add('cellLink')
        var a = document.createElement('a')
        a.href = ListLink[i][1]
        a.target = '_blank'
        a.innerText = 'Acessar'
        td2.appendChild(a)
        tr.appendChild(td2)

        tableLink.appendChild(tr)
    }
} createTableLink()

function eraseTableLink() {
    tableLink.innerHTML = ''
}
