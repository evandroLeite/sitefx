import "./SobreMim.css";
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SobreMim({ fotoPerfil }) {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="card-central">
        <img src={fotoPerfil} alt="Evandro Leite" className="foto-perfil" />

        <h1 className="nome">Evandro Leite</h1>
        <p className="cargo">Desenvolvedor Full Stack</p>

        <div className="social-icons-central">
          <a href="https://www.linkedin.com/in/evandrolvneto/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://www.instagram.com/evandrolvn/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://github.com/evandroLeite/" target="_blank" rel="noreferrer"><FaGithub /></a>
        </div>

        <div className="resumo-glass">
          <p>
            Desenvolvedor Full Stack em constante aprendizado, com foco em React, CSS moderno e aplicações com boa experiência de usuário. Tenho projetos práticos com autenticação, formulários validados e navegação inteligente, além de conhecimento em PHP, Laravel, Python e análise de dados com Pandas.
          </p>
          <p>
            Migrei da Engenharia Civil para a Tecnologia buscando inovação, criatividade e propósito. Hoje, aplico minha lógica e visão estrutural no desenvolvimento de soluções digitais.
          </p>
        </div>

        <div className="botoes-acoes">
          <button onClick={() => navigate('/curriculo')}>CURRÍCULO</button>
          <button onClick={() => navigate('/projetos')}>PROJETOS</button>
        </div>
      </div>
    </div>
  );
}
