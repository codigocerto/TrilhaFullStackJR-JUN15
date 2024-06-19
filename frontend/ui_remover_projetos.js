import { removerProjeto, getProjetos } from "./data.js";

const listaProjetos = $("#lista-projetos")
const projetoView = $("#view");
const titulo = $("#titulo-lista");

   
const projetoViewBox = $(`<div class="container my-5"></div>`);
const projetoViewBoxText = $(`<div id="view-box-text" class="p-5 text-center bg-body-tertiary rounded-3"></div>`);

const listaParaRemover = $(`<ul class="list-group"></ul>`)
const removerBotao = $(`<button type="button" class="btn btn-danger mt-4 disabled">Confirmar exclusão</button>`);

function criarItemLista(id, nome) {

    const itemLista = $(`<label for="flexCheck-${id}" id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1 px-2">${nome}</strong>
                                <div class="check-remove" id="check-remover-${id}">
                                    <label for="flexCheck-${id}" class="form-check-label">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </label>                               
                                    <input class="form-check-input" type="checkbox" value="${id}" id="flexCheck-${id}">
                                </div>
                            </div>
                        </label>`);
    return itemLista;
}

function createListaParaRemover(removerSet, projetos, pureText=false){
    if(!removerSet.size){
        return `<li class="list-group-item">Selecione projetos para Remover</li>`;
    }
    
    const removeLista = Array.from(removerSet);
    let listaNomes = [];

    projetos.forEach(projeto => {
        if(removeLista.some(id => id == projeto.id)){
            
            listaNomes.push(projeto.nome);
        }
    })
 
    if(pureText){
        return listaNomes.map(item => item);
    }
    return listaNomes.map(item => `<li class="list-group-item">${item}</li>`);
}

export async function showRemoverProjetos() {
    const projetos = await getProjetos();

    let setRemover = new Set();

    listaProjetos.empty();
    projetoView.empty();
    setRemover.clear();
    listaParaRemover.html(`<li class="list-group-item">Selecione projetos para Remover</li>`)
    
    
    titulo.text("   Remover Projetos");
    const icon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-journal-x" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
    </svg>`)
    titulo.prepend(icon);

    projetoView.append(projetoViewBox);
    
    removerBotao.on("click", () => {
        if(!setRemover.size){
            return;
        }
        if(confirm(`` + (setRemover.size < 2 ?  `${createListaParaRemover(setRemover, projetos, true) } será permanentemente excluído.`:`${setRemover.size} projetos serão permanentemente excluídos.`) + " Deseja continuar?")){
            
            const arrayIdNumeros = Array.from(setRemover).map(id => Number(id));
            removerProjeto(arrayIdNumeros);
            setRemover.clear();
            showRemoverProjetos();

        }
    })

    projetoViewBoxText.append(listaParaRemover, removerBotao);
    projetoViewBox.append(projetoViewBoxText);

    projetos.forEach(projeto => {
        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao);
        listaProjetos.append(itemLista);
    });

    const checkboxes = listaProjetos.find(`[type="checkbox"]`);
    
    checkboxes.on("change", event => {
        const elemento = event.target;
        if(elemento.checked){
            setRemover.add(elemento.value);
        }
        else{
            setRemover.delete(elemento.value);
        }
        listaParaRemover.html(createListaParaRemover(setRemover, projetos));
        if(setRemover.size === 0){
            removerBotao.addClass("disabled");
        }
        else{
            removerBotao.removeClass("disabled");
        }

    })

}