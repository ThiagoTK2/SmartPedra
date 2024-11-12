"use client";

import Pagina from '@/components/Pagina';
import { useRouter, useParams } from 'next/navigation';  // Use useParams para capturar o 'id' na URL
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function CadastroAlunoPage() {
  const [isClient, setIsClient] = useState(false);  // Estado para verificar se é o lado cliente
  const [aluno, setAluno] = useState(null);  // Estado para armazenar os dados do aluno
  const router = useRouter();
  const params = useParams(); // Obtenha o parâmetro id da URL

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nomeCompleto: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      endereco: '',
      email: '',
      numeroMatricula: '',
      plano: ''
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Carregar os dados do aluno para editar
  useEffect(() => {
    if (isClient && params.id) {
      const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
      const alunoEncontrado = alunos.find(a => a.id === params.id);

      if (alunoEncontrado) {
        setAluno(alunoEncontrado);
        reset(alunoEncontrado);  // Preenche o formulário com os dados do aluno
      }
    }
  }, [isClient, params.id, reset]);

  const salvar = (dados) => {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos')) || [];
    let novaLista;

    if (aluno) {
      // Se já houver aluno, atualiza os dados
      novaLista = storedAlunos.map(a => a.id === aluno.id ? { ...dados, id: aluno.id } : a);
    } else {
      // Caso contrário, cria um novo aluno
      novaLista = [...storedAlunos, { ...dados, id: uuidv4() }];
    }

    localStorage.setItem('alunos', JSON.stringify(novaLista));
    alert(aluno ? "Aluno editado com sucesso!" : "Aluno cadastrado com sucesso!");
    router.push("/alunos");
  };

  if (!isClient) {
    return null;  // Não renderiza nada enquanto estamos no lado do servidor
  }

  return (
    <Pagina titulo={aluno ? "Editar Aluno" : "Cadastro de Aluno"}>
      <Form onSubmit={handleSubmit(salvar)} className="p-3">
      <Card className="mb-3">
          <Card.Header as="h4" className="text-center">Dados Pessoais</Card.Header>
          <Card.Body>
            <Row className='mb-3'>
              <Form.Group as={Col} md="6">
                <Form.Label>Nome Completo:</Form.Label>
                <Form.Control
                  {...register("nomeCompleto", { required: "Campo obrigatório" })}
                  type='text'
                  placeholder="Digite o nome completo"
                  isInvalid={errors.nomeCompleto}
                />
                <Form.Control.Feedback type='invalid'>{errors.nomeCompleto?.message}</Form.Control.Feedback>
              </Form.Group>

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
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} md="6">
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  {...register("dataNascimento", { required: "Campo obrigatório" })}
                  type='date'
                  isInvalid={errors.dataNascimento}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataNascimento?.message}</Form.Control.Feedback>
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
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  {...register("endereco", { required: "Campo obrigatório" })}
                  type='text'
                  placeholder="Digite o endereço"
                  isInvalid={errors.endereco}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} md="6">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  {...register("email", { required: "Campo obrigatório" })}
                  type='email'
                  placeholder="Digite o email"
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Número de Matrícula:</Form.Label>
                <Form.Control
                  {...register("numeroMatricula", { required: "Campo obrigatório" })}
                  type='text'
                  placeholder="Digite o número de matrícula"
                  isInvalid={errors.numeroMatricula}
                />
                <Form.Control.Feedback type='invalid'>{errors.numeroMatricula?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>Plano:</Form.Label>
                <Form.Control
                  {...register("plano", { required: "Campo obrigatório" })}
                  as="select"
                  isInvalid={errors.plano}
                >
                  <option value="">Selecione o plano</option>
                  <option value="Plano Stone Plus">Plano Stone Plus</option>
                  <option value="Plano Stone">Plano Stone</option>
                  <option value="Plano Pedra">Plano Pedra</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.plano?.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' variant='secondary' onClick={() => router.push('/alunos')}>
                <FaArrowLeft className='me-1' /> Voltar
              </Button>
              <Button className='me-2' variant='danger' type="reset">
                <FaTrash className='me-1' /> Limpar
              </Button>
              <Button variant='primary' type="submit">
                <FaCheck className='me-1' /> {aluno ? 'Salvar alterações' : 'Salvar'}
              </Button>
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
    </Pagina>
  );
}
