"use client";

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa';

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => { // Hook de efeito, executado ao carregar o componente.
    const avaliacoesLocalStorage = JSON.parse(localStorage.getItem("avaliacoes")) || []; // Obtém lista de avaliações do localStorage, ou cria uma lista vazia.
    setAvaliacoes(avaliacoesLocalStorage); // Atualiza o estado com os dados do localStorage.
}, []); // Dependência vazia, então executa apenas uma vez após o carregamento.

  function excluir(avaliacao) {
    if (window.confirm(`Deseja realmente excluir a avaliação de ${avaliacao.nomeAluno}?`)) {
      const novaLista = avaliacoes.filter(item => item.id !== avaliacao.id);
      localStorage.setItem('avaliacoes', JSON.stringify(novaLista));
      setAvaliacoes(novaLista);
      alert("Avaliação excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo="Avaliações Físicas">
      <div className='text-end mb-2'>
        <Button href='/avaliacoes/form' variant="primary"><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>Data da Avaliação</th>
            <th>Altura (m)</th>
            <th>Peso (kg)</th>
            <th>% Gordura</th>
            <th>IMC</th>
            <th>Circunferência Abdominal (cm)</th>
            <th>Resultados e Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {avaliacoes.map(avaliacao => (
            <tr key={avaliacao.id}>
              <td>{avaliacao.nomeAluno}</td>
              <td>{avaliacao.dataAvaliacao}</td>
              <td>{avaliacao.altura}</td>
              <td>{avaliacao.peso}</td>
              <td>{avaliacao.percentualGordura}</td>
              <td>{avaliacao.imc}</td>
              <td>{avaliacao.circunferenciaAbdominal}</td>
              <td>{avaliacao.observacoes}</td>
              <td className="text-center">
                <Button className="me-2" href={`/avaliacoes/form?id=${avaliacao.id}`} variant="warning">
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(avaliacao)}>
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
