"use client";

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa';

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const professoresLocalStorage = JSON.parse(localStorage.getItem("professores")) || [];
    setProfessores(professoresLocalStorage);
  }, []);

  function excluir(professor) {
    if (window.confirm(`Deseja realmente excluir o professor ${professor.nomeCompleto}?`)) {
      const novaLista = professores.filter(item => item.id !== professor.id);
      localStorage.setItem('professores', JSON.stringify(novaLista));
      setProfessores(novaLista);
      alert("Professor excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Professores"}>
      <div className='text-end mb-2'>
        <Button href='/professores/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Especialização</th>
            <th>CRN/Registro Profissional</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map(professor => (
            <tr key={professor.id}>
              <td>{professor.nomeCompleto}</td>
              <td>{professor.cpf}</td>
              <td>{professor.rg}</td>
              <td>{professor.dataNascimento}</td>
              <td>{professor.telefone}</td>
              <td>{professor.especializacao}</td>
              <td>{professor.crn}</td>
              <td>{professor.email}</td>
              <td className="text-center">
                <Button className="me-2" href={`/professores/form?id=${professor.id}`} variant="warning">
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(professor)}>
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
