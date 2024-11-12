"use client"; // Indica que este arquivo deve ser renderizado no lado do cliente.

import Pagina from '@/components/Pagina'; // Importa o componente de página, possivelmente para estilização e estrutura.
import { useEffect, useState } from 'react'; // Importa hooks do React para manipular estado e efeitos.
import { Button, Table } from 'react-bootstrap'; // Importa componentes de botão e tabela da biblioteca react-bootstrap.
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'; // Importa ícones para editar, adicionar e excluir da biblioteca react-icons.

export default function ProfessoresPage() { // Define o componente principal da página de professores.
  const [professores, setProfessores] = useState([]); // Inicializa o estado 'professores' como uma lista vazia.

  useEffect(() => { // Hook de efeito, executado ao carregar o componente.
    const professoresLocalStorage = JSON.parse(localStorage.getItem("professores")) || []; // Obtém lista de professores do localStorage, ou cria uma lista vazia.
    setProfessores(professoresLocalStorage); // Atualiza o estado com os dados do localStorage.
  }, []); // Dependência vazia, então executa apenas uma vez após o carregamento.

  function excluir(professor) { // Função para excluir um professor específico.
    if (window.confirm(`Deseja realmente excluir o professor ${professor.nomeCompleto}?`)) { // Confirmação com o usuário antes de excluir.
      const novaLista = professores.filter(item => item.id !== professor.id); // Cria nova lista sem o professor excluído.
      localStorage.setItem('professores', JSON.stringify(novaLista)); // Atualiza o localStorage com a nova lista.
      setProfessores(novaLista); // Atualiza o estado com a nova lista.
      alert("Professor excluído com sucesso!"); // Alerta de confirmação de exclusão.
    }
  }

  return (
    <Pagina titulo={"Professores"}> {/* Define o título da página como "Professores". */}
      <div className='text-end mb-2'> {/* Div para alinhar o botão de adicionar professor à direita. */}
        <Button href='/professores/form'><FaPlusCircle /> Novo</Button> {/* Botão para adicionar novo professor. */}
      </div>

      <Table striped bordered hover> {/* Tabela estilizada com react-bootstrap para listar os professores. */}
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
            <th>Ações</th> {/* Coluna para ações como editar e excluir. */}
          </tr>
        </thead>
        <tbody>
          {professores.map(professor => ( // Mapeia cada professor na lista de professores.
            <tr key={professor.id}> {/* Linha de dados para cada professor com chave única. */}
              <td>{professor.nomeCompleto}</td> {/* Exibe o nome completo. */}
              <td>{professor.cpf}</td> {/* Exibe o CPF. */}
              <td>{professor.rg}</td> {/* Exibe o RG. */}
              <td>{professor.dataNascimento}</td> {/* Exibe a data de nascimento. */}
              <td>{professor.telefone}</td> {/* Exibe o telefone. */}
              <td>{professor.especializacao}</td> {/* Exibe a especialização. */}
              <td>{professor.crn}</td> {/* Exibe o registro profissional. */}
              <td>{professor.email}</td> {/* Exibe o email. */}
              <td className="text-center"> {/* Coluna de ações com botões centralizados. */}
                <Button className="me-2" href={`/professores/form?id=${professor.id}`} variant="warning"> {/* Botão para editar professor, redirecionando com o ID do professor. */}
                  <FaPen /> {/* Ícone de edição. */}
                </Button>
                <Button variant="danger" onClick={() => excluir(professor)}> {/* Botão para excluir professor. */}
                  <FaTrash /> {/* Ícone de lixeira para excluir. */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
