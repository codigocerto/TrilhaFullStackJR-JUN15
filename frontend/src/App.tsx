import "./App.css";
import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <hr className="border-preto-trila shadow-md"/>
      <Container>
        <div>Hello World</div>
      </Container>
    </>
  );
}

export default App;
