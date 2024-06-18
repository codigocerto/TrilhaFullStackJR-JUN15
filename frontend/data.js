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
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    }
    catch(error){
        alert("Couldn't add Group");
        console.error(error);
    }

}
