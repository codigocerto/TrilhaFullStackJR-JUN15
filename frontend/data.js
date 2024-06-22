const loadingIcon = $(".spinner-border");

function loadingSpinner(){
    loadingIcon.toggle();
}

const URL = "https://trilhafullstackjr-jun15-production-2f5f.up.railway.app";
// const URL = "http://127.0.0.1:2130";

export async function getProjetos(){
    loadingSpinner();
    try{
        const response = await fetch (`${URL}/projetos`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        loadingSpinner();
        return data

    }
    catch(error){
        console.error(error);
        loadingSpinner();
        return null;
    }
}

export async function addProjeto(dadosProjeto){
    loadingSpinner();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projeto/criar`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner()
        return data;
    }
    catch(error){
        alert("O projeto nao pôde ser inserido");
        console.error(error);
    }
    loadingSpinner()

}

export async function editarProjeto(dadosProjeto){
    loadingSpinner()
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projeto/editar`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner()
        return data;
    }
    catch(error){
        alert("O projeto nao pôde editado");
        console.error(error);
    }
    loadingSpinner()
}

export async function removerProjeto(ids){
    loadingSpinner()
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ids": ids})
    };

    try{
        const response = await fetch(`${URL}/projetos/deletar`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if(data["projetos não encontrados"].length > 0){
            throw new Error(`O seguintes projetos nao puderam ser removidos ${data["projetos não encontrados"].join(" ")}`);
        }
        loadingSpinner()
        return data;
    }
    catch(error){
        alert("O projeto nao pôde ser removido");
        console.error(error);
    }
    loadingSpinner()

}

let projetos = await getProjetos();

export function getListaProjetos(){
    return projetos;
}

export function setProjetos(atualizacaoProjetos){
    projetos = atualizacaoProjetos;
}
