import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashBoard.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "../../components/quadradoAzul.css";
import "../../components/setaVoltar.css";


export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);  // Mantém controle de "carregando"
  const [error, setError] = useState(null);  // Mantém controle de erro
  
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:5000/api/horas-extras')
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta do servidor');
        return res.json();  
      })
      .then(data => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        
        
        const resumoHoras = meses.map((mes, i) => ({
          mes,
          horas: 0,
          valor: 0,
        }));

        data.forEach(item => {
          const idx = item.mes - 1; 
          const valorHoraExtra = ((item.salario / 22) / 8) * 1.5 * item.horas;

          resumoHoras[idx].horas += item.horas;
          resumoHoras[idx].valor += valorHoraExtra;
        });

        setDados(resumoHoras);  
        setLoading(false); 
      })
      .catch(err => {
      setError(
      err.message
    );
        setLoading(false);  
      });
  }, []);

 
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <div>Carregando dados...</div>
      </div>
    );
  }

  // Se houver erro, exibe a mensagem de erro
  if (error) {
  return (
    <div className="dashboard-container">
      <div className="voltar-projetos" onClick={() => navigate('/projetos')}>
        <FaArrowLeft style={{ marginRight: '8px' }} />
        Voltar para Projetos
      </div>
      <div className="error-message">
        <p><strong>Erro ao obter dados:</strong> {error}</p>
        <p>
          Este tipo de aplicação, que se comunica com backend Python, deve ser executada em um servidor real para funcionar corretamente.
        </p>
        <p>Quer saber mais ou precisar de ajuda?{' '}</p>
          <Link to="/contato" style={{ color: '#00d1d1', textDecoration: 'underline' }}>
            Entre em contato comigo!
          </Link>
      </div>
    </div>
  );
}


  return (
    <div className="dashboard-container">
      <div className="voltar-projetos" onClick={() => navigate('/projetos')}>
              <FaArrowLeft style={{ marginRight: '8px' }} />
                Voltar para Projetos
      </div>
      <p>{'>'}Aqui é uma simulação em python da quantidade e gastos com horas extras de uma empresa{'<'}</p>

      <div className="titulo">
        <div className="quadrado-azul" />
        <h1 className="dashboard-title">Horas Extras por Mês</h1>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="horas" fill="#82ca9d" name="Horas Extras" />
        </BarChart>
      </ResponsiveContainer>

      <div className="titulo">
        <div className="quadrado-azul" />
        <h1 className="dashboard-title">Valor Pago em Horas Extras por Mês</h1>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={value => `R$ ${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="valor" fill="#8884d8" name="Valor Pago" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
