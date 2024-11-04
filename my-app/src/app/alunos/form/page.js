'use client';

import Pagina from '@/components/Pagina';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { useSearchParams } from 'next/navigation'; // Importação do useSearchParams
import { useForm } from "react-hook-form";

export default function AlunoFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Usando useSearchParams
  const [faculdades, setFaculdades] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]); // Estado para formas de pagamento
  const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  const id = searchParams.get('id'); // Obtendo o id de searchParams
  const alunoEditado = alunos.find(item => item.id == id);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const faculdadesLocal = JSON.parse(localStorage.getItem('faculdades')) || [];
    setFaculdades(faculdadesLocal);

    const formasPagamentoLocal = JSON.parse(localStorage.getItem('formasPagamento')) || [];
    setFormasPagamento(formasPagamentoLocal); // Carregando formas de pagamento
  }, []);

  function salvar(dados) {
    if (alunoEditado) {
      Object.assign(alunoEditado, dados);
      localStorage.setItem('alunos', JSON.stringify(alunos));
    } else {
      dados.id = v4();
      dados.planosTreinamento = []; // Inicializando a relação com planos de treinamento
      alunos.push(dados);
      localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    alert("Aluno cadastrado com sucesso!");
    router.push("/alunos");
  }

  const initialValues = {
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    endereco: '',
    email: '',
    matricula: '',
    pagamento: '', // Adicionando campo pagamento
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: alunoEditado || initialValues,
  });

  return (
    <Pagina titulo={"Cadastro de Aluno"}>
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
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  {...register("endereco", { required: "Campo obrigatório" })}
                  type='text'
                  isInvalid={errors.endereco}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.message}</Form.Control.Feedback>
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
              <Form.Group as={Col}>
                <Form.Label>Número de Matrícula:</Form.Label>
                <Form.Control
                  {...register("matricula", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^\d+$/,
                      message: "Número de matrícula inválido",
                    },
                  })}
                  type='text'
                  placeholder="Digite apenas números"
                  isInvalid={errors.matricula}
                />
                <Form.Control.Feedback type='invalid'>{errors.matricula?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Forma de Pagamento:</Form.Label>
                <Form.Control
                  {...register("pagamento", { required: "Campo obrigatório" })}
                  as="select"
                  isInvalid={errors.pagamento}
                >
                  <option value="">Selecione uma forma de pagamento</option>
                  {formasPagamento.map(pagamento => (
                    <option key={pagamento.id} value={pagamento.id}>{pagamento.nome}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.pagamento?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>

        <Form.Group className='text-end'>
          <Button className='me-2' variant='secondary' onClick={() => router.push('/alunos')}>
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
