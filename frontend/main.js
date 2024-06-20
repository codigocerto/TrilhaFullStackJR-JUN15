import { showProjeto } from "./ui_pagina_projetos.js";
import { showRemoverProjetos } from "./ui_remover_projetos.js";
import { showAdicionarProjeto } from "./ui_adicionar_projetos.js";
import { showEditarProjeto } from "./ui_editar_projetos.js";

const botaoProjetos = $("#projetos");
const botaoAdicionar = $("#adicionar");
const botaoEditar = $("#editar");
const botaoRemover = $("#remover");


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

botaoProjetos.click()
// botaoAdicionar.click();
// botaoEditar.click();
// botaoRemover.click();
