"use client";

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Table, Card } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function PagamentosPage() {
    const router = useRouter();
    const [pagamentos, setPagamentos] = useState([]);

    useEffect(() => {
        const storedPagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
        setPagamentos(storedPagamentos);
    }, []);

    const handleNovoPagamento = () => {
        router.push("/pagamentos/form");
    };

    const editarPagamento = (id) => {
        router.push(`/pagamentos/form?id=${id}`);
    };

    const excluirPagamento = (id) => {
        if (confirm("Tem certeza que deseja excluir este pagamento?")) {
            const updatedPagamentos = pagamentos.filter(pagamento => pagamento.id !== id);
            setPagamentos(updatedPagamentos);
            localStorage.setItem('pagamentos', JSON.stringify(updatedPagamentos));
        }
    };

    return (
        <Pagina titulo="Lista de Pagamentos">
            <Card className="mb-3">
                <Card.Header as="h4" className="text-center">Pagamentos Registrados</Card.Header>
                <Card.Body>
                    <Button variant="primary" onClick={handleNovoPagamento} className="mb-3">
                        <FaPlus className="me-1" /> Novo Pagamento
                    </Button>

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
                                {pagamentos.map((pagamento) => (
                                    <tr key={pagamento.id}>
                                        <td>{pagamento.nomeAluno}</td>
                                        <td>{pagamento.dataPagamento}</td>
                                        <td>{pagamento.valorPago}</td>
                                        <td>{pagamento.formaPagamento}</td>
                                        <td>{pagamento.proximoVencimento}</td>
                                        <td>{pagamento.statusPagamento}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => editarPagamento(pagamento.id)}
                                                className="me-2"
                                            >
                                                <FaEdit /> Editar
                                            </Button>
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
                        <p>Nenhum pagamento registrado.</p>
                    )}
                </Card.Body>
            </Card>
        </Pagina>
    );
}
