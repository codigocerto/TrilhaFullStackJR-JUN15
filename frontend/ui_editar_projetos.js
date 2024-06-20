import { removerProjeto, getProjetos, editarProjeto } from "./data.js";
import { tempoRestante } from "./ui_pagina_projetos.js";

const listaProjetos = $("#lista-projetos")
const projetoView = $("#view");
const titulo = $("#titulo-lista");

   
const projetoViewBox = $(`<div class="container my-5"></div>`);
const projetoViewBoxText = $(`<div id="view-box-text" class="p-5 text-center bg-body-tertiary rounded-3"></div>`);

const zeroPad = (num, places) => String(num).padStart(places, '0');


function criarPaginaProjeto(id, nome, descricao, prazo, criacao) {
    projetoViewBoxText.empty()
    projetoViewBox.empty()
    projetoView.empty();

    

    const dateCriacao = new Date(criacao + 'Z');
    const datePrazo = new Date(prazo  + 'Z');

    const labelCriacao = `<p>Criado: ${dateCriacao.toLocaleDateString('pt-BR')} </p>`;

    const adicionarForm = $(`
        <form id="add-projeto-form">
        <span id="horario" class="text-muted">${labelCriacao}</span>
        <h1 class="text-body-emphasis mb-5">Editar ${nome}</h1>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingNomeProjeto" placeholder="Nome do Projeto">
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
        <button id="botao-submit"type="submit" class="btn btn-primary mt-4">Confirmar Edição</button>
        </form>`)

        const inputNomeProjeto = adicionarForm.find("#floatingNomeProjeto");
        const inputDescricaoProjeto = adicionarForm.find("#floatingDescricao");
        const inputCheckPrazo = adicionarForm.find("#flexCheckPrazo");
        const inputPrazo = adicionarForm.find("#floatingPrazo");


        inputNomeProjeto.val(nome);
        inputDescricaoProjeto.val(descricao);
        inputPrazo.attr("min", new Date().toLocaleDateString('fr-ca'));
        if(prazo){
            inputCheckPrazo.prop('checked', true);
            inputPrazo.val(`${datePrazo.getFullYear()}-${zeroPad(datePrazo.getMonth() + 1, 2)}-${zeroPad(datePrazo.getDate(), 2)}`);

        }
        else{
            inputCheckPrazo.prop('checked', false);
            inputPrazo.attr("disabled", true);
        }

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

            let nomeEdit = inputNomeProjeto.val();
            let descricaoEdit = inputDescricaoProjeto.val();
            
            let prazoEdit = inputCheckPrazo.is(":checked") ? (inputPrazo.val() ? new Date(inputPrazo.val() + "T23:59:59Z") : null) : null;
            // try{prazoEdit = prazoEdit.toISOString().replace(".000Z", "")  + "T23:59:59";}
            // catch{prazoEdit = null;}

            let nomeHasChanged = nomeEdit !== nome && nomeEdit !== "";
            let descricaoHasChanged = descricaoEdit !== descricao;
            let prazoHasChanged = prazo && prazoEdit ? prazoEdit.toISOString().slice(0, 10) !== prazo.slice(0, 10) : prazoEdit !== prazo;
   

            //caso não haja alteração nos valores, a função é retornada e encerrada
            if(!nomeHasChanged && !descricaoHasChanged && !prazoHasChanged){
                return;
            }

            const novoProjeto = {
                id,
                nome: nomeHasChanged ? nomeEdit : "", 
                descricao: descricaoHasChanged ? descricaoEdit : "",
                prazo: prazoHasChanged ? prazoEdit : prazo
            }
            
            
            if(!confirm(
                (Number(nomeHasChanged) + Number(descricaoHasChanged) + Number(descricaoHasChanged) > 1 ? "Alterações:\n" : "Alteração:\n") + 
                (nomeHasChanged ? "Nome\n" : "") +
                (descricaoHasChanged ? "Descrição\n" : "") + 
                (prazoHasChanged ? "Prazo\n" : "") + 
                "Deseja continuar?")
            ){
                return;
            }
            
            editarProjeto(novoProjeto);
    
            const projetos = await getProjetos();
            if(!projetos){
                alert("Erro na atualização do Projeto!")
                return;
            }
            criarListaProjetos(projetos)
            adicionarForm.find("h1").text(`Editar ${nomeEdit || nome}`);
            alert(`${nomeEdit || nome} atualizado com sucesso!`);
    
    
        });

        projetoViewBoxText.append(adicionarForm);
        projetoViewBox.append(projetoViewBoxText);
        
        projetoView.append(projetoViewBox);

}

function criarItemLista(id, nome, descricao, prazo, criacao) {

    
    const itemLista = $(`<a id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1 px-2">${nome}</strong>
                                <label for="flexCheck-${id}" class="form-check-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                                </label>   
                            </div>
                        </a>`);

    itemLista.on("click", () => {
        criarPaginaProjeto(id, nome, descricao, prazo, criacao);
    })
    return itemLista;
}

function criarListaProjetos(projetos){
    listaProjetos.empty();
    
    projetos.forEach(projeto => {
        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao);
        listaProjetos.append(itemLista);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
    
    });

}   

export async function showEditarProjeto() {
    let projetos = await getProjetos();
    // listaProjetos.empty();
    titulo.empty();
    
    projetoViewBoxText.empty()
    projetoViewBox.empty()
    projetoView.empty();

    projetoView.append($(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <h1 class="text-body-emphasis">Selecione um Projeto para Editar</h1>
            </div>
        </div>`));
    
    
    const icon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
        <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
    </svg>
    `)
    
    titulo.append(icon);
    titulo.append("<h3>Editar Projetos</h3>");


    criarListaProjetos(projetos);



}