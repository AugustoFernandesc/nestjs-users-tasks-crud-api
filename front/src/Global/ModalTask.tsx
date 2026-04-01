import '../Styles/Modal.css'

//interface que define o contrato de propiedades props do modal de tarefas
interface ModalProps {
    isOpen: boolean; //controla se o modal deve ser exibido
    closeModal: () => void; // funcao para fechar e resetar o modal
    save: (u: React.FormEvent<HTMLFormElement>) => void; // funcao que dispara o POST/PUT na API
    title: string;
    setTitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void; 
    completed: boolean; // Estado da tarefa (concluida ou nao)
    setCompleted: (val: boolean) => void; // Funcao para alterar o status
    id: number | null; //identificador para alternar entre modo criar e editar
}

export default function ModalTask({ 
    isOpen, closeModal, save, title, setTitle, description, setDescription, completed, setCompleted, id
}: ModalProps) {

    // renderizacao condicional para evitar processamento desnecessario no DOM
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* titulo dinamico baseado na operacao de CRUD */}
                <h2 className='h2-user-task'>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
                <form onSubmit={save} className='form-add-user-task'>
                   
                    {/* Input controlado para o titulo */}
                    <input 
                        className='input-form' 
                        type='text' 
                        placeholder="Título da tarefa" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        required 
                    />
                    
                    {/* Input controlado para a descricao */}
                    <input 
                        className='input-form' 
                        type='text' 
                        placeholder="Descrição" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        required 
                    />
                    
                    {/* Input controlado para saber se a tarefa esta completa ou nao */}
                    <select
                        className='input-form'
                        value={completed ? "true" : "false"}
                        onChange={e => setCompleted(e.target.value === "true")}
                        required
                    >
                    <option value="false">A Realizar</option>
                    <option value="true">Realizada</option>
                    </select>
                    
                    <div className='button-inf-direita'>
                        {/* Botao de cancelamento: limpa o estado e fecha o modal */}
                        <button className="button-cancelar" onClick={closeModal} type="button">Cancelar</button>
                        {/* Botao de submissao que aciona a persistencia no backend */}
                        <button className="button-salvar" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


