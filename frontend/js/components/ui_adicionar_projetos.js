//importação das funções para adicionar um projeto, receber a lista de projetos,
//e setar o array de projetos global
import { addProjeto, importMeusProjetos, setMeusProjetos, setProjetosPublicos } from "../data/data.js";
//função que recebe uma data e retorna uma indicação simples do prazo
import { tempoRestante } from "./ui_pagina_projetos_publicos.js";

//ícone de público e privado
import { isPublicoIcon } from "./ui_pagina_meus_projetos.js";

//elementos da página de exibição
const projetoView = $("#view");
const listaProjetos = $("#lista-projetos");
const titulo = $("#titulo-lista");

//seção onde será mostrado o formulário para adicionar
const projetoViewBox = $(`<div class="container my-5"></div>`);
//container dentro da seção que será inserido o formulário
const projetoViewBoxText = $(`<div id="view-box-text" class="p-4 text-center bg-body-tertiary rounded-3"></div>`);

//formulário para adicionar novo projeto
const adicionarForm = $(`
    <form id="add-projeto-form">
        <select id="is-publico" class="form-select form-select-sm" style="width: 95px;" aria-label="Default select example">
            <option value="privado" selected>Privado</option>
            <option value="publico">Público</option>
        </select>
        <h1 class="text-body-emphasis mb-5">Adicionar Projeto</h1>
        <div class="form-floating mb-3">
            <input required type="text" class="form-control" id="floatingNomeProjeto" placeholder="Nome do Projeto">
            <label for="floatingNomeProjeto">Nome do Projeto</label>
        </div>
        <div class="form-floating mb-3">
            <textarea class="form-control" rows="10" style="height:100%" id="floatingDescricao" placeholder="Descrição do Projeto"></textarea>
            <label for="floatingDescricao">Descrição do Projeto (opcional)</label>
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


//função que cria um item da lista, o item não é clicável e é indicado como desativado
function criarItemLista(id, nome, prazo, is_publico) {

    const itemLista = $(`<a id="${id}" role="button" class="disabled list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <span>
                                    ${isPublicoIcon[Number(is_publico)]}
                                    <strong class="mb-1 px-2">${nome}</strong>
                                </span>
                                <small>${tempoRestante(prazo)}</small>
                            </div>
                        </a>`);

    return itemLista;
}

//função que recebe o array de projetos e usa criarItemLista para criar cada um e dar append no elemento da lista
function criarListaProjetos(projetos){
    
    listaProjetos.empty();
    projetos.forEach(projeto => {

        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.prazo, projeto.is_publico);
        listaProjetos.append(itemLista);
    });
}

//cria toda página de edição dos projetos, chamada ao clicar na aba Adicionar
export function showAdicionarProjeto() {
    
    //recebe o atual array de projetos
    let projetos = importMeusProjetos();
    
    //atribui os elementos do formulário
    const inputNomeProjeto = adicionarForm.find("#floatingNomeProjeto");
    const inputDescricaoProjeto = adicionarForm.find("#floatingDescricao");
    const inputCheckPrazo = adicionarForm.find("#flexCheckPrazo");
    const inputPrazo = adicionarForm.find("#floatingPrazo");
    const inputIsPublico = adicionarForm.find("#is-publico");
    
    titulo.empty();
    listaProjetos.empty();
    projetoView.empty();

    // append do formulário no container de texto
    projetoViewBoxText.append(adicionarForm);

    //append do container de texto ao container principal
    projetoViewBox.append(projetoViewBoxText);
    
    //append do container principal à seção de informações
    projetoView.append(projetoViewBox);

    //ícone e título da lista
    const icon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
    </svg>`)
    
    titulo.append(icon);
    titulo.append(`<h3>Adicionar Projetos<h3>`);

    //chama a função de criação da lista
    criarListaProjetos(projetos);

    //inicia o input de data desativado
    inputPrazo.attr("disabled", true);
    //atribui data mínima ao dia corrente, new Date().toLocaleDateString('fr-ca') retorna a data atual no formato aceito
    inputPrazo.attr("min", new Date().toLocaleDateString('fr-ca'));
    
    //ativa e desativa o input de data, de acordo com o checkbox
    inputCheckPrazo.on("change", event => {
        const elemento = event.target;
        if(elemento.checked){
            inputPrazo.attr("disabled", false);
        }
        else{
            inputPrazo.attr("disabled", true);
        }
    });

    //ação acionada ao enviar o formulário
    adicionarForm.on("submit", async(e) => {
        e.preventDefault();
        const nome = inputNomeProjeto.val();
        const descricao = inputDescricaoProjeto.val();
        //atribui o prazo caso o checkbox esteja marcado, atribui null caso contrário
        const prazo = inputCheckPrazo.is(":checked") && inputPrazo.val() ? new Date(inputPrazo.val() + "T23:59:59") : null;
        const is_publico = inputIsPublico.val() === "publico" ? true : false;
        
        //cria um objeto com os atributos
        const novoProjeto = {nome, descricao, prazo, is_publico}
        //envia o objeto como parametro para ser adicionado, e armazena o retorno
        const atualizacaoProjetos = await addProjeto(novoProjeto);
        //a chave "projetos" contém o array de projetos atualizado
        criarListaProjetos(atualizacaoProjetos["meus_projetos"]);
        setMeusProjetos(atualizacaoProjetos["meus_projetos"]);
        setProjetosPublicos(atualizacaoProjetos["projetos_publicos"])
        alert(`${nome} criado com sucesso!`);


        //ao adicionar um novo projeto, a lista de projetos é rolada até o final pra mostrar o novo projeto
        listaProjetos[0].scrollTop = listaProjetos[0].scrollHeight;

    });
}