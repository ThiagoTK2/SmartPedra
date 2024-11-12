'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [treinos, setTreinos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAlunos(JSON.parse(localStorage.getItem("alunos")) || []);
      setProfessores(JSON.parse(localStorage.getItem("professores")) || []);
      setTreinos(JSON.parse(localStorage.getItem("treinos")) || []);
      setAvaliacoes(JSON.parse(localStorage.getItem("avaliacoes")) || []);
      setPagamentos(JSON.parse(localStorage.getItem("pagamentos")) || []);
    }
  }, []);

  const lista = [
    {
      nome: "Alunos",
      imagem: "/img/Alunos.png", quantidade: alunos.length,
      link: "/alunos"
    },
    {
      nome: "Professores",
      imagem: "/img/Professor.png", quantidade: professores.length,
      link: "/professores"
    },
    {
      nome: "Treinos",
      imagem: "/img/Treinos.png", quantidade: treinos.length,
      link: "/treinos"
    },
    {
      nome: "Avaliacoes",
      imagem: "/img/Avaliacao.png", quantidade: avaliacoes.length,
      link: "/avaliacoes"
    },
    {
      nome: "Pagamentos",
      imagem: "/img/Pagamento.png", quantidade: pagamentos.length,
      link: "/pagamentos"
    },
    {
      nome: "Relatorio",
      imagem: "/img/Desempenho.png", quantidade: pagamentos.length,
      link: "/relatorio"
    },
  ];

  return (
    <Pagina titulo={"SmartPedra"}>
      <Row md={3} className="g-4">
        {lista.map((item, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <Card.Img 
                src={item.imagem} 
                style={{ height: '200px', objectFit: 'cover' }} 
                alt={`Imagem de ${item.nome}`} 
              />
              <Card.Body className="text-center">
                <Card.Title className="fs-4 fw-bold">{item.nome}</Card.Title>
                <Card.Text className="text-muted">
                  Cadastrados: <span className="fw-semibold">{item.quantidade}</span>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent border-0 text-center pb-3">
                <Button 
                  href={item.link} 
                  variant="outline-dark" 
                  className="rounded-pill px-4 py-2 shadow-sm"
                >
                  Ver Lista
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
