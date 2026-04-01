import '../Styles/Modal.css'

// interface que define as propiedades recebidas pelo componente (Props)
interface ModalProps {
    isOpen: boolean; //controla a visibilidade do modal
    closeModal: () => void; // funcao para fechar o modal
    save: (u: React.FormEvent<HTMLFormElement>) => void; //funcao de submissao do formulario
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    perfil: string;
    setPerfil: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    id: number | null; //define se o modo de edicao possui id ou cadastro null
}

// componente modal: interface para criacao e edicao de usuarios
export default function Modal({ 
    isOpen, closeModal, save, name, setName, email, setEmail, perfil, setPerfil, password, setPassword, id 
}: ModalProps) {

    // renderizacao condicional: se nao estiver aberto, o componente nao ocupa espaco no DOM
    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* altera o titulo dinamicamente com base na acao */}
                <h2 className='h2-user-task'>{id ? 'Editar' : 'Adicionar'}</h2>
                <form onSubmit={save} className='form-add-user-task'>
                    {/* input controlado para o nome do usuario */}
                    <input className='input-form' type='text' placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required/>
                    <select className='input-form' value={perfil} onChange={e => setPerfil(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="ADMIN">ADIMIN</option>
                        <option value="USUARIO">USUARIO</option>
                    </select>
                    {/* a senha so e soliciada na criacao de novos registros */}
                    <input className='input-form' type='email' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    {!id && (
                        <input className='input-form' type='password' placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                    )}
                    <div className='button-inf-direita'>
                        {/* botao para nao disparar o submit do form ao cancelar */}
                        <button className="button-cancelar" onClick={closeModal} type="button">Cancelar</button>
                        {/* dispara a funcao save injetada via props */}
                        <button className="button-salvar" type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}