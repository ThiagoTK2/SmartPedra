// Indica que o componente é renderizado no lado do cliente para usar hooks como useState e useEffect
"use client";

import Pagina from '@/components/Pagina'; // Importa o componente de layout da página
import { useEffect, useState } from 'react'; // Importa hooks de React
import { Button, Table } from 'react-bootstrap'; // Importa componentes de botão e tabela do Bootstrap
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'; // Importa ícones para ações
import "../page.module.css"; // Importa o estilo CSS da página

// Função principal do componente da página de Treinos
export default function TreinosPage() {
  // Estado que armazena a lista de treinos
  const [treinos, setTreinos] = useState([]);

  // useEffect roda quando o componente é montado
  useEffect(() => {
    // Carrega os treinos salvos no localStorage quando a página é carregada
    const treinosLocalStorage = JSON.parse(localStorage.getItem("treinos")) || [];
    setTreinos(treinosLocalStorage); // Atualiza o estado com a lista de treinos
  }, []);

  // Função para excluir um treino específico
  function excluir(treino) {
    // Confirmação antes de excluir
    if (window.confirm(`Deseja realmente excluir o treino para o aluno ${treino.nomeAluno}?`)) {
      // Cria uma nova lista excluindo o treino selecionado
      const novaLista = treinos.filter(item => item.id !== treino.id);
      // Atualiza o localStorage com a nova lista
      localStorage.setItem('treinos', JSON.stringify(novaLista));
      setTreinos(novaLista); // Atualiza o estado com a nova lista
      alert("Treino excluído com sucesso!"); // Mensagem de confirmação
    }
  }

  // Renderização do componente
  return (
    // Componente de layout da página com o título
    <Pagina titulo="Treinos">
      <div className="text-end mb-2">
        {/* Botão para adicionar um novo treino */}
        <Button href='/treinos/form' variant="primary"><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela que exibe a lista de treinos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>Data de Início do Plano</th>
            <th>Data de Término do Plano</th>
            <th>Objetivo do Treinamento</th>
            <th>Treinos por Semana</th>
            <th>Carga de Exercícios (kg)</th>
            <th>Professor Responsável</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeia cada treino para uma linha na tabela */}
          {treinos.map((treino) => (
            <tr key={treino.id}>
              <td>{treino.nomeAluno || "Não especificado"}</td>
              <td>{treino.dataInicioPlano || "Não especificado"}</td>
              <td>{treino.dataTerminoPlano || "Não especificado"}</td>
              <td>{treino.objetivoTreinamento || "Não especificado"}</td>
              <td>{treino.treinosPorSemana || "Não especificado"}</td>
              <td>{treino.cargaExercicios || "Não especificado"}</td>
              <td>{treino.nomeProfessor || "Não especificado"}</td>
              <td>{treino.observacoes || "Não especificado"}</td>
              <td className="text-center">
                {/* Botão para editar o treino */}
                <Button className="me-2" href={`/treinos/form?id=${treino.id}`} variant="warning">
                  <FaPen />
                </Button>
                {/* Botão para excluir o treino */}
                <Button variant="danger" onClick={() => excluir(treino)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
