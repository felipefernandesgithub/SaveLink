const navbar = document.querySelector('#navbar')
var ListLink = []
const tableLink = document.querySelector('#tableLink')

if (localStorage.getItem('ListLink')) {
    if (localStorage.getItem('ListLink') != 'n/a') {
        ListLink = JSON.parse(localStorage.getItem('ListLink'))
    }
} else {
    localStorage.setItem('ListLink', 'n/a')
    alert('Bem-vindo ao SaveLink! Ao usar nosso programa você concorda em permitir o uso de dados e cookies para o funcionamento da aplicação.')
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
    function writeName() {
        while (true) {
            name = window.prompt('Digite o nome do atalho:')
            if (name) {
                writeLink()
                break
            } else if (name == false) {
                alert('Nome inválido!')
            } else if (name == null) {
                break
            }
        }
    } writeName()

    function writeLink() {
        while (true) {
            link = window.prompt('Digite o link do atalho:')
            if (link) {
                ListLink.push([name, link])
                updateListLink()
                eraseTableLink()
                createTableLink()
                break
            } else if (link == false) {
                alert('Link inválido!')
            } else if (link == null) {
                break
            }
        }
    }
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
        if (window.confirm(`Tem certeza que deseja apagar o atalho "${link.target.innerHTML}"?`)) {
            for (i = 0; i < ListLink.length; i++) {
                if (link.target.innerHTML == ListLink[i][0]) {
                    ListLink.splice(ListLink.indexOf(ListLink[i]), 1)
                    updateListLink()
                    eraseTableLink()
                    createTableLink()
                }
            }
            deleteEffectOff()
        } else {
            deleteEffectOff()
        }
    }
}

function formDeleteDataUser() {
    if (window.confirm('Deseja excluir os seus dados? Depois que essa ação for feita não poderá ser desfeita.')) {
        localStorage.removeItem('ListLink')
        location.reload()
    }
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