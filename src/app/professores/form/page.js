"use client";

import Pagina from '@/components/Pagina';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from "react-hook-form";
import CPFInput from '@/components/CPFInput';
import RGInput from '@/components/RGInput';
import TelefoneInput from '@/components/TelefoneInput';

export default function ProfessorFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [professores, setProfessores] = useState([]);
  const [professorEditado, setProfessorEditado] = useState(null);
  const id = searchParams.get('id');
  const [dadosSalvos, setDadosSalvos] = useState(null);

  useEffect(() => {
    // Carrega os professores do localStorage ao carregar a página
    const professoresLocal = JSON.parse(localStorage.getItem('professores')) || [];
    setProfessores(professoresLocal);

    if (id) {
      const professorEncontrado = professoresLocal.find(item => item.id === id);
      setProfessorEditado(professorEncontrado);
    }
  }, [id]);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: professorEditado || {
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
    if (professorEditado) {
      Object.keys(professorEditado).forEach((key) => setValue(key, professorEditado[key]));
    }
  }, [professorEditado, setValue]);

  const salvar = (dados) => {
    const storedProfessores = JSON.parse(localStorage.getItem('professores')) || [];
    const novaLista = id
      ? storedProfessores.map(p => p.id === id ? { ...dados, id } : p)
      : [...storedProfessores, { ...dados, id: uuidv4() }];

    localStorage.setItem('professores', JSON.stringify(novaLista));
    setDadosSalvos(dados);  // Armazena os dados salvos no estado para exibição
    alert("Professor cadastrado com sucesso!");
    router.push("/professores");
};


  return (
    <Pagina titulo="Cadastro de Professor">
      <Form onSubmit={handleSubmit} className="p-3">
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
                <Controller
                  name="cpf"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                    validate: (value) => validateCPF(value) || "CPF inválido"
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <CPFInput
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        isInvalid={!!error}
                      />
                      <Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Controller
                  name="rg"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                    validate: (value) => validateRG(value) || "RG inválido"
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <RGInput
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        isInvalid={!!error}
                      />
                      <Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
                    </>
                  )}
                />
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
                <Controller
                  name="telefone"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                    validate: (value) => validateTelefone(value) || "Telefone inválido"
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <TelefoneInput
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="(00) 00000-0000"
                        isInvalid={!!error}
                      />
                      <Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
                    </>
                  )}
                />
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
