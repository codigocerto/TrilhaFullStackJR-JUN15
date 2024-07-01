//importação das funções para editar um projeto, receber a lista de projetos,
//e setar o array de projetos global
import { editarProjeto, importMeusProjetos, setMeusProjetos, setProjetosPublicos } from "../data/data.js";

//ícone de público e privado
import { isPublicoIcon } from "./ui_pagina_meus_projetos.js";

//elementos da página de exibição
const listaProjetos = $("#lista-projetos")
const projetoView = $("#view");
const titulo = $("#titulo-lista");


//seção onde será mostrado o formulário para editar
const projetoViewBox = $(`<div class="container my-5"></div>`);
//container dentro da seção que será inserido o formulário
const projetoViewBoxText = $(`<div id="view-box-text" class="p-4 text-center bg-body-tertiary rounded-3"></div>`);

//função que recebe um número e retorna uma string com zeros a esquerda
//usado para formatar o horário
const zeroPad = (num, places) => String(num).padStart(places, '0');

//cria a página do projeto, com o formulário para edição
function criarPaginaProjeto(id, nome, descricao, prazo, criacao, is_publico) {
    projetoViewBoxText.empty()
    projetoViewBox.empty()
    projetoView.empty();

    //cria objeto Date a partir da string de datas de criação e prazo, com adição de 'Z' para horário em UTC
    const dateCriacao = new Date(criacao + 'Z');
    const datePrazo = new Date(prazo  + 'Z');

    const labelCriacao = `<p>Criado: ${dateCriacao.toLocaleDateString('pt-BR')} </p>`;

    const adicionarForm = $(`
        <form id="add-projeto-form">
            <span id="horario" class="text-muted d-flex">
                <select id="is-publico" class="form-select form-select-sm mb-3" style="width: 95px;" aria-label="Default select example">
                    <option ${is_publico ? "" : "selected"} value="privado">Privado</option>
                    <option ${is_publico ? "selected" : ""} value="publico">Público</option>
                </select>
                <p>${labelCriacao}</p>
                </span>
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

    //atribui os elementos do formulário
    const inputNomeProjeto = adicionarForm.find("#floatingNomeProjeto");
    const inputDescricaoProjeto = adicionarForm.find("#floatingDescricao");
    const inputCheckPrazo = adicionarForm.find("#flexCheckPrazo");
    const inputPrazo = adicionarForm.find("#floatingPrazo");
    const inputIsPublico = adicionarForm.find("#is-publico");

    //insere o nome e a descrição do projeto nos inputs
    inputNomeProjeto.val(nome);
    inputDescricaoProjeto.val(descricao);
    //atribui data mínima ao dia corrente, new Date().toLocaleDateString('fr-ca') retorna a data atual no formato aceito
    inputPrazo.attr("min", new Date().toLocaleDateString('fr-ca'));
    //inclui a data, caso não seja null
    if(prazo){
        inputCheckPrazo.prop('checked', true);
        //insere a data no input, usando a função zeroPad para formatar os números
        inputPrazo.val(`${datePrazo.getFullYear()}-${zeroPad(datePrazo.getMonth() + 1, 2)}-${zeroPad(datePrazo.getDate(), 2)}`);

    }
    else{
        inputCheckPrazo.prop('checked', false);
        inputPrazo.attr("disabled", true);
    }

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

        //armazena os dados do input
        let nomeEdit = inputNomeProjeto.val();
        let descricaoEdit = inputDescricaoProjeto.val();
        //atribui o prazo caso o checkbox esteja marcado, atribui null caso contrário
        let prazoEdit = inputCheckPrazo.is(":checked") ? (inputPrazo.val() ? new Date(inputPrazo.val() + "T23:59:59Z") : null) : null;
        let isPublicoEdit = inputIsPublico.val() === "publico" ? true : false;

        //valores booleanos, indicando se há diferença entre os inputs e os valores armazenados
        //atribui falso caso o valor seja o mesmo, ou se for vazio
        let nomeHasChanged = nomeEdit !== nome && nomeEdit !== "";
        let descricaoHasChanged = descricaoEdit !== descricao;
        //o valor de prazo pode ser null, então primeiro é verificado se tanto o prazo e prazoEdit são truthy
        //caso sejam truthy, a string é fatiada para desconsiderar o horário e comparar somente a data
        let prazoHasChanged = prazo && prazoEdit ? prazoEdit.toISOString().slice(0, 10) !== prazo.slice(0, 10) : prazoEdit !== prazo;
        let isPublicoHasChanged = isPublicoEdit !== is_publico


        //caso não haja alteração em nenhum, a função é retornada e encerrada
        if(!nomeHasChanged && !descricaoHasChanged && !prazoHasChanged && !isPublicoHasChanged){
            return;
        }

        //o objeto do projeto é criado, atribuindo uma string vazia caso não haja mudança
        //a API somente altera o valor caso a string tenha algum conteúdo
        const novoProjeto = {
            id,
            nome: nomeHasChanged ? nomeEdit : "", 
            descricao: descricaoHasChanged ? descricaoEdit : "",
            prazo: prazoHasChanged ? prazoEdit : prazo,
            is_publico: isPublicoHasChanged ? isPublicoEdit : is_publico
        }
        
        //confirma a alteração com o usuário
        if(!confirm(`${nome} será alterado. Deseja continuar?`)
        ){
            return;
        }
        const atualizacaoProjetos = await editarProjeto(novoProjeto);
        
        //a chave "projetos" contém o array de projetos atualizado
        criarListaProjetos(atualizacaoProjetos["projetos"]["meus_projetos"]);
        setMeusProjetos(atualizacaoProjetos["projetos"]["meus_projetos"]);
        setProjetosPublicos(atualizacaoProjetos["projetos"]["projetos_publicos"])
        adicionarForm.find("h1").text(`Editar ${nomeEdit || nome}`);
        
        alert(`${nomeEdit || nome} atualizado com sucesso!`);


    });

    //adiciona os elementos da página de edição do projeto à caixa de informações
    projetoViewBoxText.append(adicionarForm);
    projetoViewBox.append(projetoViewBoxText);
    
    projetoView.append(projetoViewBox);

}

//cria os itens da lista, que ao ser clicado mostra a página de edição do projeto
function criarItemLista(id, nome, descricao, prazo, criacao, is_publico) {

    
    const itemLista = $(`<a id="${id}" role="button" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                 <span>
                                    ${isPublicoIcon[Number(is_publico)]}
                                    <strong class="mb-1 px-2">${nome}</strong>
                                </span>
                                <div class="form-check-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                </div>   
                            </div>
                        </a>`);

    itemLista.on("click", () => {
        criarPaginaProjeto(id, nome, descricao, prazo, criacao, is_publico);
    })
    return itemLista;
}

//função que recebe o array de projetos e usa criarItemLista para criar cada um e dar append no elemento da lista
function criarListaProjetos(projetos){
    
    listaProjetos.empty();
    projetos.forEach(projeto => {
        const itemLista = criarItemLista(projeto.id, projeto.nome, projeto.descricao, projeto.prazo, projeto.criacao, projeto.is_publico);
        listaProjetos.append(itemLista);
        itemLista.on("click", () => {
            $(".list-group-item").removeClass("active");
            itemLista.addClass("active");
        })
    
    });

}   

//cria toda página de edição do projeto, chamada ao clicar na aba Editar
export function showEditarProjeto() {
    let projetos = importMeusProjetos();
    titulo.empty();
    
    projetoViewBoxText.empty()
    projetoViewBox.empty()
    projetoView.empty();


    //antes de um projeto ser seleciona, mostra "Selecione um Projeto para Editar" na caixa de informação
    projetoView.append($(
        `<div class="container my-5">
            <div class="p-5 text-center bg-body-tertiary rounded-3">
                <h1 class="text-body-emphasis">Selecione um Projeto para Editar</h1>
            </div>
        </div>`));

    if(!projetos.length){
        projetoViewBox.find("h1").text("Não há projetos cadastrados");
    }
    
    //ícone e título da lista
    const icon = $(`
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
        <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
    </svg>
    `)
    
    titulo.append(icon);
    titulo.append(`<h3>Editar Projetos<h3>`);

    //cria os items da lista
    criarListaProjetos(projetos);
}