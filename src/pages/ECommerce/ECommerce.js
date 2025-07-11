import React, { useState } from 'react';
import './ECommerce.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../components/setaVoltar.css';





const produtos = [
  { id: 1, nome: 'Camisa', preco: 49.90 },
  { id: 2, nome: 'Calça Jeans', preco: 89.90 },
  { id: 3, nome: 'Tênis', preco: 129.90 },
];

function ECommerce() {
  const [carrinho, setCarrinho] = useState([]);
  const navigate = useNavigate();

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const removerDoCarrinho = (index) => {
  const novoCarrinho = [...carrinho];
  novoCarrinho.splice(index, 1);
  setCarrinho(novoCarrinho);
};

  const handleCheckout = () => {
    if (carrinho.length > 0) {
      navigate('/pagamento');
    }
  };

  return (
    <div className="ecommerce-container">
      <div className="voltar-projetos" onClick={() => navigate('/projetos')}>
        <FaArrowLeft style={{ marginRight: '8px' }} />
          Voltar para Projetos
      </div>
      <div>{'>'} pequeno exemplo de loja virtual, o layout varia diante da demanda.{'<'} </div>
      <div className='titulo'>
            <div className="quadrado-azul" />
            <h1 className="ecommerce-title">Loja virtual</h1>
        </div>
      <div className="ecommerce-produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="ecommerce-produto-card">
            <h2>{produto.nome}</h2>
            <p>R$ {produto.preco.toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
      <div className="ecommerce-carrinho">
        <h2 className="carrinho-titulo">
          <FaShoppingCart className='icon-animado' style={{ marginRight: '8px' }} />
          Carrinho
        </h2>
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {carrinho.map((item, index) => (
            <li key={index} className="carrinho-item">
              <span>{item.nome} - R$ {item.preco.toFixed(2)}</span>
              <button className="remover-btn" onClick={() => removerDoCarrinho(index)}>
                Remover
              </button>
            </li>
            ))}
          </ul>
        )}
        <h3>Total: R$ {total.toFixed(2)}</h3>
        <div className="ecommerce-checkout">
          <button disabled={carrinho.length === 0} onClick={handleCheckout}>
            Finalizar Compra
          </button> 
        </div>
      </div>
    </div>
  );
}

export default ECommerce;
