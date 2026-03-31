import { useEffect, useState } from "react";
import { api } from "../Services/api";
import { FaTasks } from 'react-icons/fa';
import '../Styles/HomeStyles.css'; 

interface Task {
    id: number;
    title: string;
    description: string;
    user?: {
        name: string;
    };
}

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    async function getMyTasks() {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error("Erro ao carregar tarefas da Home:", error);
        }
    }

    useEffect(() => {
        getMyTasks();
    }, []);

  

    return (
        <div className="home-page-container">
            <h1 className='home-title'>Minhas Tarefas Recentes <FaTasks /></h1>
            <div className="tasks-grid-home">
                {tasks.length > 0 ? (
                    tasks.map(t => (
                        <div key={t.id} className="task-card-home">
                            <p><strong>Tarefa:</strong> {t.title}</p>
                            <p><strong>Descrição:</strong> {t.description}</p>
                            <p><strong>Responsável:</strong> {t.user?.name || 'Eu'}</p> 
                        </div>
                    ))
                ) : (
                    <div className="no-tasks-message">
                        <p>Você não possui tarefas vinculadas no momento</p>
                    </div>
                )}
            </div>
        </div>
    );
}