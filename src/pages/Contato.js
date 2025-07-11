import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import "./Contato.css";
import "../components/quadradoAzul.css";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    assunto: "",
    mensagem: ""
  });

  // Pode usar async/await para clareza e controle de erros
  async function handleSubmit(e) {
    e.preventDefault();

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    const templateParams = {
      from_name: `${formData.nome} ${formData.sobrenome}`.trim(),
      from_email: formData.email,
      subject: formData.assunto || "Contato pelo site",
      message: formData.mensagem
    };

    try {
      console.log({ serviceID, templateID, userID });
      await emailjs.send(serviceID, templateID, templateParams, userID);
      alert('Email enviado com sucesso!');
      setFormData({ nome:"", sobrenome:"", email:"", assunto:"", mensagem:"" });
    } catch (err) {
      alert('Erro ao enviar email, tente novamente.');
      console.error(err);
    }
  }

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className="main-container contato-container">
      <div className="contato-header">
        <div className="quadrado-azul"></div>
        <h2>Contato</h2>
      </div>

      <div className="contato-box">
        <form className="formulario-contato" onSubmit={handleSubmit}>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            name="sobrenome"
            type="text"
            placeholder="Sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="assunto"
            type="text"
            placeholder="Assunto"
            value={formData.assunto}
            onChange={handleChange}
          />
          <textarea
            name="mensagem"
            placeholder="Mensagem"
            rows={5}
            value={formData.mensagem}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
