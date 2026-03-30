import '../Styles/Modal.css'

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    save: (u: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    setTitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    id: number | null;
}

export default function ModalTask({ 
    isOpen, closeModal, save, title, setTitle, description, setDescription, id 
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className='h2-user-task'>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
                <form onSubmit={save} className='form-add-user-task'>
                    <input 
                        className='input-form' 
                        type='text' 
                        placeholder="Título da tarefa" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        required 
                    />
                    <input 
                        className='input-form' 
                        type='text' 
                        placeholder="Descrição" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        required 
                    />
                    
                  

                    <div className='button-inf-direita'>
                        <button className="button-cancelar" onClick={closeModal} type="button">Cancelar</button>
                        <button className="button-salvar" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


