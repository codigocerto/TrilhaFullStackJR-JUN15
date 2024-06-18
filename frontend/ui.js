import { addProjeto, getProjetos } from "./data.js";

export const projetoView = $("#view");
export const projetoTitulo = $("#titulo-projeto");
export const projetoDescricao = $("#descricao-projeto");

const listaProjetos = $("#lista-projetos")


function criarPaginaProjeto(id, nome, descricao, prazo, criacao) {
    projetoView.empty();

    const dateCriacao = new Date(criacao);
    const datePrazo = new Date(prazo);

    const labelCriacao = `<p>Criado: ${dateCriacao.toLocaleDateString('pt-BR', { timeZone: 'UTC'})} </p>`;
    const labelPrazo = prazo ? `<p>Prazo: ${datePrazo.toLocaleDateString('pt-BR', { timeZone: 'UTC'})}</p>` : "";

    const projetoViewBox = $(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <span id="horario" class="text-muted">${labelPrazo}${labelCriacao}</span>
                <h1 class="text-body-emphasis">${nome}</h1>
                <p class="lead">${descricao}</p>
            </div>
        </div>`);

    projetoView.append(projetoViewBox);


}

//Essa função recebe a data do prazo e retorna um texto simples indicando o prazo
function tempoRestante(prazo){
    
    if(!prazo){
        return "";
    }
    
    const nowDate = Date.now();
    const prazoDate = Date.parse(prazo)

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
    return "Hoje";

}

function criarItemLista(id, nome, descricao, prazo, criacao) {

    const itemLista = $(`<a id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">${nome}</strong>
                                <small>${tempoRestante(prazo)}</small>
                            </div>
                        </a>`);

    itemLista.on("click", () => {
        criarPaginaProjeto(id, nome, descricao, prazo, criacao);
    })
    return itemLista;
}

export async function showProjeto() {
    const projetos = await getProjetos();
    listaProjetos.empty();
    projetos.forEach(projeto => {

        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
        listaProjetos.append(itemLista);
        
        itemLista.click() //// Função de teste
    });






}