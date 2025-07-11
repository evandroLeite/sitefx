import "./SistemaEscolar.css";
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8000/api';

const abas = [
  { id: 'professors', titulo: 'Professores', colunas: ['nome', 'email', 'telefone', 'disciplina', 'ativo'] },
  { id: 'turmas', titulo: 'Turmas', colunas: ['nome','codigo','tunro'] },
  { id: 'disciplinas', titulo: 'Disciplinas', colunas: ['nome','codigo','tunro'] }, 
  { id: 'alunos', titulo: 'Alunos', colunas: ['nome', 'data_nascimento', 'serie'] },
  { id: 'notas', titulo: 'Notas', colunas: ['aluno_id', 'disciplina_id', 'nota'] },
];

function Tabela({ titulo, colunas, dados, onAdd, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initForm = {};
    colunas.forEach(col => initForm[col] = '');
    setFormData(initForm);
    setShowForm(false);
  }, [titulo, colunas]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(old => ({ ...old, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(formData);
    setShowForm(false);
  }

  return (
    <div className="tabela-container">
      <h2>{titulo}</h2>
      <button onClick={() => setShowForm(old => !old)}>
        {showForm ? 'Cancelar' : 'Incluir'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          {colunas.map(col => (
            <div key={col}>
              <label>{col.charAt(0).toUpperCase() + col.slice(1)}:</label>
              <input
                type="text"
                name={col}
                value={formData[col]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Salvar</button>
        </form>
      )}

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            {colunas.map(col => (
              <th key={col}>{col}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan={colunas.length + 2} style={{ textAlign: 'center' }}>Nenhum dado encontrado</td>
            </tr>
          ) : (
            dados.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {colunas.map(col => (
                  <td key={col}>{item[col] !== undefined ? item[col].toString() : ''}</td>
                ))}
                <td>
                  <button className="excluir-btn" onClick={() => onDelete(item.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function SistemaEscolar() {
  const [dados, setDados] = useState({});
  const [abaAtiva, setAbaAtiva] = useState('professors');

  useEffect(() => {
    fetch(`${API_BASE}/${abaAtiva}`)
      .then(res => {
        if (!res.ok) throw new Error(`Erro na requisição de ${abaAtiva}`);
        return res.json();
      })
      .then(data => setDados(old => ({ ...old, [abaAtiva]: data })))
      .catch(() => setDados(old => ({ ...old, [abaAtiva]: [] })));
  }, [abaAtiva]);

  function handleAdd(abaId, novoRegistro) {
    fetch(`${API_BASE}/${abaId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoRegistro)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao adicionar');
        return res.json();
      })
      .then(dadosCriados => {
        setDados(old => ({
          ...old,
          [abaId]: [...(old[abaId] || []), dadosCriados]
        }));
      })
      .catch(err => {
        alert('Falha ao incluir: ' + err.message);
      });
  }

  function handleDelete(abaId, id) {
    if (!window.confirm('Confirma exclusão?')) return;

    fetch(`${API_BASE}/${abaId}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao excluir');
        setDados(old => ({
          ...old,
          [abaId]: old[abaId].filter(item => item.id !== id)
        }));
      })
      .catch(err => alert('Falha ao excluir: ' + err.message));
  }

  const abaAtual = abas.find(a => a.id === abaAtiva);

  return (
    <div className="sistema-escolar-container">
      <div className="titulo-com-quadrado">
        <div className="quadrado-azul"></div>
        <h1>Sistema Escolar</h1>
    </div>
      <nav className="abas-nav">
        {abas.map(({ id, titulo }) => (
          <button
            key={id}
            className={`aba-button ${abaAtiva === id ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva(id)}
          >
            {titulo}
          </button>
        ))}
      </nav>

      <div className="tabela-wrapper">
        <Tabela
          titulo={abaAtual.titulo}
          colunas={abaAtual.colunas}
          dados={dados[abaAtiva] || []}
          onAdd={novo => handleAdd(abaAtiva, novo)}
          onDelete={id => handleDelete(abaAtiva, id)}
        />
      </div>
    </div>
  );
}
