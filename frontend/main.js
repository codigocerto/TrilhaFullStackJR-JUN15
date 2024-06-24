//arquivo principal

//verifica se o dispositivo do usuário tem preferência por modo escuro, e aplica de acordo
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
if(isDarkTheme){
    $("html").attr("data-bs-theme", "dark");
}

//imports das funções das páginas de exibição
import { showProjeto } from "./ui_pagina_projetos.js";
import { showRemoverProjetos } from "./ui_remover_projetos.js";
import { showAdicionarProjeto } from "./ui_adicionar_projetos.js";
import { showEditarProjeto } from "./ui_editar_projetos.js";

//elementos dos botões das abas
const botaoProjetos = $("#projetos");
const botaoAdicionar = $("#adicionar");
const botaoEditar = $("#editar");
const botaoRemover = $("#remover");

//ação de exibir página
botaoProjetos.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoProjetos.addClass("active");
    showProjeto();
})
botaoAdicionar.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoAdicionar.addClass("active");
    showAdicionarProjeto();

});
botaoEditar.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoEditar.addClass("active");
    showEditarProjeto();
});
botaoRemover.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoRemover.addClass("active");
    showRemoverProjetos();
});

//clica na aba ao iniciar a página
botaoProjetos.click()
// botaoAdicionar.click();
// botaoEditar.click();
// botaoRemover.click();
