# Gerenciador de Projetos

https://jpfsgs-projetos.netlify.app/

## Descrição
Aplicação Web para criar, editar, remover e gerenciar projetos, com opção de incluir prazo e descrição.

![Lista de Projetos](screenshots/tela_visualizar.jpeg)
|Desktop|Mobile|
| - | - |
| ![Adicionar Projeto](screenshots/tela_adicionar.jpeg 'title A') | ![Lista de Projetos Mobile](screenshots/tela_selecione_mobile.jpeg 'title B') |

|||
| - | - |
| ![Editar Projetos](screenshots/tela_editar.jpeg 'title A') | ![git hooks](screenshots/tela_remover_mobile.jpeg 'title B') |

### Darkmode

|||
| - | - |
| ![Lista de Projetos](screenshots/tela_visualizar_dark.jpeg 'title A') | ![Remover Projetos](screenshots/tela_remover_mobile_dark.jpeg 'title B') |




## Funcionalidades
- Visualizar todos os projetos
- Adicionar novo projeto
- Editar Projeto
- Remover projetos

## Tecnologias Utilizadas

### Backend
- **Linguagem**: Python
- **Framework**: FastAPI
- **Banco de Dados**: SQLite
- **ORM**: SQLAlchemy
- **Hospedagem**: Railway

### Frontend
- **Linguagens**: HTML, CSS, JavaScript
- **Frameworks/Libraries**: Bootstrap, SASS, jQuery
- **Hospedagem**: Netlify

## Endpoints da API

### Projetos
- **GET /projetos**
  - Descrição: Obter todos os projetos

- **POST /projeto/criar**
  - Descrição: Registrar um novo projeto

- **POST /projetos/criar**
  - Descrição: Registrar múltiplos projetos

- **PUT /projeto/editar**
  - Descrição: Alterar um projeto existente

- **DELETE /projeto/deletar**
  - Descrição: Remover um projeto

- **DELETE /projetos/deletar**
  - Descrição: Remover múltiplos projetos