from datetime import datetime, timezone
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import MultProjetosInput, ProjetoDelete, ProjetoInput, ProjetoUpdate, ProjetosDelete
from schema import Projeto, get_session, Session

app = FastAPI(title="Gerenciamento de Projetos")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=["http://127.0.0.1:2129", "http://localhost:2129"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {"CódigoCerto": "FullStack"}

@app.get('/projetos')
async def get_projetos(session: Session = Depends(get_session)):
    projetos = session.query(Projeto).all()
    
    if projetos: 
        return projetos
    
    raise HTTPException(status_code=404, detail='Não há projetos cadastrados')

@app.post('/projeto/criar')
async def registrar_projeto(projeto_input: ProjetoInput, session: Session = Depends(get_session)):
    
    if(not projeto_input.nome.strip()):
       raise HTTPException(status_code=422, detail='O nome do projeto não pode ser vazio')
    
    if(projeto_input.prazo and projeto_input.prazo < datetime.now(timezone.utc)):
        raise HTTPException(status_code=422, detail='O prazo já está vencido')
    
    projeto = Projeto(nome=projeto_input.nome.strip(), descricao=projeto_input.descricao, prazo=projeto_input.prazo)
    session.add(projeto)
    session.commit()
    return {"id": projeto.id,
            "nome": projeto.nome,
            "descricao": projeto.descricao}

@app.post('/projetos/criar')
async def registrar_multiplos_projetos(projetos_input: MultProjetosInput, session: Session = Depends(get_session)):
    
    projetos_inseridos = []
    projetos_com_erro = []
    
    for projeto_input in projetos_input.projetos:
        try:
            if(not projeto_input.nome.strip()):
                raise HTTPException(status_code=422, detail='Não pode haver nome de projeto vazio')
            
            projeto = Projeto(nome=projeto_input.nome.strip(), descricao=projeto_input.descricao, prazo=projeto_input.prazo)
            session.add(projeto)
            session.commit()
            
            projetos_inseridos.append({
                "id": projeto.id,
                "projeto": projeto.nome
            })
        except HTTPException as erro:
            projetos_com_erro.append({
                "projeto": projeto_input.nome,
                "erro": str(erro.detail)
            })

    return {
        "projetos inseridos": projetos_inseridos,
        "projetos com erro": projetos_com_erro if projetos_com_erro else 0
    }

@app.put('/projeto/editar')
async def alterar_projeto(projeto_update: ProjetoUpdate, session: Session = Depends(get_session)):
    projeto = session.query(Projeto).filter(projeto_update.id == Projeto.id).first()
    
    if not projeto:
        raise HTTPException(status_code=404, detail='Projeto não encontrado')
    
    if projeto_update.nome.strip() != "":
        projeto.nome = projeto_update.nome.strip()
    if projeto_update.descricao != "":
        projeto.descricao = projeto_update.descricao
    if projeto_update.prazo != "":
        projeto.prazo = projeto_update.prazo
    
    session.add(projeto)
    session.commit()
    
    try:
        projetos = session.query(Projeto).all()

        return {
            "projeto atualizado":{
                "id": projeto.id,
                "nome": projeto.nome,
                "descricao": projeto.descricao
                },
            "projetos": projetos
            }
    
    except:
        return{
            "id": projeto.id,
            "nome": projeto.nome,
            "descricao": projeto.descricao
            }

    

@app.delete('/projeto/deletar')
async def remover_projeto(projeto_delete: ProjetoDelete, session: Session = Depends(get_session)):
    projeto = session.query(Projeto).filter(projeto_delete.id == Projeto.id).first()
    if not projeto:
        raise HTTPException(status_code=404, detail='Projeto não encontrado')

    session.delete(projeto)
    session.commit()

    try:
        projetos = session.query(Projeto).all()
        return {"deletado": projeto.nome,
                "projetos ": projetos}
    except:
        return {"deletado": projeto.nome,
                "projetos ": "não foi possível recuperar os projetos"}

@app.delete('/projetos/deletar')
async def remover_multiplos_projetos(projeto_delete: ProjetosDelete, session: Session = Depends(get_session)):
    projetos_deletados = []
    projetos_nao_encontrados = []

    for id in projeto_delete.ids:
        try:
            projeto = session.query(Projeto).filter(id == Projeto.id).first()
            if not projeto:
                raise HTTPException(status_code=404, detail='Projeto não encontrado')
        
            session.delete(projeto)
            session.commit()
            projetos_deletados.append(projeto.nome)

        except HTTPException:
            projetos_nao_encontrados.append(id)

    try:
        projetos = session.query(Projeto).all()

        return {
            "projetos deletados": projetos_deletados,
            "projetos não encontrados": projetos_nao_encontrados if projetos_nao_encontrados else [],
            "projetos": projetos
            }
    
    except:

         return {
             "projetos deletados": projetos_deletados,
             "projetos não encontrados": projetos_nao_encontrados if projetos_nao_encontrados else [],
             "projetos ": "não foi possível recuperar os projetos"
             }


if __name__ == '__main__':
   import uvicorn
   uvicorn.run(app, port=2130)