import { getListaProjetos } from "./data.js";

const projetoView = $("#view");
const listaProjetos = $("#lista-projetos");
const titulo = $("#titulo-lista");
const anchor = $("#anchor");

anchor.on("click", () => {
    listaProjetos[0].scrollTop = 0;
})


function criarPaginaProjeto(nome, descricao, prazo, criacao) {

    
    projetoView.empty();
    const dateCriacao = new Date(criacao + 'Z');
    const datePrazo = new Date(prazo  + 'Z');

    const labelCriacao = `<p>Criado: ${dateCriacao.toLocaleDateString('pt-BR')} </p>`;
    const labelPrazo = prazo ? `<p>Prazo: ${datePrazo.toLocaleDateString('pt-BR')}</p>` : "";

    const projetoViewBox = $(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <span id="horario" class="text-muted">${labelPrazo}${labelCriacao}</span>
                <h1 class="text-body-emphasis mb-4">${nome}</h1>
                <p class="lead">${descricao}</p>
            </div>
        </div>`);

    projetoView.append(projetoViewBox);

}

//Essa função recebe a data do prazo e retorna um texto simples indicando o prazo
export function tempoRestante(prazo){
    
    if(!prazo){
        return "";
    }
    
    const nowDate = Date.now();
    const prazoDate = Date.parse(prazo + 'Z')

    const dataDoPrazo = new Date(prazoDate)
    const dataDeAgora = new Date(nowDate);

    if(dataDoPrazo.getFullYear() > dataDeAgora.getFullYear()){
        return dataDoPrazo.getFullYear()
    }

    if(dataDoPrazo.getMonth() > dataDeAgora.getMonth()){
        return dataDoPrazo.toLocaleDateString('pt-BR', {month: "short"}, { timeZone: 'UTC'})
    }

    if(dataDoPrazo.getDate() - dataDeAgora.getDate() > 1){
        return dataDoPrazo.getDate() - dataDeAgora.getDate() + " dias";
    }
    
    if(dataDoPrazo.getDate() - dataDeAgora.getDate() > 0){
        return "Amanhã";
    }
    
    if(dataDoPrazo.getDate() - dataDeAgora.getDate() === 0){
        return "Hoje";
    }
    return "Vencido";

}

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

export async function showProjeto() {
    let projetos = getListaProjetos();
    listaProjetos.empty();
    projetoView.empty();
    titulo.empty();
    
    const projetoViewBox = $(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <h1 class="text-body-emphasis">Selecione um Projeto</h1>
            </div>
        </div>`);
    if(!projetos.length){
        projetoViewBox.find("h1").text("Adicione um Projeto");
    }
    projetoView.append(projetoViewBox);
    
    const icon = $(`
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journals" viewBox="0 0 16 16">
        <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
        <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
        </svg>`)

    titulo.append(icon);
    titulo.append(`<h3>Lista de Projetos<h3>`);


    projetos.forEach(projeto => {

        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
        listaProjetos.append(itemLista);
    });
}