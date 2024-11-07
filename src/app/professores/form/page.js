"use client";

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function CadastroProfessorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
          nomeCompleto: '',
          cpf: '',
          rg: '',
          dataNascimento: '',
          telefone: '',
          especializacao: '',
          crn: '',
          email: '',
        },
    });

    useEffect(() => {
        const storedProfessores = JSON.parse(localStorage.getItem('professores')) || [];
        if (id) {
          const professor = storedProfessores.find(item => item.id === id);
          if (professor) {
            reset(professor);
          }
        }
    }, [id, reset]);

    const salvar = (dados) => {
        const storedProfessores = JSON.parse(localStorage.getItem('professores')) || [];
        const novaLista = id
          ? storedProfessores.map(p => p.id === id ? { ...dados, id } : p)
          : [...storedProfessores, { ...dados, id: uuidv4() }];

        localStorage.setItem('professores', JSON.stringify(novaLista));
        alert("Professor cadastrado com sucesso!");
        router.push("/professores");
    };

    return (
        <Pagina titulo="Cadastro de Professor">
            <Form onSubmit={handleSubmit(salvar)} className="p-3">
                <Card className="mb-3">
                    <Card.Header as="h4" className="text-center">Dados Pessoais</Card.Header>
                    <Card.Body>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control
                                    {...register("nomeCompleto", { required: "Campo obrigatório" })}
                                    type="text"
                                    isInvalid={errors.nomeCompleto}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.nomeCompleto?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                        <Form.Label>Telefone:</Form.Label>
                            <InputMask 
                                mask="(99) 99999-9999"
                                {...register("telefone", { required: "Campo obrigatório" })}
                            >
                                  {(inputProps) => (
                                <Form.Control 
                                  {...inputProps}
                                    type="text"
                                    placeholder="(00) 00000-0000"
                                      isInvalid={errors.telefone}
                                />
                                 )}
                            </InputMask>
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                        <Form.Group as={Col}> 
                                <Form.Label>CPF:</Form.Label>
                                <InputMask 
                                    mask="999.999.999-99"
                                    {...register("cpf", { required: "Campo obrigatório" })}
                                >
                                    {(inputProps) => (
                                        <Form.Control 
                                            {...inputProps}
                                            type="text"
                                            isInvalid={errors.cpf}
                                        />
                                    )}
                                </InputMask>
                                <Form.Control.Feedback type="invalid">
                                    {errors.cpf?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6}> 
                                <Form.Label>RG:</Form.Label>
                                    <InputMask 
                                        mask="9.999.999"
                                        {...register("rg", { required: "Campo obrigatório" })}
    >
                                    {(inputProps) => (
                                        <Form.Control 
                                            {...inputProps}
                                            type="text"
                                              isInvalid={errors.rg}
                                        />
                                   )}
                                    </InputMask>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rg?.message}
                                        </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Data de Nascimento:</Form.Label>
                                <Form.Control
                                    {...register("dataNascimento", { required: "Campo obrigatório" })}
                                    type="date"
                                    isInvalid={errors.dataNascimento}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataNascimento?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    {...register("email", { required: "Campo obrigatório" })}
                                    type="email"
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Especialização:</Form.Label>
                                <Form.Control
                                    {...register("especializacao", { required: "Campo obrigatório" })}
                                    type="text"
                                    isInvalid={errors.especializacao}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.especializacao?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>CRN/Registro Profissional:</Form.Label>
                                <Form.Control
                                    {...register("crn", { required: "Campo obrigatório" })}
                                    type="text"
                                    isInvalid={errors.crn}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.crn?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className='text-end'>
                            <Button className='me-2' variant='secondary' onClick={() => router.push('/professores')}>
                                <FaArrowLeft className='me-1' /> Voltar
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
