import axios from 'axios'

// configuracao da instancia central do Axios para comunicacao com a API
export const api = axios.create({
    
    baseURL: 'http://localhost:3000',

})

    {/* Interceptor de requisicao
        Este bloco age como um 'pedagio' antes de cada chamada sair para o servidor */}
    api.interceptors.request.use((config) => {

        // recupera o token persistido no navegador
        const token = localStorage.getItem('token');

        //se houver um token, ele e injetado no cabecalho Authorization seguindo o padrao Bearer
        config.headers['Authorization'] = token ? `Bearer ${token}` : '';
        return config;

    },
        (error) => Promise.reject(error)
    );
    
    {/* Interceptor de resposta  
        Este bloco monitora o retorno do servidor para capturar erros de autenticacao globalmente */}
    api.interceptors.response.use(
        (response) => response, // retorna a resposta normalmente se nao houver erro
        (error) => {

            // verifica se o erro e 401 (Unauthorized), indicando que o token expirou ou e invalido
            if(error.response && error.response.status === 401){

                //limpa o token invalido do armazenamento para resetar o estado de login
                localStorage.removeItem('token');

                //redireciona o usuario para a tela de login para que ele possa autenticar novamente
                window.location.href = '/';
            }
            return Promise.reject(error);
        }
    )
