import React, { useState } from 'react';

function formatCPF(value) {
  // Remove qualquer caractere que não seja número
  value = value.replace(/\D/g, '');

  // Aplica a máscara xxx.xxx.xxx-xx
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');

  return value;
}

// Função de validação de CPF
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.charAt(10));
}

export default function CPFInput() {
  const [cpf, setCpf] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleCPFChange = (e) => {
    const formattedCPF = formatCPF(e.target.value);
    setCpf(formattedCPF);
    setIsValid(validateCPF(formattedCPF));
  };

  return (
    <div>
      <label htmlFor="cpf">CPF:</label>
      <input
        type="text"
        id="cpf"
        value={cpf}
        onChange={handleCPFChange}
        maxLength="14"
        style={{ backgroundColor: 'white', color: 'black' }} // Garantindo o fundo branco
        className="form-control" // Classe padrão do Bootstrap
    />

      {!isValid && <p style={{ color: 'red' }}>CPF inválido</p>}
    </div>
  );
}
