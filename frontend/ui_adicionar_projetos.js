import { getProjetos, addProjeto } from "./data.js";
import { tempoRestante } from "./ui_pagina_projetos.js";

const projetoView = $("#view");
const listaProjetos = $("#lista-projetos");
const titulo = $("#titulo-lista");

const projetoViewBox = $(`<div class="container my-5"></div>`);
const projetoViewBoxText = $(`<div id="view-box-text" class="p-5 text-center bg-body-tertiary rounded-3"></div>`);

const adicionarForm = $(`
    <form id="add-projeto-form">
    <h1 class="text-body-emphasis mb-5">Adicionar Projeto</h1>
    <div class="form-floating mb-3">
        <input required type="text" class="form-control" id="floatingNomeProjeto" placeholder="Nome do Projeto">
        <label for="floatingNomeProjeto">Nome do Projeto</label>
    </div>
    <div class="form-floating mb-3">
        <textarea class="form-control" rows="10" style="height:100%" id="floatingDescricao" placeholder="Descrição do Projeto"></textarea>
        <label for="floatingDescricao">Descrição do Projeto</label>
    </div>
    <div class="form-check">
        <span class="check-remove">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckPrazo">
            <label class="form-check-label" for="flexCheckPrazo">&nbsp;&nbsp;Incluir prazo</label>
        </span>
    </div>
    <div class="form-floating">
        <input type="date" class="form-control" id="floatingPrazo">
        <label for="floatingPrazo">Prazo do Projeto</label>
    </div>
    <button id="botao-submit" type="submit" class="btn btn-primary mt-4">Adicionar Projeto</button>
    </form>`)


function criarItemLista(id, nome, prazo) {

    const itemLista = $(`<a id="${id}" role="button" class="disabled list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1 px-2">${nome}</strong>
                                <small>${tempoRestante(prazo)}</small>
                            </div>
                        </a>`);

    return itemLista;
}

function criarListaProjetos(projetos){
    
    listaProjetos.empty();
    projetos.forEach(projeto => {

        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.prazo);
        listaProjetos.append(itemLista);
    });
}

export async function showAdicionarProjeto() {
    
    let projetos = await getProjetos();
    const inputNomeProjeto = adicionarForm.find("#floatingNomeProjeto");
    const inputDescricaoProjeto = adicionarForm.find("#floatingDescricao");
    const inputCheckPrazo = adicionarForm.find("#flexCheckPrazo");
    const inputPrazo = adicionarForm.find("#floatingPrazo");
    
    titulo.empty();
    listaProjetos.empty();
    projetoView.empty();

    
    projetoViewBoxText.append(adicionarForm);
    projetoViewBox.append(projetoViewBoxText);
    
    projetoView.append(projetoViewBox);

    
    const icon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
    </svg>`)
    
    titulo.append(icon);
    titulo.append("<h3>Adicionar Projetos</h3>");

    criarListaProjetos(projetos);

    inputPrazo.attr("disabled", true);
    inputPrazo.attr("min", new Date().toLocaleDateString('fr-ca'));
    
    inputCheckPrazo.on("change", event => {
        const elemento = event.target;
        if(elemento.checked){
            inputPrazo.attr("disabled", false);
        }
        else{
            inputPrazo.attr("disabled", true);
        }
    });

    adicionarForm.on("submit", async(e) => {
        e.preventDefault();
        const nome = inputNomeProjeto.val();
        const descricao = inputDescricaoProjeto.val();
        const prazo = inputCheckPrazo.is(":checked") && inputPrazo.val() ? new Date(inputPrazo.val() + "T23:59:59") : null;
    
        const novoProjeto = {nome, descricao, prazo}
        
        addProjeto(novoProjeto);

        projetos.push(novoProjeto);
        criarListaProjetos(projetos)

        listaProjetos[0].scrollTop = listaProjetos[0].scrollHeight;

    });
}