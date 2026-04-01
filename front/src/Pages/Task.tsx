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

{/* 
    Componente de gestao de tarefas
    responsavel por listar, cadastrar, editar e remover tarefas
    requisito: a tarefa deve ser vinculada ao usuario autenticado
*/}
function TaskPage() {

    // estados para armazenamento da lista e controle de busca
    const [tasks, setTasks] = useState<Task[]>([]);
    const [busca, setBusca] = useState("");

    // estados locais para controle de inputs do Modal
    const [id, setId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    // funcoes para controle de abertura e fechamento do modal
    function openModal() { setIsOpen(true); }

    function closeModal() {
        setIsOpen(false);
        clear();
    }

    // busca lista de tarefas via API REST (rota protegida por JWT)
    async function getTask() {
        const res = await api.get('/tasks');
        setTasks(res.data);
    }

    // hook que dispara a busca de dados ao montar o componente
    useEffect(() => { getTask() }, []);


    //logica de persistencia: decide entre criar POST ou atualizar PUT
    //garante a atualizacao da lista e fechamento do modal apos o sucesso    
    async function save(u: React.FormEvent<HTMLFormElement>) {
        u.preventDefault();
        const dados = { title, description, completed };

        try {
            if (id) {
                //atualiza tarefa existente
                await api.put(`/tasks/${id}`, dados);
            } else {
                // cadastra nova tarefa vinculada ao usuario logado
                await api.post('/tasks', dados);
            }

            closeModal();
            getTask(); //atualiza a tabela automaticamente 
        }

        catch (error) {
            alert("Erro ao processar requisicao. Verifique os dados.")
        }
    }

    // prepara o modal com os dados da tarefa selecionada para edicao
    function edition(e: Task) {
        setId(e.id);
        setTitle(e.title);
        setDescription(e.description);
        setCompleted(e.completed);
        openModal();
    }

    //reseta os estados locais para limpar os campos do formulario
    function clear() {
        setId(null);
        setTitle("");
        setDescription("");
        setCompleted(false);
        setBusca("");
    }

    // remove a tarefa do sistema apos confirmacao visual
    // ultiliza o sweetAlert2 para melhor experiencia do usuario
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
            customClass: { title: 'h2-user-task' }
        })

        if (result.isConfirmed) {
            await api.delete(`/tasks/${id}`);
            getTask(); // recarrega a lista apos exclusao
            Swal.fire({
                title: "Deletado!",
                icon: "success",
                iconColor: "#46d66a",
                confirmButtonColor: "#46d66a",
                customClass: { title: "h2-user-task" }
            });
        } else {
            Swal.fire({
                title: "Operacao Cancelada",
                icon: "error",
                iconColor: "#ff0707",
                confirmButtonColor: "#46d66a",
                customClass: { title: 'h2-user-task' }
            })

        }
    }

    // filtra a listagem de tarefas pelo titulo atraves da rota de busca
    async function buscarTarefa(b: React.FormEvent<HTMLFormElement>) {
        b.preventDefault()

        // se o campo estiver vazio, recarrega a lista completa e encerra
        if (!busca.trim()) {
            getTask();
            return;
        }

        const res = await api.get(`/tasks/search?title=${busca}`);
        setTasks(res.data);
    }

    // limpa o termo de pesquisa do estado
    function LimparBusca() {
        setBusca("");
    }

    return (
        <>
            <h2 className='title-tasks'>Tarefas <FaList /></h2>
            <div className="header-tasks">

                {/* formulario de busca centralizado */}
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

            {/* Modal customizado para entrada de dados da tarefa */}
            <ModalTask
                isOpen={modalIsOpen}
                closeModal={closeModal}
                save={save}
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                completed={completed} setCompleted={setCompleted}
                id={id}
            />

            {/* Listagem em tabela */}
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
                                    <button className='editar-tasks' onClick={() => edition(t)}><HiPencil /></button>
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