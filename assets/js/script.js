const form = document.querySelector('.formAdd')
form.addEventListener('submit', function (ev) {
    ev.preventDefault() //não irá atualizar a pagina

    let pessoa = receberValoresDaTabela(form) //dados vindo do formulario

    let imagemCodificada = converterParaBase64(pessoa.imagem)
    localStorage.setItem('imagem', imagemCodificada) //add imagem no localStorage 
    console.log(imagem)
    
    let row

    switch (pessoa.time) {
        case 'fullStack':
            row = document.querySelector('.fullStack')
            pessoa.corFundo = '#5cd85c'
            break;

        case 'frontEnd':
            row = document.querySelector('.frontEnd')
            pessoa.corFundo = '#0275d8'
            break;

        case 'backEnd':
            row = document.querySelector('.backEnd')
            pessoa.corFundo = '#d8d402'
            break;

        case 'dataScience':
            row = document.querySelector('.dataScience')
            pessoa.corFundo = '#d80202'
            break;

        case 'mobile':
            row = document.querySelector('.mobile')
            pessoa.corFundo = '#66717b'
            break;

        case 'uxEDesign':
            row = document.querySelector('.uxEDesign')
            pessoa.corFundo = '#02d1d8'
            break;

    }

    row.appendChild(montarCard(pessoa)) //add o cargo na linha
})

const receberValoresDaTabela = (form) => {
    let pessoa = {                      //criando uma pessoa os dados do form
        nome: form.nome.value,          //recebendo o nome do form
        cargo: form.cargo.value,        //recebendo o cargo do form
        imagem: form.imagem.files[0],   //recebendo a imagem do form
        time: form.time.value           //recebendo o time do form

    }

    return pessoa
}

function adcionarDescricao(pessoa) {
    let nomeDescricao = document.createElement('h4') //criando um titulo h4 para nome da pessoa
    nomeDescricao.textContent = pessoa.nome //adicionando o nome da pessoa na tag h4
    nomeDescricao.style.color = pessoa.corFundo

    let cargoDescricao = document.createElement('p') //add o cargo da pessoa ao paragrafo p
    cargoDescricao.textContent = pessoa.cargo
    cargoDescricao.style.color = pessoa.corFundo


    let figcaption = document.createElement('figcaption') //criando um figcaption
    figcaption.classList.add('text-center') //add uma classe de html ao figcaption
    figcaption.appendChild(nomeDescricao) //add o nome dentro do figcaption
    figcaption.append(cargoDescricao)//add o cargo dentro do figcaption

    return figcaption
}

function montarCard(pessoa) {

    let foto = document.createElement('img')

    let figure = document.createElement('figure') //criando uma figura
    figure.classList.add('card') //add classe ao figure
    figure.classList.add('ms-3')
    figure.classList.add('col-md-3')
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, ' + pessoa.corFundo + ' 40%)'
    figure.appendChild(adcionarDescricao(pessoa)) //add figcaption 'descrição' ao figure

    return figure

}

function converterParaBase64(imagem) {
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsDataURL(imagem)
        reader.onload = function () {
            let imagemCodificada = reader.result.split(',')[1]
            resolve(imagemCodificada)

        }
    })
}