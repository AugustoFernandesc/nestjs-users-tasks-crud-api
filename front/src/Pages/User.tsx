import { useEffect, useState} from 'react'
import { api } from '../Services/api';
import '../Styles/UserStyles.css';
import Modal from '../Global/ModalUser'
import '../Styles/Layout.css';
import del from '../Assets/delete.png';
import { FaList } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi';
import Swal from 'sweetalert2';


interface User{
    id:number;
    name:string;
    email:string;
    perfil:string;
    password:string;
    isActive:boolean;
}


function Users() {

  const [users, setUsers] = useState<User[]> ([]);
  const [id, setId] = useState<number | null> (null); 
  const [name, setName] = useState("");
  const [perfil, setPerfil] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [createdAt, setCreatedAt] = useState(new Date())
  const [modalIsOpen, setIsOpen] =  useState(false);
  const [busca, setBusca] = useState("");

  function openModal(){
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false);
    clear();
  };

  async function getUser(){
    try{
    const res = await api.get('/users');
    setUsers(res.data);
    }catch (err){
      console.error('Erro ao buscar usuarios', err)
    }
  }
  
  useEffect(()=> {getUser()}, []);
  
  async function save(u: React.FormEvent<HTMLFormElement>){
      u.preventDefault();
      const dados = {name, email, perfil, password, isActive, createdAt};
      if(id){
        await api.put(`/users/${id}`, dados);
      }else{
        await api.post('/users', dados);
      }

      closeModal()
      clear()
      getUser()
  }

   function edition(e:User) {
    setId(e.id);
    setName(e.name);
    setPerfil(e.perfil);
    setEmail(e.email);
    openModal();
  }

   function clear() {
    setId(null);
    setName("");
    setEmail("");
    setPassword("")
    setIsActive(false);
    setCreatedAt(new Date());
  }

  async function deletar(id:number) {
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
      await api.delete(`/users/${id}`)
      getUser();
      Swal.fire({ 
        title: "Usuario Deletado!", 
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


  async function buscarUsuario(b: React.FormEvent) {
    b.preventDefault();
    const res = await api.get(`/users/search?nome=${busca}`);
    setUsers(res.data);
  }

  function LimparBusca(){
    setBusca('');
  }
    
      return (
            <>  
              
              <h2 className='title-user'>Usuários <FaList/></h2>
              <div className="header-container">
                  <form className= "search-container" onSubmit={buscarUsuario}>
                  <input 
                    className="input-search"
                    type="search" 
                    placeholder="Pesquisar usuário..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    />
                    <button className='button-search' onClick={LimparBusca}>Limpar</button>
                    <button className="button-search" type="submit">Buscar</button>
                </form>

                <button className="button-add-user" onClick={openModal}>Adicionar</button>
              </div>

              <Modal
                isOpen={modalIsOpen} 
                closeModal={closeModal}
                save={save}
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                perfil={perfil} setPerfil={setPerfil}
                password={password} setPassword={setPassword}
                id={id}
              />
              
              <div className='div-user'>
                <table className='table-user'>
                  <thead>
                    <tr className='linha-tabela'> 
                      <th className='cabecalho-tabela'>Usuário</th>
                      <th className='cabecalho-tabela'>Login</th>
                      <th className='cabecalho-tabela'>Perfil</th>
                      <th className='cabecalho-tabela'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr className='linha-tabela' key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.perfil ? u.perfil : 'USUARIO'}</td>
                        <td className='acoes'>
                          <button className='editar' onClick={() => edition(u)}><HiPencil/></button>
                          <button className='excluir' onClick={() => deletar(u.id)}><img src={del} alt="excluir" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
      )
}


export default Users;

