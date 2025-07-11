import './Projetos.css'; 
import "../components/quadradoAzul.css";
import { SiPython, SiReact, SiPhp, SiLaravel } from "react-icons/si";

export default function Projetos() {
  const projetos = [
    { id: 1, titulo: "Plataforma de E-commerce", link: "/eCommerce", descricao: "Venda online fácil e rápida", tecno: <>Feito com <SiReact color="#0088A9" size={18} className='react-icon-animated'/></> },
    { id: 2, titulo: "Sistema de Gestão Escolar", link: "/sistemaEscolar", descricao: "Organize tarefas da escola", breve: "Em construção.", tecno: <>Feito com <SiPhp color="#777BB4" size={24} className='php-icon-animated' /> e <SiLaravel color="#FF2D20" size={18} className='laravel-icon-animated' /></>},
    { id: 3, titulo: "Dashboard Financeiro", link: "/dashboard", descricao: "Visualize suas finanças", tecno: <>Feito com <SiPython color="#306998" size={18}/></>},
    { id: 4, titulo: "Rede Social Profissional", link: "#", descricao: "Conecte-se com profissionais .", breve: "Em construção." },
    { id: 5, titulo: "Blog com CMS", link: "#", descricao: "Crie e gerencie conteúdos .", breve: "Em construção." },
    { id: 6, titulo: "App de Tarefas", link: "#", descricao: "Gerencie suas atividades diárias .", breve: "Em construção." },
  ];

  return (
    <div className="projetos-container">
      <div className="titulo-com-quadrado">
        <div className="quadrado-azul"></div>
        <h1 className="projetos-titulo">Projetos (em construção)</h1>
      </div>

      <div className="projetos-grid">
        {projetos.map((projeto) => (
          <a key={projeto.id} href={projeto.link} className="projeto-card">
            <h2>{projeto.titulo}</h2>
            <p>{projeto.descricao}</p>
            <p>{projeto.tecno}</p>
            <p className='breve'>{projeto.breve}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
