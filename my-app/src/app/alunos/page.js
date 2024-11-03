"use client"

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []
    setAlunos(alunosLocalStorage)
  }, [])

  function excluir(aluno) {
    if (window.confirm(`Deseja realmente excluir o aluno ${aluno.nomeCompleto}?`)) {
      const novaLista = alunos.filter(item => item.id !== aluno.id)
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      setAlunos(novaLista)
      alert("Aluno excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo</Button>
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
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.nomeCompleto}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.dataNascimento}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.endereco}</td>
              <td>{aluno.email}</td>
              <td>{aluno.matricula}</td>
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
  )
}
