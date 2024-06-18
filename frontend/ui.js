import { addProjeto, getProjetos } from "./data.js";

export const projetoView = $("#view");
export const projetoTitulo = $("#titulo-projeto");
export const projetoDescricao = $("#descricao-projeto");

const listaProjetos = $("#lista-projetos")



const projeto = {
    "nome": "teste",
    "descricao": "a",
    "prazo": "2025-06-17T22:13:55.157Z"
}

function criarPaginaProjeto(id, nome, descricao, prazo){
    projetoTitulo.text(nome);
    projetoDescricao.text(descricao)
}

function criarItemLista(id, nome, descricao, prazo){
    
    const prazoDate = Date.parse(projeto.prazo)
    //Pega a string da data de projeto.prazo, é convertido para segundos com Date.parse,
    //e cria um objeto Date com esse parâmetro
    const prazoDataObject = new Date(prazoDate)
    
    const nowDate = Date.now();
    
    //tempo restante para o prazo
    const prazoRestante = prazoDate - nowDate;
    const segundos = Math.floor(prazoRestante / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(prazoRestante / 1000);
    
    
    

    
    const itemLista = $(`<a id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">${nome}</strong>
                                <small>${prazo}</small>
                            </div>
                            <div class="col-10 mb-1 small"><pre>${descricao}</pre></div>
                        </a>`);

    itemLista.on("click", () => {
        criarPaginaProjeto(id, nome, descricao, prazo);
    })
    return itemLista;
}

export async function showProjeto() {
    const projetos = await getProjetos();
    listaProjetos.empty();
    projetos.forEach(projeto => {
        
        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
        listaProjetos.append(itemLista);
    });


    
    


}