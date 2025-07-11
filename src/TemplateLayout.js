    import { Routes, Route, Link } from "react-router-dom";
    import { useState } from "react";
    import { FaLaptop, FaMobileAlt, FaLinkedin, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa";

    import SobreMim from "./pages/SobreMim";
    import Curriculo from "./pages/Curriculo";
    import Projetos from "./pages/Projetos";
    import Contato from "./pages/Contato";
    import Dashboard from "./pages/DashBoardFinanceiro/DashBoard";
    import ECommerce from "./pages/ECommerce/ECommerce";
    import Pagamento from "./pages/ECommerce/Pagamento/Pagamento";
    import SistemaEscolar from "./pages/SistemaEscolar/SistemaEscolar";
    import fotoPerfil from "./assets/imgs/foto_perfil.jpg";
    import "./App.css";
    import "./components/quadradoAzul.css";

    export default function TemplateLayout() {
    const [mobileView, setMobileView] = useState(false);

    const handleLogoff = () => {
        if (window.confirm("Deseja realmente sair?")) {
        window.location.href = "/sitefx";
        }
    };

    return (
        <div className={`template-wrapper ${mobileView ? "smartphone-screen" : ""}`}>
        
        
        {/* Top Bar */}
        <div className="top-bar">
            <div className="top-bar-center">
            <button
                onClick={() => setMobileView(false)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                aria-label="Modo Desktop"
            >
                <FaLaptop size={28} />
            </button>
            <span className="separator">|</span>
            <button
                onClick={() => setMobileView(true)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                aria-label="Modo Smartphone"
            >
                <FaMobileAlt size={24} />
            </button>
            </div>

            <button
            onClick={handleLogoff}
            className="logout-button"
            >
            Sair
            </button>
        </div>

        {/* Header */}
        <div className="header">
            <div className="left-box">
            <div className="quadrado-azul"></div>
            <div className="info">
                <span className="topName">Evandro Leite</span> / Desenvolvedor
            </div>
            </div>
            <div className="menu">
            <Link to="/home">SOBRE MIM</Link>
            <Link to="/curriculo">CURRÍCULO</Link>
            <Link to="/projetos">PROJETOS</Link>
            <Link to="/contato">CONTATO</Link>
            </div>
        </div>

        {/*Pages*/} 
        <Routes>
            <Route path="/home" element={<SobreMim fotoPerfil={fotoPerfil} />} />
            <Route path="/curriculo" element={<Curriculo />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ecommerce" element={<ECommerce />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/sistemaEscolar" element={<SistemaEscolar />} />
        </Routes>

        {/* Footer */}
        <div className="footer">
            <div className="left-footer">
            <span>Política de Cookies</span>
            <span>Política de Privacidade</span>
            <span>© 2025 por Evandro Leite.</span>
            <span>Orgulhosamente criado com React</span>
            </div>
            <div className="right-footer">
            <div className="footer-section">
                <strong>Telefone</strong>
                <span>
                <a
                    href="https://wa.me/5584996684708?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho.%20Vim%20pelo%20seu%20site."
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-link"
                >
                    <FaWhatsapp size={16} style={{ marginRight: "5px" }} />
                </a>
                (84) 99668-4708
                </span>
            </div>
            <div className="footer-section">
                <strong>Email</strong>
                <span>evandro.leite.neto@gmail.com</span>
            </div>
            <div className="footer-section">
                <strong>Redes sociais</strong>
                <div className="social-row">
                <a href="https://www.linkedin.com/in/evandrolvneto/" target="_blank" rel="noreferrer">
                    <FaLinkedin size={24} />
                </a>
                <a href="https://www.instagram.com/evandrolvn/" target="_blank" rel="noreferrer">
                    <FaInstagram size={24} />
                </a>
                <a href="https://github.com/evandroLeite/" target="_blank" rel="noreferrer">
                    <FaGithub size={24} />
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
