"use client";

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa';

export default function TreinosPage() {
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    // Carrega os treinos do localStorage quando a página é carregada
    const treinosLocalStorage = JSON.parse(localStorage.getItem("treinos")) || [];
    setTreinos(treinosLocalStorage);
  }, []);

  function excluir(treino) {
    if (window.confirm(`Deseja realmente excluir o treino para o aluno ${treino.nomeAluno}?`)) {
      const novaLista = treinos.filter(item => item.id !== treino.id);
      localStorage.setItem('treinos', JSON.stringify(novaLista));
      setTreinos(novaLista);
      alert("Treino excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo="Treinos">
      <div className="text-end mb-2">
        <Button href='/treinos/form' variant="primary"><FaPlusCircle /> Novo</Button>
      </div>

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
                <Button className="me-2" href={`/treinos/form?id=${treino.id}`} variant="warning">
                  <FaPen />
                </Button>
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
