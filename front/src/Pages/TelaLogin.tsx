import React, { useState } from "react";
import { api } from "../Services/api";
import "../Styles/LoginStyles.css"
import { useNavigate } from "react-router-dom";

{/* Componente de autenticacao
    Responsavel por capturar as credenciais, validar com o backend e gerenciar o acesso inicial */}
function TelaLogin() {

    const navigate = useNavigate();

    //estados locais para o controle dos inputs (Controlled Components)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Gerencia o envio do formulario de login
    // Realiza a chamada para a rota de autenticacao e persiste o token JWT
    async function Login(l:React.FormEvent<HTMLFormElement>) {
        l.preventDefault()
        const dados = {email, password}
        
        try{
            
            //Envia requisicao POST para a rota de login da API
            const response = await api.post('/auth/login', dados);

            //armazena o token de acesso jwt retornado pelo backend
            const token = response.data.access_token;

            if(token){

                //armazena o token no localStorage para persistencia da sessao
                localStorage.setItem('token', token);

                // redireciona o usuario para a tela protegida de usuarios apos o sucesso
                navigate('/user');
            }
        }catch(error){

            //tratamento de erro basico para falhas de autenticacao ou conexao
            alert('falha no login! verifique seus dados')
        }
}
    

return (
    <>
        <div className="login-page">
            <main className="container">

                {/* o envento onSubmit centraliza a logica de envio no formulario */}
                <form onSubmit={Login}> 
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                            type="email" 
                            placeholder="Email"  
                            value={email} 

                            // atualiza o estado conforme o usuario digita
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Senha"  
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                        {/* botao do tipo submit que dispara a funcao login */}
                        <button type="submit">Entrar</button>
                </form>

            </main>
        </div>
    </>
    );

}

export default TelaLogin;