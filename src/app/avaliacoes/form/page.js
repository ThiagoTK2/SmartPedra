"use client";

import Pagina from '@/components/Pagina';
import { Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

export default function AvaliacaoFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');  // Pega o ID da URL
  
  const [alunos, setAlunos] = useState([]); // Estado para armazenar alunos
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const avaliacaoEditada = avaliacoes.find(item => item.id === id);

  useEffect(() => {
    // Carrega os alunos cadastrados do localStorage
    const alunosCadastrados = JSON.parse(localStorage.getItem('alunos')) || [];
    setAlunos(alunosCadastrados);
  }, []);

  function salvar(dados) {
    if (avaliacaoEditada) {
      Object.assign(avaliacaoEditada, dados);
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    } else {
      dados.id = uuidv4();
      avaliacoes.push(dados);
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    }

    alert("Avaliação salva com sucesso!");
    router.push("/avaliacoes");
  }

  const initialValues = {
    nomeAluno: '',
    dataAvaliacao: '',
    altura: '',
    peso: '',
    percentualGordura: '',
    imc: '',
    circunferenciaAbdominal: '',
    resultadosObservacoes: ''
  };

  const validationSchema = Yup.object().shape({
    nomeAluno: Yup.string().required("Campo obrigatório"),
    dataAvaliacao: Yup.date().required("Campo obrigatório"),
    altura: Yup.number().required("Campo obrigatório").min(0, "Altura inválida"),
    peso: Yup.number().required("Campo obrigatório").min(0, "Peso inválido"),
    percentualGordura: Yup.number().required("Campo obrigatório").min(0, "Percentual inválido").max(100, "Percentual deve ser até 100%"),
    imc: Yup.number().required("Campo obrigatório").min(0, "IMC inválido"),
    circunferenciaAbdominal: Yup.number().required("Campo obrigatório").min(0, "Circunferência inválida"),
    resultadosObservacoes: Yup.string()
  });

  return (
    <Pagina titulo={"Cadastro de Avaliação"}>
      <Formik
        initialValues={avaliacaoEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="p-3">
            <Card className="mb-3">
              <Card.Header as="h4" className="text-center">Dados da Avaliação</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Nome do Aluno:</Form.Label>
                    <Form.Control
                      as="select"
                      name="nomeAluno"
                      value={values.nomeAluno}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nomeAluno && !errors.nomeAluno}
                      isInvalid={touched.nomeAluno && errors.nomeAluno}
                    >
                      <option value="">Selecione um aluno</option>
                      {alunos.map((aluno) => (
                        <option key={aluno.id} value={aluno.nome}>{aluno.nome}</option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.nomeAluno}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Data da Avaliação:</Form.Label>
                    <Form.Control
                      name="dataAvaliacao"
                      type="date"
                      value={values.dataAvaliacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataAvaliacao && !errors.dataAvaliacao}
                      isInvalid={touched.dataAvaliacao && errors.dataAvaliacao}
                    />
                    <Form.Control.Feedback type="invalid">{errors.dataAvaliacao}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Altura (m):</Form.Label>
                    <Form.Control
                      name="altura"
                      type="number"
                      step="0.01"
                      value={values.altura}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.altura && !errors.altura}
                      isInvalid={touched.altura && errors.altura}
                    />
                    <Form.Control.Feedback type="invalid">{errors.altura}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Peso (kg):</Form.Label>
                    <Form.Control
                      name="peso"
                      type="number"
                      step="0.1"
                      value={values.peso}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.peso && !errors.peso}
                      isInvalid={touched.peso && errors.peso}
                    />
                    <Form.Control.Feedback type="invalid">{errors.peso}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Percentual de Gordura (%):</Form.Label>
                    <Form.Control
                      name="percentualGordura"
                      type="number"
                      step="0.1"
                      value={values.percentualGordura}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.percentualGordura && !errors.percentualGordura}
                      isInvalid={touched.percentualGordura && errors.percentualGordura}
                    />
                    <Form.Control.Feedback type="invalid">{errors.percentualGordura}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>IMC:</Form.Label>
                    <Form.Control
                      name="imc"
                      type="number"
                      step="0.1"
                      value={values.imc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.imc && !errors.imc}
                      isInvalid={touched.imc && errors.imc}
                    />
                    <Form.Control.Feedback type="invalid">{errors.imc}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Circunferência Abdominal (cm):</Form.Label>
                    <Form.Control
                      name="circunferenciaAbdominal"
                      type="number"
                      value={values.circunferenciaAbdominal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.circunferenciaAbdominal && !errors.circunferenciaAbdominal}
                      isInvalid={touched.circunferenciaAbdominal && errors.circunferenciaAbdominal}
                    />
                    <Form.Control.Feedback type="invalid">{errors.circunferenciaAbdominal}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Resultados e Observações:</Form.Label>
                  <Form.Control
                    name="resultadosObservacoes"
                    as="textarea"
                    rows={3}
                    value={values.resultadosObservacoes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.resultadosObservacoes && !errors.resultadosObservacoes}
                    isInvalid={touched.resultadosObservacoes && errors.resultadosObservacoes}
                  />
                  <Form.Control.Feedback type="invalid">{errors.resultadosObservacoes}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="text-end">
                  <Button className="me-2" variant="secondary" onClick={() => router.push('/avaliacoes')}>
                    <FaArrowLeft className="me-1" /> Voltar
                  </Button>
                  <Button className="me-2" variant="danger" type="reset">
                    <FaTrash className="me-1" /> Limpar
                  </Button>
                  <Button variant="primary" type="submit">
                    <FaCheck className="me-1" /> Salvar
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
