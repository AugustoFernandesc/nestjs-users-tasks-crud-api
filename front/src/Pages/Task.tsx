import { useEffect, useState } from "react";
import { api } from "../Services/api";
import ModalTask from "../Global/ModalTask";
import { FaList } from 'react-icons/fa';
import '../Styles/UserStyles.css';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}


function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [id, setId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() { setIsOpen(true); }

    function closeModal() {
        setIsOpen(false);
        clear();
    }

    async function getTask() {
        const res = await api.get('/tasks');
        setTasks(res.data);
    }

    useEffect(() => {
        getTask();
    }, []);

    async function save(u: React.FormEvent<HTMLFormElement>) {
        u.preventDefault();
        const dados = { title, description, completed, userId: 1 };
        if (id) {
            await api.put(`/tasks/${id}`, dados);
        } else {
            await api.post('/tasks', dados);
        }
        closeModal();
        getTask();
    }

    function edition(e: Task) {
        setId(e.id);
        setTitle(e.title);
        setDescription(e.description);
        setCompleted(e.completed);
        openModal();
    }

    function clear() {
        setId(null);
        setTitle("");
        setDescription("");
        setCompleted(false);
    }

    async function deletar(id: number) {
        await api.delete(`/tasks/${id}`);
        getTask();
    }

    return (
        <>
            <div className="header-container">
                <h2 className='title-user'>Tarefas <FaList /></h2>
                <button className="button-add-user" onClick={openModal}>Adicionar</button>
            </div>

            <ModalTask
                isOpen={modalIsOpen}
                closeModal={closeModal}
                save={save}
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                id={id}
            />

            <div className='div-user'>
                <table className='table-user'>
                    <thead>
                        <tr className='linha-tabela'>
                            <th className='cabecalho-tabela'>Título</th>
                            <th className='cabecalho-tabela'>Descrição</th>
                            <th className='cabecalho-tabela'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(t => (
                            <tr className='linha-tabela' key={t.id}>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td className='acoes'>
                                    <button className='editar' onClick={() => edition(t)}>Editar</button>
                                    <button className='excluir' onClick={() => deletar(t.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskPage;