import React, { useState } from 'react';

function formatRG(value) {
  // Remove qualquer caractere que não seja número
  value = value.replace(/\D/g, '');

  // Aplica a máscara X.XXX.XXX
  value = value.replace(/(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3');

  return value;
}

// Função de validação do RG (opcional, caso queira validar tamanho e formato)
function validateRG(rg) {
  // Remove caracteres não numéricos
  rg = rg.replace(/\D/g, '');
  
  // Valida se o RG tem exatamente 7 dígitos
  return rg.length === 7;
}

export default function RGInput() {
  const [rg, setRg] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleRGChange = (e) => {
    const formattedRG = formatRG(e.target.value);
    setRg(formattedRG);
    setIsValid(validateRG(formattedRG));
  };

  return (
    <div>
      <label htmlFor="rg">RG:</label>
      <input
        type="text"
        id="rg"
        value={rg}
        onChange={handleRGChange}
        maxLength="9"
        style={{ backgroundColor: 'white', color: 'black' }} // Garantindo o fundo branco
        className="form-control" // Classe padrão do Bootstrap
    />
      {!isValid && <p style={{ color: 'red' }}>RG inválido</p>}
    </div>
  );
}
