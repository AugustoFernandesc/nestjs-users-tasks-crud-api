import { useEffect, useState } from "react";
import { api } from "../Services/api";
import ModalTask from "../Global/ModalTask";
import { FaList } from 'react-icons/fa';
import '../Styles/TaskStyles.css';
import { HiPencil } from "react-icons/hi";
import del from '../Assets/delete.png'
import Swal from "sweetalert2";

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
    const [busca, setBusca] = useState("");

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
        const dados = { title, description, completed};
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
      
      const result = await Swal.fire({
          title: "Tem Certeza?",
          icon: 'warning',
          iconColor: "red",
          confirmButtonText: "Sim, deletar!",
          confirmButtonColor: "#46d66a",
          showCancelButton: true,
          cancelButtonColor: "#181a18",
          reverseButtons: true,
          customClass:{title: 'h2-user-task'}
          })
          
        if(result.isConfirmed){
          await api.delete(`/tasks/${id}`);
          getTask();
          Swal.fire({ 
            title: "Deletado!", 
            icon: "success", 
            iconColor: "#46d66a", 
            confirmButtonColor: "#46d66a", 
            customClass:{title: "h2-user-task"}
          });
        }else{
          Swal.fire({
            title: "Operacao Cancelada",
            icon: "error",
            iconColor: "#ff0707",
            confirmButtonColor: "#46d66a",
            customClass:{title: 'h2-user-task'}
          })
          
        }
    }

      async function buscarTarefa(b:React.FormEvent<HTMLFormElement>) {
        b.preventDefault()
        const res = await api.get(`/tasks/search?title=${busca}`);
        setTasks(res.data);
      }

      function LimparBusca(){
        setBusca("");
      }

    return (
        <>
            <h2 className='title-tasks'>Tarefas <FaList /></h2>
            <div className="header-tasks">

                <form className="search-container-tasks" onSubmit={buscarTarefa}>
                    <input 
                        className="input-search-tasks"
                        type="search" 
                        placeholder="Pesquisar tarefa..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <button className="button-search-tasks" onClick={LimparBusca}>Limpar</button>
                    <button className="button-search-tasks" type="submit">Buscar</button>
                </form>

                <button className="button-add-tasks" onClick={openModal}>Adicionar</button>
            </div>

            <ModalTask
                isOpen={modalIsOpen}
                closeModal={closeModal}
                save={save}
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                id={id}
            />

            <div className='div-tasks'>
                <table className='table-tasks'>
                    <thead>
                        <tr className='linha-tabela-tasks'>
                            <th className='cabecalho-tabela-tasks'>Título</th>
                            <th className='cabecalho-tabela-tasks'>Descrição</th>
                            <th className="cabecalho-tabela-tasks">Situação</th>
                            <th className='cabecalho-tabela-tasks'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(t => (
                            <tr className='linha-tabela-tasks' key={t.id}>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td>{t.completed ? "Realizada" : " A Realizar"}</td>
                                <td className='acoes-tasks'>
                                    <button className='editar-tasks' onClick={() => edition(t)}><HiPencil/></button>
                                    <button className='excluir-tasks' onClick={() => deletar(t.id)}><img src={del} alt="excluir" /></button>
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