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
  ];

  return (
    <Pagina titulo={"SmartPedra"}>
      <Row md={4}>
        {lista.map((item, index) => (
          <Col className='py-2' key={index}>
            <Card style={{ height: '100%' }}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
