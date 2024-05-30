// curandera_frontend/src/pages/Contact.js
import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando consulta:', { name, email, message });
    // Aquí se puede enviar la consulta a una API
  };

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contact;
