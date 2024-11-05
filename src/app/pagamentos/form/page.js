"use client";

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";

export default function PagamentoFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [dadosSalvos, setDadosSalvos] = useState(null);
    const id = searchParams.get('id');

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
          nomeAluno: '',
          dataPagamento: '',
          valorPago: '',
          formaPagamento: '',
          proximoVencimento: '',
          numeroRecibo: '',
          statusPagamento: '',
          observacoes: '',
        },
    });

    useEffect(() => {
        const storedPagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];

        if (id) {
            const pagamento = storedPagamentos.find(item => item.id === id);
            if (pagamento) {
                reset(pagamento);
            }
        }
    }, [id, reset]);

    const salvar = (dados) => {
        const storedPagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
        const novaLista = id
          ? storedPagamentos.map(p => p.id === id ? { ...dados, id } : p)
          : [...storedPagamentos, { ...dados, id: uuidv4() }];

        localStorage.setItem('pagamentos', JSON.stringify(novaLista));
        setDadosSalvos(dados);
        alert("Dados de pagamento cadastrados com sucesso!");
        router.push("/pagamentos");
    };

    return (
        <Pagina titulo="Cadastro de Pagamento">
            {dadosSalvos && (
                <Alert variant="success" className="mb-3">
                    <h5>Dados Salvos:</h5>
                    <p><strong>Nome do Aluno:</strong> {dadosSalvos.nomeAluno}</p>
                    <p><strong>Data de Pagamento:</strong> {dadosSalvos.dataPagamento}</p>
                    <p><strong>Valor Pago (R$):</strong> {dadosSalvos.valorPago}</p>
                    <p><strong>Forma de Pagamento:</strong> {dadosSalvos.formaPagamento}</p>
                    <p><strong>Próximo Vencimento:</strong> {dadosSalvos.proximoVencimento}</p>
                    <p><strong>Número de Recibo:</strong> {dadosSalvos.numeroRecibo}</p>
                    <p><strong>Status do Pagamento:</strong> {dadosSalvos.statusPagamento}</p>
                    <p><strong>Observações:</strong> {dadosSalvos.observacoes}</p>
                </Alert>
            )}

            <Form onSubmit={handleSubmit(salvar)} className="p-3">
                <Card className="mb-3">
                    <Card.Header as="h4" className="text-center">Dados de Pagamento</Card.Header>
                    <Card.Body>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Nome do Aluno:</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("nomeAluno", { required: "Campo obrigatório" })}
                                    isInvalid={errors.nomeAluno}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.nomeAluno?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Data de Pagamento:</Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register("dataPagamento", { required: "Campo obrigatório" })}
                                    isInvalid={errors.dataPagamento}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataPagamento?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Valor Pago (R$):</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    {...register("valorPago", { required: "Campo obrigatório" })}
                                    isInvalid={errors.valorPago}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.valorPago?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Forma de Pagamento:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("formaPagamento", { required: "Campo obrigatório" })}
                                    isInvalid={errors.formaPagamento}
                                >
                                    <option value="">Selecione</option>
                                    <option value="credito">Crédito</option>
                                    <option value="debito">Débito</option>
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="pix">Pix</option>
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.formaPagamento?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Próximo Vencimento:</Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register("proximoVencimento", { required: "Campo obrigatório" })}
                                    isInvalid={errors.proximoVencimento}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.proximoVencimento?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Número de Recibo:</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("numeroRecibo", { required: "Campo obrigatório" })}
                                    isInvalid={errors.numeroRecibo}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.numeroRecibo?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Status do Pagamento:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("statusPagamento", { required: "Campo obrigatório" })}
                                    isInvalid={errors.statusPagamento}
                                >
                                    <option value="">Selecione</option>
                                    <option value="pago">Pago</option>
                                    <option value="pendente">Pendente</option>
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.statusPagamento?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Observações:</Form.Label>
                                <Form.Control
                                    {...register("observacoes")}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Anotações adicionais"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className='text-end'>
                            <Button className='me-2' variant='secondary' onClick={() => router.push('/pagamentos')}>
                                <FaArrowLeft className='me-1' /> Voltar
                            </Button>
                            <Button className='me-2' variant='danger' type="reset">
                                <FaTrash className='me-1' /> Limpar
                            </Button>
                            <Button variant='primary' type="submit">
                                <FaCheck className='me-1' /> Salvar
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Form>
        </Pagina>
    );
}
