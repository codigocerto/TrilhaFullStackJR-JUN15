const URL = "http://localhost:2130";

export async function getProjetos(){

    try{
        const response = await fetch (`${URL}/projetos`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // console.log(data)
        return data

    }
    catch(error){
        console.error(error);
        return null;
    }
}

export async function addProjeto(dadosProjeto){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projeto`, options);
        
        if (!response.ok) {
            console.log(JSON.stringify(dadosProjeto));
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    }
    catch(error){
        alert("O projeto nao pôde ser inserido");
        console.error(error);
    }

}

export async function removerProjeto(ids){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ids": ids})
    };

    try{
        const response = await fetch(`${URL}/projetos`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if(data["projetos não encontrados"].length > 0){
            throw new Error(`O seguintes projetos nao puderam ser removidos ${data["projetos não encontrados"].join(" ")}`);
        }
        return data;
    }
    catch(error){
        alert("O projeto nao pôde ser removido");
        console.error(error);
    }

}
