"use client";

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function AvaliacaoFormPage() {
    const router = useRouter();
    const [alunos, setAlunos] = useState([]);
    const [dadosSalvos, setDadosSalvos] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
          nomeAluno: '',
          dataAvaliacao: '',
          altura: '',
          peso: '',
          percentualGordura: '',
          circunferenciaAbdominal: '',
          imc: '',
          observacoes: '',
        },
    });

    useEffect(() => {
        // Carregar alunos do localStorage
        const storedAlunos = JSON.parse(localStorage.getItem('alunos')) || [];
        setAlunos(storedAlunos);
    }, []);

    const salvar = (dados) => {
        const storedAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
        const novaLista = [...storedAvaliacoes, { ...dados, id: uuidv4() }];

        localStorage.setItem('avaliacoes', JSON.stringify(novaLista));
        setDadosSalvos(dados);
        alert("Avaliação cadastrada com sucesso!");
        router.push("/avaliacoes");
    };

    return (
        <Pagina titulo="Cadastro de Avaliação">
            {dadosSalvos && (
                <Alert variant="success" className="mb-3">
                    <h5>Dados Salvos:</h5>
                    <p><strong>Nome do Aluno:</strong> {dadosSalvos.nomeAluno}</p>
                    <p><strong>Data da Avaliação:</strong> {dadosSalvos.dataAvaliacao}</p>
                    <p><strong>Altura:</strong> {dadosSalvos.altura} m</p>
                    <p><strong>Peso:</strong> {dadosSalvos.peso} kg</p>
                    <p><strong>Percentual de Gordura:</strong> {dadosSalvos.percentualGordura} %</p>
                    <p><strong>Circunferência Abdominal:</strong> {dadosSalvos.circunferenciaAbdominal} cm</p>
                    <p><strong>IMC:</strong> {dadosSalvos.imc}</p>
                    <p><strong>Observações:</strong> {dadosSalvos.observacoes}</p>
                </Alert>
            )}

            <Form onSubmit={handleSubmit(salvar)} className="p-3">
                <Card className="mb-3">
                    <Card.Header as="h4" className="text-center">Dados da Avaliação</Card.Header>
                    <Card.Body>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Nome do Aluno:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("nomeAluno", { required: "Campo obrigatório" })}
                                    isInvalid={errors.nomeAluno}
                                >
                                    <option value="">Selecione um aluno</option>
                                    {alunos.map(aluno => (
                                        <option key={aluno.id} value={aluno.nomeCompleto}>{aluno.nomeCompleto}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.nomeAluno?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Data da Avaliação:</Form.Label>
                                <Form.Control
                                    {...register("dataAvaliacao", { required: "Campo obrigatório" })}
                                    type='date'
                                    isInvalid={errors.dataAvaliacao}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataAvaliacao?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Altura (m):</Form.Label>
                                <Form.Control
                                    {...register("altura", { required: "Campo obrigatório" })}
                                    type='number'
                                    step="0.01"
                                    placeholder="Ex: 1.80m"
                                    isInvalid={errors.altura}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.altura?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Peso (kg):</Form.Label>
                                <InputMask
                                    mask="999.9"
                                    maskChar={null}
                                    {...register("cargaExercicios", { 
                                        required: "Campo obrigatório",
                                        pattern: {
                                            value: /^\d{1,3}(\.\d)?$/,
                                            message: "Formato inválido. Use até 3 dígitos e um decimal opcional"
                                        }
                                    })}
                                >
                                    {(inputProps) => (
                                        <Form.Control
                                            {...inputProps}
                                            type="text"
                                            isInvalid={errors.cargaExercicios}
                                            placeholder="Ex: 90kg"
                                        />
                                    )}
                                </InputMask>
                                <Form.Control.Feedback type="invalid">
                                    {errors.cargaExercicios?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Percentual de Gordura (%):</Form.Label>
                                <Form.Control
                                    {...register("percentualGordura")}
                                    type='number'
                                    step="0.1"
                                    placeholder="Ex: 40%"
                                    isInvalid={errors.percentualGordura}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.percentualGordura?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>IMC:</Form.Label>
                                <Form.Control
                                    {...register("imc")}
                                    type='number'
                                    step="0.1"
                                    placeholder="Ex: 40"
                                    isInvalid={errors.imc}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.imc?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Circunferência Abdominal (cm):</Form.Label>
                                <Form.Control
                                    {...register("circunferenciaAbdominal")}
                                    type='number'
                                    step="0.1"
                                    placeholder="Ex: 30cm"
                                    isInvalid={errors.circunferenciaAbdominal}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.circunferenciaAbdominal?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Resultados e Observações:</Form.Label>
                                <Form.Control
                                    {...register("observacoes")}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Anotações adicionais"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className='text-end'>
                            <Button className='me-2' variant='secondary' onClick={() => router.push('/avaliacoes')}>
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
