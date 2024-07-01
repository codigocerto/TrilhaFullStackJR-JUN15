//importação das funções para remover um projeto, receber a lista de projetos,
//e setar o array de projetos global
import { removerProjeto, importMeusProjetos, setMeusProjetos, setProjetosPublicos } from "../data/data.js";

//ícone de público e privado
import { isPublicoIcon } from "./ui_pagina_meus_projetos.js";

//elementos da página de exibição
const listaProjetos = $("#lista-projetos")
const projetoView = $("#view");
const titulo = $("#titulo-lista");

//seção onde será mostrado as informações
const projetoViewBox = $(`<div class="container my-5"></div>`);
//container dentro da seção que será inserido a lista para remoção
const projetoViewBoxText = $(`<div id="view-box-text" class="p-5 text-center bg-body-tertiary rounded-3"></div>`);
//ícone de precaução
const exclusaoBotaoIcon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 20 20">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>`)


const exclusaoBotao = $(`<button type="button" class="btn btn-warning mt-4">Confirmar exclusão</button>`);

exclusaoBotao.prepend(exclusaoBotaoIcon);

const listaParaRemover = $(`<ul class="list-group"></ul>`)

function criarItemLista(id, nome, is_publico) {

    //o value de cada elemento é colocado como o id do item
    const itemLista = $(`<label for="flexCheck-${id}" id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <span>
                                    ${isPublicoIcon[Number(is_publico)]}
                                    <strong class="mb-1 px-2">${nome}</strong>
                                </span>
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

//cria a lista de visualição dos projetos a serem removidos
function createListaParaRemover(removerSet, projetos, onlyText=false){
    //Se não houverem projetos selecionados, mostra a mensagem "Selecione projetos para Remover"
    if(!removerSet.size){
        return `<li class="list-group-item">Selecione projetos para Remover</li>`;
    }
    
    //converte o set para array
    const removeLista = Array.from(removerSet);
    let listaNomes = [];

    //verifica se o id de cada projeto está contido no array de ids a serem removidos
    //e a adiciona o nome dos projetos contidos em listaNomes
    projetos.forEach(projeto => {
        if(removeLista.some(id => id == projeto.id)){  
            listaNomes.push(projeto.nome);
        }
    })
 
    //se o parâmetro onlyText for passado como true, retorna apenas o array de strings com os nomes
    //usado na mensagem de confirmação
    if(onlyText){
        return listaNomes.map(item => item);
    }
    //se onlyText não for passado, retorna um array de elementos <li>
    //com os nomes dos projetos a serem removidos
    return listaNomes.map(item => `<li class="list-group-item">${item}</li>`);
}


//cria a lista de projetos que podem ser selecionados para remoção
//recebe um set que armazena os ids selecionado para remoção
function criarListaProjetos(projetos, setRemover){
    listaProjetos.empty();
    
    projetos.forEach(projeto => {
        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.is_publico);
        listaProjetos.append(itemLista);
    });

    //seleciona todos os checkboxes da lista
    const checkboxes = listaProjetos.find(`[type="checkbox"]`);
    
    //detecta as mudanças no checkbox, e adiciona ou remove o projeto do Set
    checkboxes.on("change", event => {
        const elemento = event.target;
        if(elemento.checked){
            setRemover.add(elemento.value);
        }
        else{
            setRemover.delete(elemento.value);
        }
        listaParaRemover.html(createListaParaRemover(setRemover, projetos));
        //se o Set estiver vazio, o botão para remover é desativado
        if(setRemover.size === 0){
            exclusaoBotao.addClass("disabled");
        }
        else{
            exclusaoBotao.removeClass("disabled");
        }

    })
}   

//cria toda página de remoção dos projetos, chamada ao clicar na aba Remover
export async function showRemoverProjetos() {
    let projetos = importMeusProjetos();
    let setRemover = new Set();
    
    titulo.empty();
    listaProjetos.empty();
    projetoView.empty();
    projetoViewBox.empty();
    setRemover.clear();
    listaParaRemover.html(`<li class="list-group-item">Selecione projetos para Remover</li>`)
    //inicia a página com o botão remover desativado
    exclusaoBotao.addClass("disabled");
    
    //ícone e título da lista
    const icon = $(`
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journal-x" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
        </svg>`)

    titulo.append(icon);
    titulo.append(`<h3>Remover Projetos<h3>`);

    projetoView.append(projetoViewBox);
    
    exclusaoBotao.on("click", async() => {
        if(!setRemover.size){
            return;
        }
        //mensagem de confirmação
        if(confirm(`` + (setRemover.size < 2 ?  `${createListaParaRemover(setRemover, projetos, true) } será permanentemente excluído.`:`${setRemover.size} projetos serão permanentemente excluídos.`) + " Deseja continuar?")){
            
            //converte as Strings em Number
            const arrayIdNumeros = Array.from(setRemover).map(id => Number(id));
             //envia as IDs para serem removidas, e armazena o retorno
            const atualizacaoProjetos = await removerProjeto(arrayIdNumeros);
            
            //limpa o set de remoção, atualiza a lista de projetos e a lista de visualização
            setRemover.clear();
            listaParaRemover.html(createListaParaRemover(setRemover, atualizacaoProjetos["projetos"]));
            //a chave "projetos" contém o array de projetos atualizado
            criarListaProjetos(atualizacaoProjetos["projetos"]["meus_projetos"], setRemover);
            setMeusProjetos(atualizacaoProjetos["projetos"]["meus_projetos"]);
            setProjetosPublicos(atualizacaoProjetos["projetos"]["projetos_publicos"])
            exclusaoBotao.addClass("disabled");

        }
    })

    projetoViewBoxText.append(listaParaRemover, exclusaoBotao);
    projetoViewBox.append(projetoViewBoxText);

    criarListaProjetos(projetos, setRemover);



}