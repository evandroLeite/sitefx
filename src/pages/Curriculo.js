import "./Curriculo.css";
import { FaReact, FaCss3Alt, FaJs, FaPhp, FaPython, FaDatabase, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiLaravel, SiFlask, SiMysql, SiSqlite } from 'react-icons/si';

export default function Curriculo() {
  return (
    <div className="curriculo-container">
      <div className="curriculo-header">
        <div className="titulo-com-quadrado">
        <div className="quadrado-azul"></div>
        <h1 className="projetos-titulo">Curriculo</h1>
      </div>
        <p>Resumo da minha formação, experiências e habilidades técnicas.</p>
      </div>

      <div className="secao">
        <h2>Formação Acadêmica</h2>
        <div className="item">
          <h3>Engenharia Civil – Universidade Unifor</h3>
          <span>Concluído até o 7° período</span>
          <p>Formação em engenharia estrutural, com base sólida em lógica, matemática e resolução de problemas complexos.</p>
        </div>
        <div className="item">
          <h3>Curso Full Stack – DigitalCollage</h3>
          <span>2023 – 2024</span>
          <p>React, HTML, CSS, JavaScript, Node, PHP, Laravel, Python, Banco de dados e boas práticas modernas de desenvolvimento.</p>
        </div>
        <div className="item">
          <h3>Curso ADS - Analise e desenvolvimento de sistemas -  Cruzeiro do Sul.(EAD)</h3>
          <span>2023.2 – 2026.2</span>
          <p>Formação voltada para o desenvolvimento de sistemas, com foco em programação, bancos de dados, engenharia de software, redes e segurança da informação. O curso também abrange metodologias ágeis e práticas de desenvolvimento web e mobile, preparando profissionais para atuar em diferentes áreas da tecnologia da informação.</p>
        </div>
      </div>

      <div className="secao">
        <h2>Experiência</h2>
        <div className="item">
          <h3>Projetos Pessoais</h3>
          <span>2022 – Atualmente</span>
          <p>Desenvolvimento de aplicações web completas com autenticação, formulários validados, consumo de APIs e responsividade. Como podem ver no meu site pessoal.</p>
        </div>
        <div className="item">
          <h3>FitBank - Fortaleza CE</h3>
          <span>Desenvolvedor jr. 2022 - 2023</span>
          <p>Como desenvolvedor júnior, eu atuo tanto no front-end quanto no back-end. No front, sou responsável por desenvolver interfaces responsivas e intuitivas utilizando HTML, CSS, JavaScript e frameworks como React. Procuro sempre manter um bom padrão visual e foco na experiência do usuário.
          Já no back-end, participo na construção e manutenção de APIs, manipulação de banco de dados e integrações, utilizando linguagens como JavaScript (Node.js) ou C# .net, por exemplo. Também já tive contato com rotinas de autenticação, tratamento de erros e organização de rotas.
          Além disso, estou sempre aberto a aprender com a equipe sênior, cumprir boas práticas e contribuir de forma proativa com o que for necessário no time.
          </p>
        </div>  
        <div className="item">
          <h3>FitBank - Fortaleza CE</h3>
          <span>DevOps 2023 - 2024</span>
          <p>Atuei como DevOps, sendo responsável pelo processo de deploy contínuo das aplicações utilizando pipelines CI/CD. Realizava o monitoramento de logs, identificando e solucionando falhas em produção, além de manter a infraestrutura de servidores atualizada e estável, garantindo entregas ágeis e seguras em ambientes de desenvolvimento e produção.
          </p>
        </div>
        <div className="item">
          <h3>Haws - Fortaleza CE</h3>
          <span>Desenvolvimento Front-end - 2024.</span>
          <p>Atuava com desenvolvimento front-end utilizando React, principalmente em projetos para terceiros. Participei da criação de portais institucionais simples, desenvolvidos sob demanda para clientes como clínicas, designers, arquitetos e pequenos negócios.Minha responsabilidade era estruturar a interface, aplicar boas práticas de responsividade e garantir que a navegação fosse fluida e intuitiva para o usuário. Além disso, tive contato direto com ajustes visuais e integrações básicas com o back-end quando necessário, sempre seguindo o layout proposto pelo cliente ou designer responsável.</p>
        </div>
      </div>
      

      <div className="secao">
        <h2>Habilidades Técnicas</h2>
          <ul className="skills-list">
            <li><FaReact /> React</li>
            <li><FaCss3Alt /> CSS moderno</li>
            <li><FaJs /> JavaScript</li>
            <li><FaPhp /> PHP <SiLaravel style={{ marginLeft: '5px' }} /></li>
            <li><FaPython /> Python <SiFlask style={{ marginLeft: '5px' }} /></li>
            <li><FaDatabase /> <SiMysql /> / <SiSqlite style={{ marginLeft: '5px' }} /></li>
            <li><FaGitAlt /> / <FaGithub style={{ marginLeft: '5px' }} /></li>
          </ul>
    </div>
    </div>
  );
}
