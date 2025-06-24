const produtosContainer = document.querySelector('#produtos section');

const avaliacaoContainer = document.getElementById('cliente-avaliacao');
const avaliacoesBtns = document.querySelectorAll('#avaliacoes button');

//--------------------------------------------------

let produtos = [
    [
        { nome: "Biscoito Presuntinho", img: "p0.png", preco: "5.99" },
        { nome: "Bisnaguinha", img: "p1.png", preco: "4.20" },
        { nome: "Açúcar União", img: "p2.png", preco: "6.70" }
    ],

    [
        { nome: "Biscoito Maizena", img: "p3.png", preco: "5.00" },
        { nome: "Leite Condensado", img: "p4.png", preco: "7.99" },
        { nome: "Sardinha Ralada", img: "p5.png", preco: "6.00" }
    ]
];

let avaliacoes = [
    { nome: "Fernanda Torres", imagem: "", estrelas: 5 },
    { nome: "Mauricio Garcia", imagem: "", estrelas: 3 },
    { nome: "Patricia Prione", imagem: "", estrelas: 4 },
    { nome: "Roberto Silva", imagem: "", estrelas: 5 }
];

//--------------------------------------------------

// Defini qual é o display inicial
let produto_display = 0;
let av_display = 0;

// Inicializa o tamanho do vetor 
let qtd_produtos = produtos.length;
let qtd_avaliacoes = avaliacoes.length;

//--------------------------------------------------

function renderizarSlideProduto() {
    // Inicializa variavel com tag botao esquerdo
    let html = "<button class='inv' title='botao-esquerdo'>&#10132;</button>";

    // Armazena do prox display a ser renderizado
    const display = produtos[produto_display];
    
    // Adiciona cada um dos 3 produtos do display a variavel html 
    for (const produto of display) {
        
       html += `
        <figure class="produto">
            <img src="./imagens/produtos/${produto.img}">
            <figcaption>${produto.nome}
            <span class="preco">${produto.preco}</span>
            </figcaption>
        </figure>`;
    }

    // Adiciona o botao direito
    html += "<button title='botao-direito'>&#10132;</button>";
    
    // Sobreescreve conteudo do slideShow produto
    produtosContainer.innerHTML = html;
}

renderizarSlideProduto();

// Adiciona evento de click para botao de produtos
produtosContainer.addEventListener('click', (event) => {

    //verifica se a tag clicada possui o titulo botao-esquerdo
     if (event.target.title === 'botao-esquerdo') {

        //Renderizando o conjunto de imagens anterior (display de 3 imagens)
        if (produto_display === 0) {
            produto_display = qtd_produtos - 1;
        } else {
            produto_display--;
        }

        renderizarSlideProduto();

      //verifica se a tag clicada possui o titulo botao-direito
    } else if (event.target.title === 'botao-direito') {

        //Renderizando o prox conjunto de imagens (display de 3 imagens)
        if (produto_display === qtd_produtos - 1) {
            produto_display = 0;
        } else {
            produto_display++;
        }

        renderizarSlideProduto();
    }
});

//-----------------------------------------------------

//Renderiza incialmente o primeiro cliente
avaliacaoContainer.innerHTML = `
    <section>
        <img src="./imagens/produtos/${avaliacoes[av_display].imagem}">
        <p class="maiusculo">${avaliacoes[av_display].nome}</p>
    </section>

    <p>${'★'.repeat(avaliacoes[av_display].estrelas)}</p>
`;

//precisam estar aqui para não serem excluidas pela DOM
const clienteImg = document.querySelector('#cliente-avaliacao section img');
const clienteNome = document.querySelector('#cliente-avaliacao section p:last-of-type');
const clienteNota = document.querySelector('#cliente-avaliacao > p:last-of-type');

// Muda os informações das tags para o cliente prox/anterior
function renderizarAvaliacoes() {
    let nota = Number(avaliacoes[av_display].estrelas)
    if (clienteImg) {
        clienteImg.src = `./imagens/produtos/${avaliacoes[av_display].imagem}`;
    }

    clienteNome.innerHTML = avaliacoes[av_display].nome;

    clienteNota.innerHTML = '★'.repeat(nota);
}

// Cria os eventos de click para cada botão de #avaliacoes
avaliacoesBtns.forEach((botao) => {
    botao.addEventListener('click', ()=> {

        //Se for o botao da esquerda
        if(botao.classList.contains('inv')) {
            if (av_display === 0) {
                av_display = qtd_avaliacoes - 1;
            } else {
                av_display--;
            }

            renderizarAvaliacoes();
        }
        else
        {
            if (av_display === qtd_avaliacoes - 1) {
                av_display = 0;
            } else {
                av_display++;
            }

            renderizarAvaliacoes()
        }
    });    
});