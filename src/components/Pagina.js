'use client';

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar style={{ backgroundColor: 'orange' }} variant="dark">
        <Container>
          <Navbar.Brand href="/" style={{ color: 'black' }}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/alunos" style={{ color: 'black' }}>Alunos</Nav.Link>
            <Nav.Link href="/professores" style={{ color: 'black' }}>Professores</Nav.Link>
            <Nav.Link href="/treinos" style={{ color: 'black' }}>Treinos</Nav.Link>
            <Nav.Link href="/avaliacoes" style={{ color: 'black' }}>Avaliações</Nav.Link>
            <Nav.Link href="/pagamentos" style={{ color: 'black' }}>Pagamentos</Nav.Link>
            <Nav.Link href="/relatorio" style={{ color: 'black' }}>Relatorio</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-dark text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  );
}
