"use client";

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function TreinamentoFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [alunos, setAlunos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [cpfAluno, setCpfAluno] = useState('');
    const [dadosSalvos, setDadosSalvos] = useState(null);
    const id = searchParams.get('id');

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
            nomeAluno: '',
            cpf: '',
            nomeProfessor: '',
            dataInicioPlano: '',
            dataTerminoPlano: '',
            objetivoTreinamento: '',
            treinosPorSemana: '',
            cargaExercicios: '',
            observacoes: '',
        },
    });

    useEffect(() => {
        // Ler alunos e professores do localStorage
        const storedAlunos = JSON.parse(localStorage.getItem('alunos')) || [];
        setAlunos(storedAlunos);

        const storedProfessores = JSON.parse(localStorage.getItem('professores')) || [];
        setProfessores(storedProfessores);

        // Carregar treino se o ID estiver presente
        if (id) {
            const storedTreinos = JSON.parse(localStorage.getItem('treinos')) || [];
            const treinos = storedTreinos.find(item => item.id === id);
            if (treinos) {
                reset(treinos);
                setCpfAluno(treinos.cpf);
            }
        }
    }, [id, reset]);

    const salvar = (dados) => {
        const storedTreinos = JSON.parse(localStorage.getItem('treinos')) || [];
        const novaLista = id
            ? storedTreinos.map(t => t.id === id ? { ...dados, id } : t)
            : [...storedTreinos, { ...dados, id: uuidv4() }];

        localStorage.setItem('treinos', JSON.stringify(novaLista));
        setDadosSalvos(dados);
        alert("Plano de treinamento cadastrado com sucesso!");
        router.push("/treinos");
    };

    const handleAlunoChange = (e) => {
        const selectedAluno = alunos.find(aluno => aluno.nomeCompleto === e.target.value);
        setValue("nomeAluno", e.target.value);
        setCpfAluno(selectedAluno ? selectedAluno.cpf : '');
        setValue("cpf", selectedAluno ? selectedAluno.cpf : '');
    };

    const handleProfessorChange = (e) => {
        const selectedProfessor = professores.find(professor => professor.nomeCompleto === e.target.value);
        setValue("nomeProfessor", e.target.value);
        setValue("cpf", selectedProfessor ? selectedProfessor.cpf : '');
    };

    return (
        <Pagina titulo="Cadastro de Plano de Treinamento">
            {dadosSalvos && (
                <Alert variant="success" className="mb-3">
                    <h5>Dados Salvos:</h5>
                    <p><strong>Nome do Aluno:</strong> {dadosSalvos.nomeAluno}</p>
                    <p><strong>CPF:</strong> {dadosSalvos.cpf}</p>
                    <p><strong>Professor:</strong> {dadosSalvos.nomeProfessor}</p>
                    <p><strong>Data de Início:</strong> {dadosSalvos.dataInicioPlano}</p>
                    <p><strong>Data de Término:</strong> {dadosSalvos.dataTerminoPlano}</p>
                    <p><strong>Objetivo:</strong> {dadosSalvos.objetivoTreinamento}</p>
                    <p><strong>Treinos por Semana:</strong> {dadosSalvos.treinosPorSemana}</p>
                    <p><strong>Carga de Exercícios:</strong> {dadosSalvos.cargaExercicios} kg</p>
                    <p><strong>Observações:</strong> {dadosSalvos.observacoes}</p>
                </Alert>
            )}

            <Form onSubmit={handleSubmit(salvar)} className="p-3">
                <Card className="mb-3">
                    <Card.Header as="h4" className="text-center">Dados do Plano de Treinamento</Card.Header>
                    <Card.Body>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Nome do Aluno:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("nomeAluno", { required: "Campo obrigatório" })}
                                    onChange={handleAlunoChange}
                                    isInvalid={errors.nomeAluno}
                                >
                                    <option value="">Selecione o aluno</option>
                                    {alunos.map(aluno => (
                                        <option key={aluno.id} value={aluno.nomeCompleto}>{aluno.nomeCompleto}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.nomeAluno?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Professor Responsável:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("nomeProfessor", { required: "Campo obrigatório" })}
                                    onChange={handleProfessorChange}
                                    isInvalid={errors.nomeProfessor}
                                >
                                    <option value="">Selecione o professor</option>
                                    {professores.map(professor => (
                                        <option key={professor.id} value={professor.nomeCompleto}>{professor.nomeCompleto}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.nomeProfessor?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Data de Início do Plano:</Form.Label>
                                <Form.Control
                                    {...register("dataInicioPlano", { required: "Campo obrigatório" })}
                                    type='date'
                                    isInvalid={errors.dataInicioPlano}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataInicioPlano?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Data de Término do Plano:</Form.Label>
                                <Form.Control
                                    {...register("dataTerminoPlano", { required: "Campo obrigatório" })}
                                    type='date'
                                    isInvalid={errors.dataTerminoPlano}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataTerminoPlano?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Objetivo do Treinamento:</Form.Label>
                                <Form.Control
                                    {...register("objetivoTreinamento", { required: "Campo obrigatório" })}
                                    type='text'
                                    placeholder="Ex: hipertrofia, emagrecimento"
                                    isInvalid={errors.objetivoTreinamento}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.objetivoTreinamento?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Treinos por Semana:</Form.Label>
                                <InputMask 
                                    mask="9"
                                    maskChar={null}
                                    {...register("treinosPorSemana", { 
                                        required: "Campo obrigatório", 
                                        validate: (value) => 
                                            (value >= 1 && value <= 7) || "Digite um número entre 1 e 7"
                                    })}
                                >
                                    {(inputProps) => (
                                        <Form.Control 
                                            {...inputProps}
                                            type="text"
                                            isInvalid={errors.treinosPorSemana}
                                            placeholder="1-7"
                                        />
                                    )}
                                </InputMask>
                                <Form.Control.Feedback type="invalid">
                                    {errors.treinosPorSemana?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Carga de Exercícios (kg):</Form.Label>
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
                                            placeholder="Ex: 100.5"
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
                            <Button className='me-2' variant='secondary' onClick={() => router.push('/treinos')}>
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
