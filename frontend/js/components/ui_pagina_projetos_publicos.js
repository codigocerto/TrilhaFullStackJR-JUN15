//importa a função pra receber o array de projetos
import { importProjetosPublicos } from "../data/data.js";

//elementos da página de exibição
const projetoView = $("#view"); 
const listaProjetos = $("#lista-projetos");
const titulo = $("#titulo-lista");
const anchor = $("#anchor"); //anchor no topo da lista com o título da lista

//adiciona a ação de rolar ao topo da lista ao clicar no anchor
anchor.on("click", () => {
    listaProjetos[0].scrollTop = 0;
})


//criação da página com informações de cada projeto
function criarPaginaProjeto(nome, descricao, prazo, criacao) {
    projetoView.empty();
    
    //cria objeto Date a partir da string de datas de criação e prazo, com adição de 'Z' para horário em UTC
    const dateCriacao = new Date(criacao + 'Z');
    const datePrazo = new Date(prazo  + 'Z');

    //formatação das datas para horário e localização em pt-BR
    const labelCriacao = `<p>Criado: ${dateCriacao.toLocaleDateString('pt-BR')} </p>`;
    const labelPrazo = prazo ? `<p>Prazo: ${datePrazo.toLocaleDateString('pt-BR')}</p>` : "";

    //criação do container com as informações do projeto
    const projetoViewBox = $(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <span id="horario" class="text-muted">${labelPrazo}${labelCriacao}</span>
                <h1 class="text-body-emphasis mb-4">${nome}</h1>
                <p class="lead">${descricao}</p>
            </div>
        </div>`);

    //append do container na caixa de exibição
    projetoView.append(projetoViewBox);

}

//Essa função recebe a data do prazo e retorna um texto simples indicando o tempo restante
export function tempoRestante(prazo){
    
    if(!prazo){
        return "";
    }
    
    const nowDate = Date.now();
    const prazoDate = Date.parse(prazo + 'Z')

    const dataDoPrazo = new Date(prazoDate)
    const dataDeAgora = new Date(nowDate);

    //retorna o ano do prazo, caso não seja o ano atual
    if(dataDoPrazo.getFullYear() > dataDeAgora.getFullYear()){
        return dataDoPrazo.getFullYear()
    }

    //retorna o mês do prazo, caso não seja o mês atual
    if(dataDoPrazo.getMonth() > dataDeAgora.getMonth()){
        return dataDoPrazo.toLocaleDateString('pt-BR', {month: "short"}, { timeZone: 'UTC'})
    }

    //retorna o número dias
    if(dataDoPrazo.getDate() - dataDeAgora.getDate() > 1){
        return dataDoPrazo.getDate() - dataDeAgora.getDate() + " dias";
    }
    
    if(dataDoPrazo.getDate() - dataDeAgora.getDate() > 0){
        return "Amanhã";
    }
    
    if(dataDoPrazo.getDate() - dataDeAgora.getDate() === 0){
        return "Hoje";
    }
    
    //se o prazo tenha passado, retorna vencido
    return "Vencido";

}

//função que cria um item da lista , que mostra as informações do projeto ao ser clicado
function criarItemLista(id, nome, descricao, prazo, criacao) {

    const itemLista = $(`<a id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1 px-2">${nome}</strong>
                                <small>${tempoRestante(prazo)}</small>
                            </div>
                        </a>`);

    itemLista.on("click", () => {
        criarPaginaProjeto(nome, descricao, prazo, criacao);
    })
    return itemLista;
}

//cria toda página de exibição do projeto, chamada ao clicar na aba Projetos
export async function showProjetosPublicos() {
    let projetos = importProjetosPublicos();
    listaProjetos.empty();
    projetoView.empty();
    titulo.empty();
    
    //antes de um projeto ser seleciona, mostra "Selecione um projeto" na caixa de informação
    const projetoViewBox = $(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <h1 class="text-body-emphasis">Selecione um Projeto</h1>
            </div>
        </div>`);
        //caso não haja projetos, mostra "Adicione um Projeto"
        if(!projetos.length){
        projetoViewBox.find("h1").text("Adicione um Projeto");
    }
    projetoView.append(projetoViewBox);
    
    //ícone e título da lista
    const icon = $(`
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
        </svg>`)

    titulo.append(icon);
    titulo.append(`<h3>Projetos Públicos<h3>`);


    //cria um item da lista pra cada projeto armazenado no array de projetos
    projetos.forEach(projeto => {

        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
        listaProjetos.append(itemLista);
    });
}