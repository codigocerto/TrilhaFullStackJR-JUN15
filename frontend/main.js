import { showProjeto } from "./ui.js";

export const botaoProjetos = $("#projetos");
export const botaoAdicionar = $("#adicionar");
export const botaoEditar = $("#editar");
export const botaoRemover = $("#remover");


botaoProjetos.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoProjetos.addClass("active");
    showProjeto();
})
botaoAdicionar.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoAdicionar.addClass("active");

});
botaoEditar.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoEditar.addClass("active");
});
botaoRemover.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoRemover.addClass("active");
});