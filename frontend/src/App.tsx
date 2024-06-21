import "./App.css";
import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";
import { PerfilCard } from "./components/PerfilCard/PerfilCard";
import SearchProjects from "./components/SearchProjects/SearchProjects";

function App() {
  return (
    <>
      <Header />
      <hr className="border-preto-trila shadow-md" />
      <Container>
        <main>
          <div>
            <PerfilCard />
          </div>
          <div>
            <h3 className="font-bold">Meus projetos</h3>
            <SearchProjects />
            <p>área de apresentação de projetos</p>
            {/* {
            userPosts.map((post:any ,i ) => {
              return <ProjectContainer key={i} data={post} />
            })
          } */}
          </div>
        </main>
      </Container>
    </>
  );
}

export default App;
