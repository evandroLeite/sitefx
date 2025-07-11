import '../pages/Login.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  user: yup.string().required('Digite seu usuário'),
  pass: yup.string()
    .required('Digite sua senha')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Deve conter uma letra maiúscula')
    .matches(/[0-9]/, 'Deve conter um número')
    .matches(/[^a-zA-Z0-9]/, 'Deve conter caractere especial'),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });

  function handleLogin(data) {
    const { user, pass } = data;
    if (user === 'evandro' && pass === 'Senha@123') {
      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos');
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-title">Acessar sua conta</div>

        <input
          type="text"
          className={`login-input ${errors.user ? 'error' : ''}`}
          placeholder={errors.user ? errors.user.message : 'Usuário'}
          {...register('user')}
        />

        <input
          type="password"
          className={`login-input ${errors.pass ? 'error' : ''}`}
          placeholder={errors.pass ? errors.pass.message : 'Senha'}
          {...register('pass')}
        />

        <button className="login-button" onClick={handleSubmit(handleLogin)}>Entrar</button>

        <div className="login-footer">
          Esqueceu a senha? <a href="/">Recuperar</a>
        </div>
      </div>
    </div>
  );
}


