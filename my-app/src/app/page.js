'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function HomePage() {
  const [alunos, setAlunos] = useState([])
  const [professores, setProfessores] = useState([])
  const [treinos, setTreinos] = useState([])
  const [avaliacoes, setAvaliacoes] = useState([])
  const [pagamentos, setPagamentos] = useState([])
  const [loading, setLoading] = useState(true)

  const lista = [
    {
      nome: "Alunos",
      imagem: "https://i.pinimg.com/236x/ce/96/4d/ce964d843b92374b8b96e105ffa82831.jpg", quantidade: alunos.length,
      link: "/alunos"
    },
    {
      nome: "Professores",
      imagem: "https://i.pinimg.com/736x/39/09/fb/3909fb65bbab271bb5a9ddbf85c80d00.jpg", quantidade: professores.length,
      link: "/professores"
    },
    {
      nome: "Treinos",
      imagem: "https://i.pinimg.com/236x/53/f4/63/53f463fcc23af8ec4fc28e7c5ccd168a.jpg", quantidade: treinos.length,
      link: "/treinos"
    },
    {
      nome: "Avaliacoes",
      imagem: "https://i.pinimg.com/474x/b2/1d/08/b21d0843c3a0d5f5586222644bf402cd.jpg", quantidade: avaliacoes.length,
      link: "/avaliacoes"
    },
    {
      nome: "Pagamentos",
      imagem: "https://i.pinimg.com/236x/79/0f/fc/790ffceeb183a1059b77c5558342ffc0.jpg", quantidade: pagamentos.length,
      link: "/pagamentos"
    },
  ]

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const alunosData = await axios.get('/api/alunos')
        const professoresData = await axios.get('/api/professores')
        const treinosData = await axios.get('/api/treinos')
        const avaliacoesData = await axios.get('/api/avaliacoes')
        const pagamentosData = await axios.get('/api/pagamentos')

        setAlunos(alunosData.data)
        setProfessores(professoresData.data)
        setTreinos(treinosData.data)
        setAvaliacoes(avaliacoesData.data)
        setPagamentos(pagamentosData.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Pagina titulo={"SmartPedra"}>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {lista.map((item, index) => (
            <Col key={index} className='py-2'>
              <Card style={{ height: '100%' }}>
                <Card.Img src={item.imagem} style={{ height: '200px', objectFit: 'cover' }} />
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
      )}
    </Pagina>
  )
}
