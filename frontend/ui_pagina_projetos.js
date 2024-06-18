import { getProjetos } from "./data.js";

const projetoView = $("#view");
const listaProjetos = $("#lista-projetos");
const titulo = $("#titulo-lista");


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
                                <strong class="mb-1 px-2">${nome}</strong>
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
    projetoView.empty();
    const projetoViewBox = $(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <h1 class="text-body-emphasis">Selecione um Projeto</h1>
            </div>
        </div>`);

    projetoView.append(projetoViewBox);
    
    titulo.text("   Lista de Projetos");
    const icon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"/>
        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"/>
        <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"/>
    </svg>`)
    titulo.prepend(icon);

    projetos.forEach(projeto => {

        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
        listaProjetos.append(itemLista);
    });
}