import { CardProject } from "../../components/CardProject/CardProject";
import { Container } from "../../components/Container/Container";
import { Header } from "../../components/Header/Header";
import { PerfilCard } from "../../components/PerfilCard/PerfilCard";
import SearchProjects from "../../components/SearchProjects/SearchProjects";

export function Home() {
  return (
    <>
      <Header />
      <hr className="border-preto-trila shadow-md" />
      <Container>
        <main>
          <div className="m-5">
            <PerfilCard />
          </div>
          <hr className="border-gray-300 shadow-md" />
          <div className="mt-8">
            <h3 className="font-bold">Meus projetos :</h3>
            <SearchProjects />
          </div>
        </main>
        <section>
          <CardProject />
        </section>
      </Container>
    </>
  );
}
