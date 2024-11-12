'use client' // Esta linha indica que o código deve ser executado no lado do cliente, no navegador, permitindo o uso de funcionalidades específicas do ambiente do cliente.

import Pagina from '@/components/Pagina' // Importa o componente "Pagina" de um caminho específico, que será usado para renderizar a estrutura principal da página.
import { Button, Card, Col, Row } from 'react-bootstrap' // Importa componentes de layout e interface do React Bootstrap.
import { useEffect, useState } from 'react' // Importa hooks do React para gerenciar estados e efeitos no componente.

export default function HomePage() { // Função principal do componente "HomePage"
  
  // Declaração de estados para armazenar dados sobre alunos, professores, treinos, avaliações e pagamentos.
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [treinos, setTreinos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  // useEffect é usado para carregar dados do localStorage quando o componente é montado
  useEffect(() => {
    // Confirma que o código está sendo executado no navegador antes de acessar o localStorage
    if (typeof window !== "undefined") {
      // Obtém dados do localStorage e armazena em estados específicos
      setAlunos(JSON.parse(localStorage.getItem("alunos")) || []);
      setProfessores(JSON.parse(localStorage.getItem("professores")) || []);
      setTreinos(JSON.parse(localStorage.getItem("treinos")) || []);
      setAvaliacoes(JSON.parse(localStorage.getItem("avaliacoes")) || []);
      setPagamentos(JSON.parse(localStorage.getItem("pagamentos")) || []);
    }
  }, []); // A dependência vazia garante que o código execute apenas na montagem do componente.

  // Lista de itens que serão exibidos na interface. Cada objeto contém informações sobre um item, como nome, imagem, quantidade e link.
  const lista = [
    {
      nome: "Alunos",
      imagem: "/img/Alunos.png", 
      quantidade: alunos.length, // Pega a quantidade de alunos do estado "alunos"
      link: "/alunos"
    },
    {
      nome: "Professores",
      imagem: "/img/Professor.png", 
      quantidade: professores.length,
      link: "/professores"
    },
    {
      nome: "Treinos",
      imagem: "/img/Treinos.png", 
      quantidade: treinos.length,
      link: "/treinos"
    },
    {
      nome: "Avaliacoes",
      imagem: "/img/Avaliacao.png", 
      quantidade: avaliacoes.length,
      link: "/avaliacoes"
    },
    {
      nome: "Pagamentos",
      imagem: "/img/Pagamento.png", 
      quantidade: pagamentos.length,
      link: "/pagamentos"
    },
    {
      nome: "Relatorio",
      imagem: "/img/Desempenho.png", 
      quantidade: pagamentos.length, // Usa o mesmo número de "pagamentos" para o relatório
      link: "/relatorio"
    },
  ];

  // Retorno do componente JSX
  return (
    <Pagina titulo={"SmartPedra"}> {/* Renderiza o componente Pagina com o título "SmartPedra" */}
      <Row md={3} className="g-4"> {/* Cria uma grade com 3 colunas e espaçamento entre elementos */}
        {lista.map((item, index) => ( // Mapeia cada item da lista para um Card
          <Col key={index}> {/* Usa o índice como chave para cada coluna */}
            <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <Card.Img 
                src={item.imagem} 
                style={{ height: '200px', objectFit: 'cover' }} 
                alt={`Imagem de ${item.nome}`} // Descrição alternativa para acessibilidade
              />
              <Card.Body className="text-center">
                <Card.Title className="fs-4 fw-bold">{item.nome}</Card.Title> {/* Título do card */}
                <Card.Text className="text-muted">
                  Cadastrados: <span className="fw-semibold">{item.quantidade}</span> {/* Exibe a quantidade de itens */}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent border-0 text-center pb-3">
                <Button 
                  href={item.link} 
                  variant="outline-dark" 
                  className="rounded-pill px-4 py-2 shadow-sm"
                >
                  Ver Lista {/* Texto do botão */}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
