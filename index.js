var postApi = 'http://localhost:3000/cources'

function getCources(callback) {
    fetch(postApi).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)

}

function start() {


    getCources(function (cources) {
        renderCource(cources)
    })
    hendleCreateForm()
    update()


}
function hendleCreateForm() {
    var dataElement = document.querySelector('.submit')
    dataElement.addEventListener('click', () => {
        var name = document.querySelector('input[name = "name"]').value
        var description = document.querySelector('input[name = "description"]').value
        var data = {
            name: name,
            description: description
        }
        createCource(data, function () {
            getCources(function (courceNew) {
                renderCource(courceNew)
            })
        })


    })

}
function createCource(data, callback) {

    fetch(postApi, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(function (reponse) {
            reponse.json()
        })
        .then(callback)
}
function deleteCource(courceId) {

    fetch(postApi + '/' + courceId, {
        method: 'Delete',
        headers: {
            'content-type': 'application/json'
        },


    })
        .then(function (reponse) {
            reponse.json()
        })
        .then(function () {
            var courceItem = document.querySelector('.cource__item-' + courceId)
            if (courceItem) {
                courceItem.remove()
            }
        })
}
function updateCource(courceId, data) {


    fetch(postApi + '/' + courceId, {
        method: 'Put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(function (reponse) {
            reponse.json()
        })
        .then(function () {
            getCources(renderCource)
        })
}
function renderDataInput() {
    var list = document.querySelector('.userBlock')

    var items = list.querySelectorAll('li')
    var name = document.querySelector('input[name="name"]')
    var description = document.querySelector('input[name="description"]')
    var id = document.querySelector('input[name="id"]')
    Array.from(items).map(function (item) {
        item.addEventListener('click', function () {
            var nameValue = item.querySelector('.name').innerHTML
            var descriptionValue = item.querySelector('.description').innerHTML
            var idValue = item.querySelector('.id').innerHTML
            name.value = nameValue;
            description.value = descriptionValue
            id.value = idValue
        })
    })


}
function renderCource(cources) {
    var userBlock = document.querySelector('.userBlock')

    var htmls = cources.map((cource) => {

        return `<li class="cource__item-${cource.id}">
        <span class="id">${cource.id}</span><br>
<span class="name">${cource.name}</span><br>
<span class="description">${cource.description}</span><br>
<button onclick=deleteCource(${cource.id})>Xóa</button>
</li>`
    })
    userBlock.innerHTML = htmls.join('')
    renderDataInput()
}
function update() {
    var updatebtn = document.querySelector('.update')

    if (updatebtn) {



        updatebtn.addEventListener('click', function () {
            var nameNew = document.querySelector('input[name = "name"]').value
            var descriptionNew = document.querySelector('input[name = "description"]').value
            var id = document.querySelector('input[name = "id"]').value
            var newData = {
                name: nameNew,
                description: descriptionNew
            }
            updateCource(id, newData)
        })
    }
}
start();