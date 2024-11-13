// Indica que o componente é renderizado no lado do cliente
"use client";

import Pagina from '@/components/Pagina'; // Importa o componente para estrutura de página
import { useRouter } from 'next/navigation'; // Hook para navegação de páginas
import { useEffect, useState } from 'react'; // Hooks para estado e efeitos no React
import { Button, Table, Card } from 'react-bootstrap'; // Componentes do Bootstrap para layout
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Ícones para os botões de ação

// Componente da página de listagem de pagamentos
export default function PagamentosPage() {
    const router = useRouter(); // Inicializa o roteador para navegação
    const [pagamentos, setPagamentos] = useState([]); // Estado para armazenar a lista de pagamentos

    // Executa ao carregar a página para buscar os pagamentos salvos no localStorage
    useEffect(() => {
        const storedPagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
        setPagamentos(storedPagamentos); // Atualiza o estado com os pagamentos salvos
    }, []);

    // Função para redirecionar à página de novo pagamento
    const handleNovoPagamento = () => {
        router.push("/pagamentos/form");
    };

    // Função para redirecionar à página de edição de pagamento, passando o ID do pagamento
    const editarPagamento = (id) => {
        router.push(`/pagamentos/form?id=${id}`);
    };

    // Função para excluir um pagamento específico pelo ID
    const excluirPagamento = (id) => {
        if (confirm("Tem certeza que deseja excluir este pagamento?")) {
            // Filtra para remover o pagamento selecionado
            const updatedPagamentos = pagamentos.filter(pagamento => pagamento.id !== id);
            setPagamentos(updatedPagamentos); // Atualiza o estado
            localStorage.setItem('pagamentos', JSON.stringify(updatedPagamentos)); // Atualiza o localStorage
        }
    };

    return (
        <Pagina titulo="Lista de Pagamentos">
            {/* Card para exibir a tabela de pagamentos */}
            <Card className="mb-3">
                <Card.Header as="h4" className="text-center">Pagamentos Registrados</Card.Header>
                <Card.Body>
                    {/* Botão para adicionar um novo pagamento */}
                    <Button variant="primary" onClick={handleNovoPagamento} className="mb-3">
                        <FaPlus className="me-1" /> Novo Pagamento
                    </Button>

                    {/* Tabela de pagamentos ou mensagem informando que não há pagamentos */}
                    {pagamentos.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome do Aluno</th>
                                    <th>Data de Pagamento</th>
                                    <th>Valor Pago (R$)</th>
                                    <th>Forma de Pagamento</th>
                                    <th>Próximo Vencimento</th>
                                    <th>Status do Pagamento</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapeia os pagamentos para exibir cada um em uma linha */}
                                {pagamentos.map((pagamento) => (
                                    <tr key={pagamento.id}>
                                        <td>{pagamento.nomeAluno}</td>
                                        <td>{pagamento.dataPagamento}</td>
                                        <td>{pagamento.valorPago}</td>
                                        <td>{pagamento.formaPagamento}</td>
                                        <td>{pagamento.proximoVencimento}</td>
                                        <td>{pagamento.statusPagamento}</td>
                                        <td>
                                            {/* Botão de editar pagamento */}
                                            <Button
                                                variant="warning"
                                                onClick={() => editarPagamento(pagamento.id)}
                                                className="me-2"
                                            >
                                                <FaEdit /> Editar
                                            </Button>
                                            {/* Botão de excluir pagamento */}
                                            <Button
                                                variant="danger"
                                                onClick={() => excluirPagamento(pagamento.id)}
                                            >
                                                <FaTrash /> Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>Nenhum pagamento registrado.</p> // Mensagem exibida caso não haja pagamentos
                    )}
                </Card.Body>
            </Card>
        </Pagina>
    );
}
