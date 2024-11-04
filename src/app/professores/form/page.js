"use client";

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 } from 'uuid';
import { useSearchParams } from 'next/navigation'; // Importação do useSearchParams
import { useForm } from "react-hook-form";

export default function ProfessorFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Usando useSearchParams
  const [professores, setProfessores] = useState([]);
  const [professorEditado, setProfessorEditado] = useState(null);
  const id = searchParams.get('id'); // Obtendo o id de searchParams

  // useEffect para carregar os professores e o professor a ser editado
  useEffect(() => {
    const professoresLocal = JSON.parse(localStorage.getItem('professores')) || [];
    setProfessores(professoresLocal);
    
    if (id) {
      const professorEncontrado = professoresLocal.find(item => item.id === id);
      setProfessorEditado(professorEncontrado);
    }
  }, [id]); // Dependência em `id`

  // Função para salvar o professor
  function salvar(dados) {
    if (professorEditado) {
      Object.assign(professorEditado, dados);
      localStorage.setItem('professores', JSON.stringify(professores));
    } else {
      dados.id = v4();
      professores.push(dados);
      localStorage.setItem('professores', JSON.stringify(professores));
    }

    alert("Professor cadastrado com sucesso!");
    router.push("/professores");
  }

  // Valores iniciais do formulário
  const initialValues = {
    nomeCompleto: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    telefone: '',
    especializacao: '',
    crn: '',
    email: '',
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: professorEditado || initialValues,
  });

  return (
    <Pagina titulo={"Cadastro de Professor"}>
      <Form onSubmit={handleSubmit(salvar)} className="p-3">
        <Card className="mb-3">
          <Card.Header as="h4" className="text-center">Dados Pessoais</Card.Header>
          <Card.Body>
            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Nome Completo:</Form.Label>
                <Form.Control
                  {...register("nomeCompleto", { required: "Campo obrigatório" })}
                  type='text'
                  isInvalid={errors.nomeCompleto}
                />
                <Form.Control.Feedback type='invalid'>{errors.nomeCompleto?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <Form.Control
                  {...register("cpf", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF inválido",
                    },
                  })}
                  type='text'
                  placeholder="000.000.000-00"
                  isInvalid={errors.cpf}
                />
                <Form.Control.Feedback type='invalid'>{errors.cpf?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>RG:</Form.Label>
                <Form.Control
                  {...register("rg", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^\d{1,2}\.\d{3}\.\d{3}-\d$/,
                      message: "RG inválido",
                    },
                  })}
                  type='text'
                  placeholder="00.000.000-0"
                  isInvalid={errors.rg}
                />
                <Form.Control.Feedback type='invalid'>{errors.rg?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  {...register("dataNascimento", { required: "Campo obrigatório" })}
                  type='date'
                  isInvalid={errors.dataNascimento}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataNascimento?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  {...register("telefone", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^\(\d{2}\) \d{5}-\d{4}$/,
                      message: "Telefone inválido",
                    },
                  })}
                  type='text'
                  placeholder="(00) 00000-0000"
                  isInvalid={errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Especialização:</Form.Label>
                <Form.Control
                  {...register("especializacao", { required: "Campo obrigatório" })}
                  type='text'
                  isInvalid={errors.especializacao}
                />
                <Form.Control.Feedback type='invalid'>{errors.especializacao?.message}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>CRN/Registro Profissional:</Form.Label>
                <Form.Control
                  {...register("crn", { required: "Campo obrigatório" })}
                  type='text'
                  isInvalid={errors.crn}
                />
                <Form.Control.Feedback type='invalid'>{errors.crn?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  {...register("email", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  })}
                  type='email'
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>

        <Form.Group className='text-end'>
          <Button className='me-2' variant='secondary' onClick={() => router.push('/professores')}>
            <FaArrowLeft className='me-1' /> Voltar
          </Button>
          <Button className='me-2' variant='danger' type="reset">
            <FaTrash className='me-1' /> Limpar
          </Button>
          <Button variant='primary' type="submit">
            <FaCheck className='me-1' /> Salvar
          </Button>
        </Form.Group>
      </Form>
    </Pagina>
  );
}
