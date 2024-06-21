import { Container } from "../../components/Container/Container";
import { Header } from "../../components/Header/Header";
import SeachField from "../../components/SearchProjects/SearchProjects";

export function Descobrir(){
    return(
        <>
        <Header/>
        <Container>
            <SeachField/>
        </Container>
        </>
    );
}