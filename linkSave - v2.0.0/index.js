/*
saveLink
version: 2.0.0
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
    fgt.form()
    fgt.title('Bem-vindo!')
    fgt.text('Bem-vindo ao SaveLink! Ao usar nosso programa você concorda em permitir o uso de dados e cookies para o funcionamento da aplicação.')
    fgt.button('aceito', () => { localStorage.setItem('ListLink', 'n/a') })
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
    fgt.form()
    fgt.caption('Nome:')
    var name = fgt.input('text')
    fgt.caption('Url:')
    var link = fgt.input('text')
    fgt.caption('Url do icon:')
    var iconLink = fgt.input('text')
    fgt.button('salvar', () => {
        if (name.value == '' || link.value == '') {
            fgt.form()
            fgt.title('Valor inválido!')
            fgt.text('Campos podem estar vazios.')
            fgt.button('ok')
        } else {
            if (iconLink.value == '') {
                ListLink.push([name.value, link.value, 'n/a'])
            } else {
                ListLink.push([name.value, link.value, iconLink.value])
            }

                        updateListLink()
            eraseTableLink()
            createTableLink()
        }
    })
    fgt.button('cancelar')
}

function formDeleteLink() {
    fgt.form()
    for (i = 0; i < ListLink.length; i++) {
        const btn = fgt.button(ListLink[i][0], () => {
            for (i = 0; i < ListLink.length; i++) {
                if (ListLink[i][0] == btn.value) {
                    ListLink.splice(i, 1)
                    updateListLink()
                    eraseTableLink()
                    createTableLink()
                }
            }
        })
        btn.style.display = 'block'
    }
    fgt.button('cancelar')
}

function formDeleteDataUser() {
    fgt.form()
    fgt.title('AVISO!')
    fgt.text('Deseja excluir os seus dados? Depois que essa ação for feita não poderá ser desfeita.')
    fgt.button('excluir', () => {
        localStorage.removeItem('ListLink')
        location.reload()
    })
    fgt.button('cancelar')
}

function createTableLink() {
    const tableLink = document.querySelector('#tableLink')

    for (i = 0; i < ListLink.length; i++) {
        const link = document.createElement('a')
        link.classList.add('nameLink')
        link.href = ListLink[i][1]
        link.target = '_blank'

        const div1 = document.createElement('div')
        div1.classList.add('boxLink')
        link.appendChild(div1)

        const div2 = document.createElement('div')
        div2.classList.add('boxIconLink')
        div1.appendChild(div2)

        const img = document.createElement('img')
        div2.appendChild(img)

        if (ListLink[i][2] == 'n/a') {
            img.src = 'imgs/icon.png'
        } else {
            img.src = ListLink[i][2]
        }

        const p = document.createElement('p')
        div1.appendChild(p)

        p.innerText = ListLink[i][0]

        tableLink.appendChild(link)
    }
} createTableLink()

function eraseTableLink() {
    tableLink.innerHTML = ''
}