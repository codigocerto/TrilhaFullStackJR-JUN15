export function CardProject() {
  const dadosTeste = [
    {
      id: 1,
      img: "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
      title: "Projeto Alpha",
      category: "Desenvolvimento",
      link: "/projeto-alpha",
      tags: [{ id: "backend" }, { id: "UX" }],
    },
    {
      id: 2,
      img: "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
      title: "Projeto Beta",
      category: "Design",
      link: "/projeto-beta",
      tags: [{ id: "frontend" }, { id: "UI" }],
    },
    {
      id: 3,
      img: "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
      title: "Projeto Gamma",
      category: "Marketing",
      link: "/projeto-gamma",
      tags: [{ id: "SEO" }, { id: "Content" }],
    },
    // Adicione mais projetos conforme necessário
  ];

  if (dadosTeste.length === 0) {
    return (
      <li className="flex w-1/3 h-64">
        <a
          href="/new"
          className="hover:border-vermelho-trilha hover:border-solid hover:bg-branco-trilha hover:text-preto-trilha group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3"
        >
          Você ainda não tem nenhum projeto adicionado.
        </a>
      </li>
    );
  } else {
    return (
      <section>
        <ul className=" bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 text-sm leading-6">
          {dadosTeste.map((projeto) => (
            <li
              key={projeto.id}
              className="rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm hover:bg-red-300 hover:ring-vermelho-trilha hover:shadow-md"
            >
              <a href={projeto.link} className="flex flex-col">
                <img
                  src={projeto.img}
                  alt={projeto.title}
                  className="rounded-md mb-4"
                />
                <dl>
                  <div>
                    <dt className="sr-only">Título</dt>
                    <dd className="font-semibold text-slate-900 group-hover:text-white">
                      {projeto.title}
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Categoria</dt>
                    <dd className="text-gray-500 group-hover:text-white">
                      {projeto.category}
                    </dd>
                  </div>
                  <div className="mt-4">
                    <dt className="sr-only">Tags</dt>
                    <dd className="flex space-x-2">
                      {projeto.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-slate-200 text-slate-800 px-2 py-1 rounded"
                        >
                          {tag.id}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
