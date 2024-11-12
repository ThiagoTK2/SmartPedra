'use client' // Define que o código será executado no lado do cliente, ou seja, no navegador.

import Pagina from '@/components/Pagina'; // Importa o componente "Pagina" para estruturar a página.
import { useRouter } from 'next/navigation'; // Importa a função "useRouter" para navegação programática entre páginas.
import { useEffect, useState } from 'react'; // Importa hooks do React para gerenciar efeitos colaterais e estados.
import { Button, Col, Form, Row, Card } from 'react-bootstrap'; // Importa componentes de interface do React Bootstrap.
import { FaArrowLeft, FaCheck } from "react-icons/fa"; // Importa ícones de "font-awesome" para uso nos botões.
import { v4 as uuidv4 } from 'uuid'; // Importa função para gerar identificadores únicos.
import { useSearchParams } from 'next/navigation'; // Importa função para acessar parâmetros de busca da URL.
import { useForm } from "react-hook-form"; // Importa biblioteca para manipular formulários com validação.
import InputMask from "react-input-mask"; // Importa componente para aplicar máscaras de entrada.

export default function CadastroProfessorPage() { // Função principal do componente "CadastroProfessorPage".
    const router = useRouter(); // Hook para navegar entre páginas.
    const searchParams = useSearchParams(); // Hook para obter parâmetros de busca na URL.
    const id = searchParams.get('id'); // Pega o parâmetro "id" da URL.

    // Inicializa o hook do formulário com valores padrão e configurações de validação
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

    // useEffect executa quando o componente é montado ou quando "id" muda
    useEffect(() => {
        const storedProfessores = JSON.parse(localStorage.getItem('professores')) || []; // Obtém lista de professores do localStorage.
        if (id) { // Se o "id" existe, indica uma edição de cadastro.
          const professor = storedProfessores.find(item => item.id === id); // Busca o professor correspondente ao id.
          if (professor) {
            reset(professor); // Preenche o formulário com os dados do professor encontrado.
          }
        }
    }, [id, reset]); // Dependências do efeito, ativado quando o "id" ou "reset" mudam.

    // Função para salvar os dados do professor no localStorage
    const salvar = (dados) => {
        const storedProfessores = JSON.parse(localStorage.getItem('professores')) || []; // Carrega os professores existentes.
        const novaLista = id
          ? storedProfessores.map(p => p.id === id ? { ...dados, id } : p) // Atualiza o professor existente.
          : [...storedProfessores, { ...dados, id: uuidv4() }]; // Adiciona um novo professor com ID único.

        localStorage.setItem('professores', JSON.stringify(novaLista)); // Salva a lista atualizada no localStorage.
        alert("Professor cadastrado com sucesso!"); // Mensagem de sucesso para o usuário.
        router.push("/professores"); // Redireciona para a página de professores.
    };

    // Retorno do JSX com o formulário de cadastro
    return (
        <Pagina titulo="Cadastro de Professor"> {/* Renderiza o componente "Pagina" com o título "Cadastro de Professor". */}
            <Form onSubmit={handleSubmit(salvar)} className="p-3"> {/* Define o formulário com função de submit e margens */}
                <Card className="mb-3"> {/* Cartão de dados pessoais do professor */}
                    <Card.Header as="h4" className="text-center">Dados Pessoais</Card.Header>
                    <Card.Body>
                        <Row className='mb-3'> {/* Linha de campos do formulário */}
                            <Form.Group as={Col} md={6}> {/* Grupo de campo para Nome Completo */}
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control
                                    {...register("nomeCompleto", { required: "Campo obrigatório" })} // Registro com validação obrigatória
                                    type="text"
                                    isInvalid={errors.nomeCompleto} // Exibe erro se "nomeCompleto" for inválido
                                />
                                <Form.Control.Feedback type='invalid'>{errors.nomeCompleto?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6}> {/* Grupo de campo para Telefone */}
                                <Form.Label>Telefone:</Form.Label>
                                <InputMask 
                                    mask="(99) 99999-9999" // Aplica a máscara para telefone
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
                                <Form.Control.Feedback type="invalid">{errors.telefone?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Mais campos de formulário com máscaras e validações */}
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
                                <Form.Control.Feedback type="invalid">{errors.cpf?.message}</Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">{errors.rg?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Campos de Data de Nascimento e Email */}
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

                        {/* Campos de Especialização e Registro Profissional */}
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

                        {/* Botões de Voltar e Salvar */}
                        <Form.Group className='text-end'>
                            <Button className='me-2' variant='secondary' onClick={() => router.push('/professores')}>
                                <FaArrowLeft className='me-1' /> Voltar {/* Botão para voltar */}
                            </Button>
                            <Button variant='primary' type="submit">
                                <FaCheck className='me-1' /> Salvar {/* Botão para salvar */}
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Form>
        </Pagina>
    );
}
