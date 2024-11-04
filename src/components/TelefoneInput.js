import React, { useState } from 'react';

function formatPhone(value) {
  // Remove qualquer caractere que não seja número
  value = value.replace(/\D/g, '');

  // Aplica a máscara (XX) XXXXX-XXXX
  value = value.replace(/^(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');

  return value;
}

export default function TelefoneInput() {
  const [telefone, setTelefone] = useState('');

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhone(e.target.value);
    setTelefone(formattedPhone);
  };

  return (
    <div>
      <label htmlFor="telefone">Telefone:</label>
      <input
        type="text"
        id="telefone"
        value={telefone}
        onChange={handlePhoneChange}
        maxLength="15" // Limita o tamanho do input para (XX) XXXXX-XXXX
        style={{ backgroundColor: 'white', color: 'black' }}
        className="form-control"
        placeholder="(00) 00000-0000"
      />
    </div>
  );
}
