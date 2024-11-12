"use client";

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa';

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => { // Hook de efeito, executado ao carregar o componente.
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []; // Obtém lista de alunos do localStorage, ou cria uma lista vazia.
    setAlunos(alunosLocalStorage); // Atualiza o estado com os dados do localStorage.
}, []); // Dependência vazia, então executa apenas uma vez após o carregamento.

  function excluir(aluno) {
    if (window.confirm(`Deseja realmente excluir o cadastro do aluno ${aluno.nomeCompleto}?`)) {
      const novaLista = alunos.filter(item => item.id !== aluno.id);
      localStorage.setItem('alunos', JSON.stringify(novaLista));
      setAlunos(novaLista);
      alert("Cadastro do aluno excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo="Alunos">
      <div className="text-end mb-2">
        <Button href='/alunos/form' variant="primary"><FaPlusCircle /> Novo Aluno</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Email</th>
            <th>Número de Matrícula</th>
            <th>Plano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nomeCompleto || "Não especificado"}</td>
              <td>{aluno.cpf || "Não especificado"}</td>
              <td>{aluno.dataNascimento || "Não especificado"}</td>
              <td>{aluno.telefone || "Não especificado"}</td>
              <td>{aluno.endereco || "Não especificado"}</td>
              <td>{aluno.email || "Não especificado"}</td>
              <td>{aluno.numeroMatricula || "Não especificado"}</td>
              <td>{aluno.plano || "Não especificado"}</td>
              <td className="text-center">
                <Button className="me-2" href={`/alunos/form?id=${aluno.id}`} variant="warning">
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(aluno)}>
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
