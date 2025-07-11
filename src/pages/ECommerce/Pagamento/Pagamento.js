import React, { useState, useEffect, useCallback } from 'react';
import './Pagamento.css';
import { QRCodeCanvas } from 'qrcode.react';
import { FaThumbsUp } from 'react-icons/fa';


export default function Pagamento() {
  const [abaAtiva, setAbaAtiva] = useState('cartao');
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [valorPix, setValorPix] = useState('10.00');
  const [payloadPix, setPayloadPix] = useState('');

  const [nomeTitular, setNomeTitular] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const calcularCRC16 = useCallback((payload) => {
    const polinomio = 0x1021;
    let crc = 0xffff;

    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ polinomio : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }, []);

  const field = useCallback((id, value) => {
    const length = value.length.toString().padStart(2, '0');
    return id + length + value;
  }, []);

  const montarPayloadPix = useCallback(({ key, name, city, amount, txid }) => {
    const gui = field('00', 'BR.GOV.BCB.PIX');
    const chave = field('01', key);
    const merchantAccountInfo = field('26', gui + chave);
    const merchantCategoryCode = field('52', '0000');
    const currency = field('53', '986');
    const amountField = amount && amount !== '0.00' ? field('54', amount) : '';
    const countryCode = field('58', 'BR');
    const merchantName = field('59', name.toUpperCase().substring(0, 25));
    const merchantCity = field('60', city.toUpperCase().substring(0, 15));
    const txidField = field('62', field('05', txid));

    const payloadSemCRC =
      '000201' +
      merchantAccountInfo +
      merchantCategoryCode +
      currency +
      amountField +
      countryCode +
      merchantName +
      merchantCity +
      txidField +
      '6304';

    const crc = calcularCRC16(payloadSemCRC);
    return payloadSemCRC + crc;
  }, [calcularCRC16, field]);

  useEffect(() => {
    const valorNumerico = parseFloat(valorPix.replace(',', '.')) || 0;
    const valorFormatado = valorNumerico.toFixed(2);

    const payload = montarPayloadPix({
      key: '6143518a-bc42-49fb-87dd-dd4216cb304c',
      name: 'EVANDROLEITE',
      city: 'FORTALEZA',
      amount: valorFormatado,
      txid: 'ID123',
    });

    setPayloadPix(payload);
  }, [valorPix, montarPayloadPix]);

  const handleConfirmarPagamento = () => setMostrarAviso(true);
  const fecharAviso = () => setMostrarAviso(false);

  return (
    <>
      <div className="pagamento-container">
        <h1 className="pagamento-titulo">Pagamento</h1>

        <div className="abas">
          <button className={abaAtiva === 'cartao' ? 'aba ativa' : 'aba'} onClick={() => setAbaAtiva('cartao')}>Cartão Crédito</button>
          <button className={abaAtiva === 'transferencia' ? 'aba ativa' : 'aba'} onClick={() => setAbaAtiva('transferencia')}>Transferência</button>
          <button className={abaAtiva === 'outras' ? 'aba ativa' : 'aba'} onClick={() => setAbaAtiva('outras')}>Outras Opções</button>
        </div>

        <div className="conteudo-aba">
          {abaAtiva === 'cartao' && (
            <form className="conteudo-cartao">
              <label htmlFor="nomeTitular">Nome do Titular</label>
              <input id="nomeTitular" type="text" placeholder="Nome como no cartão" value={nomeTitular} onChange={(e) => setNomeTitular(e.target.value)} />

              <label htmlFor="numeroCartao">Número do Cartão</label>
              <input id="numeroCartao" type="text" maxLength="19" placeholder="0000 0000 0000 0000" value={numeroCartao} onChange={(e) => setNumeroCartao(e.target.value)} />

              <label htmlFor="validade">Validade</label>
              <input id="validade" type="text" maxLength="5" placeholder="MM/AA" value={validade} onChange={(e) => setValidade(e.target.value)} />

              <label htmlFor="cvv">CVV</label>
              <input id="cvv" type="password" maxLength="4" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </form>
          )}

          {abaAtiva === 'transferencia' && (
            <div>
              <p>Informe os dados para transferência bancária.</p>
            </div>
          )}

          {abaAtiva === 'outras' && (
            <div className="opcoes-outras" style={{ display: 'flex', gap: '30px' }}>
              <div className="opcoes-lista" style={{ flex: 1 }}>
                <h3>Outras opções de pagamento</h3>
                <ul>
                  <li>Boleto bancário</li>
                  <li>Pix</li>
                  <li>PayPal</li>
                  <li>Google Pay / Apple Pay</li>
                </ul>

                <label htmlFor="valorPix" style={{ marginTop: '20px', fontWeight: 'bold', color: '#004b5e' }}>
                  Valor do Pix (R$):
                </label>
                <input
                  id="valorPix"
                  type="text"
                  placeholder="Digite o valor"
                  value={valorPix}
                  onChange={(e) => setValorPix(e.target.value)}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', width: '100px' }}
                />
              </div>

              <div className="opcoes-qr" style={{ textAlign: 'center' }}>
                <QRCodeCanvas value={payloadPix} size={150} />
                <p className="qr-texto" style={{ marginTop: '12px' }}>
                  COLABORE COM O DESENVOLVEDOR.
                  <FaThumbsUp style={{ marginLeft: '8px', color: '#004b5e' }} />
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="botao-confirmar">
          <button className="pagamento-button" onClick={handleConfirmarPagamento}>
            Confirmar Pagamento
          </button>
        </div>

        {mostrarAviso && (
          <div className="overlay-aviso" onClick={fecharAviso}>
            <div className="mensagem-aviso">
              Esse processo é meramente demonstrativo, para algo real entre em contato com o Desenvolvedor.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
