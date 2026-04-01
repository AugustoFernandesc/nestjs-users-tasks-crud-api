import { useEffect, useState } from "react";
import { api } from "../Services/api";
import { FaTasks } from 'react-icons/fa';
import '../Styles/HomeStyles.css';

// interface que define a estrutura da Task vinda do backend
interface Task {
    id: number;
    title: string;
    description: string;
    user?: {
        name: string;
    };
}

{/*
    Componente Home, dashboard principal
    exibe um resumo das tarefas recentes vinculadas ao usuario autenticado
    requisito: consumo de rotas protegidas e identificacao de usuario relacionado
*/}
export default function Home() {

    //estado para armazenar a lista de tarefas do usuario
    const [tasks, setTasks] = useState<Task[]>([]);

    //busca as tarefas do usuario logado via API REST
    //requisito: o acesso dever ser autenticado via JWT no header de autorizacao
    async function getMyTasks() {
        try {

            //chamada get para a rota protegida / tasks ultilizando Axios
            const res = await api.get('/tasks');
            setTasks(res.data);

        } catch (error) {

            //tratamento de erro para falhas de conexao ou autenticacao expirada
            console.error("Erro ao carregar tarefas da Home:", error);
        }
    }

    // hook de ciclo de vida que dispara a busca de dados ao montar o componente
    useEffect(() => { getMyTasks() }, []);



    return (
        <div className="home-page-container">
            {/* Titulo da secao principal do Dashboard */}
            <h1 className='home-title'>Minhas Tarefas Recentes <FaTasks /></h1>
            <div className="tasks-grid-home">
                {/* Mapeamento das tarefas para exibicao em Cards (Dashboard Style) */}
                {tasks.length > 0 ? (
                    tasks.map(t => (
                        <div key={t.id} className="task-card-home">
                            <p><strong>Tarefa:</strong> {t.title}</p>
                            <p><strong>Descrição:</strong> {t.description}</p>
                            {/* Exibe o nome do usuario relacionado retornado pelo relacionamento do BD */}
                            <p><strong>Responsável:</strong> {t.user?.name || 'Eu'}</p>
                        </div>
                    ))
                ) : (
                    // feedback visual caso o usuario nao possua tarefas cadastradas
                    <div className="no-tasks-message">
                        <p>Você não possui tarefas vinculadas no momento</p>
                    </div>
                )}
            </div>
        </div>
    );
}