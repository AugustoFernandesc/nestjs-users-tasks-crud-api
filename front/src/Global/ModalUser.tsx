import '../Styles/Modal.css'



interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    save: (u: React.FormEvent<HTMLFormElement>) => void;
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    perfil: string;
    setPerfil: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    id: number | null;
}

export default function Modal({ 
    isOpen, closeModal, save, name, setName, email, setEmail, perfil, setPerfil, password, setPassword, id 
}: ModalProps) {
    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className='h2-user-task'>{id ? 'Editar' : 'Adicionar'}</h2>
                <form onSubmit={save} className='form-add-user-task'>
                    <input className='input-form' type='text' placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required/>
                    <select className='input-form' value={perfil} onChange={e => setPerfil(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="ADIMIN">ADIMIN</option>
                        <option value="USUARIO">USUARIO</option>
                    </select>
                    <input className='input-form' type='email' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    {!id && (
                        <input className='input-form' type='password' placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                    )}
                    <div className='button-inf-direita'>
                        <button className="button-cancelar" onClick={closeModal} type="button">Cancelar</button>
                        <button className="button-salvar" type="submit">{id ? 'Salvar' : 'Salvar'}</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}