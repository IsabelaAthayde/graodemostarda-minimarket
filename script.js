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
    { nome: "Fernanda Torres", imagem: "perfil.png", estrelas: 5, desc: "Esse mini-mercado do Encantado é uma ótima opção! Sempre encontro produtos fresquinhos e com preços justos. O atendimento é muito bom, e os funcionários são bem atenciosos. Recomendo para quem mora por aqui!"},
    { nome: "Miranda Garcia", imagem: "perfil.png", estrelas: 5, desc: "Eu adoro fazer compras aqui! Há uma grande variedade de produtos, a qualidade é sempre alta e, o melhor, as filas são rápidas. Com certeza voltarei mais vezes!"},
    { nome: "Roberto da Costa", imagem: "perfil.png", estrelas: 5, desc: "Fui muito bem atendido no mercadinho. O ambiente é agradável e tudo está sempre organizado. Os funcionários são simpáticos e prontos para ajudar."},
    { nome: "Patricia Amaral", imagem: "perfil.png", estrelas: 4, desc: "Atende bem às necessidades do bairro, o ambiente é sempre agradável. Além disso, é o lugar mais próximo da minha casa, o que facilita bastante no dia a dia. Também considero um local seguro, o que é muito importante. "}
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
const clienteDesc = document.getElementsByClassName('texto-avaliacao')[0];

//Renderiza incialmente o primeiro cliente
 clienteDesc.innerHTML = avaliacoes[av_display].desc;
avaliacaoContainer.innerHTML = `
    <section>
        <img src="./imagens/produtos/${avaliacoes[av_display].imagem}">
        <p class="maiusculo">${avaliacoes[av_display].nome}</p>
    </section>

    <p>${'★'.repeat(avaliacoes[av_display].estrelas)}</p>
`;

//precisam estar aqui para não serem excluidas pela DOM
const clienteNome = document.querySelector('#cliente-avaliacao section p:last-of-type');
const clienteNota = document.querySelector('#cliente-avaliacao > p:last-of-type');

// Muda os informações das tags para o cliente prox/anterior
function renderizarAvaliacoes() {
    let nota = Number(avaliacoes[av_display].estrelas)
    clienteDesc.innerHTML = avaliacoes[av_display].desc;
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