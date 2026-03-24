import { useEffect, useState} from 'react'
import { api } from '../Services/api';


interface User{
    id:number;
    name:string;
    email:string;
    isActive:boolean;
}


function Users() {
  const [users, setUsers] = useState<User[]> ([]);
  const [id, setId] = useState<number | null> (null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [createdAt, setCreatedAt] = useState(new Date())


  async function getUser(){
    const res = await api.get('/users');
    setUsers(res.data);
  }
  
  useEffect(()=> {getUser()}, []);

  async function updateUser(u: React.FormEvent<HTMLFormElement>){
      u.preventDefault();
      const dados = {name, email, isActive, createdAt};
      if(id){
        await api.put(`/users/${id}`, dados);
      }else{
        await api.post('/users', dados);
      }

      clear()
      getUser()
  }

   function edition(e:User) {
    setId(e.id);
    setName(e.name);
    setEmail(e.email);
    setIsActive(e.isActive);
  }

   function clear() {
    setId(null);
    setName("");
    setEmail("");
    setIsActive(false);
    setCreatedAt(new Date());
  }

  async function deletar(id:number) {
    await api.delete(`/users/${id}`)
    getUser();
  }



    
  return(
    <div>
      <form onSubmit={updateUser}>
        <h2>{id? 'Editando' : 'Novo usuario'}</h2>
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required/>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>


        <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
        {id && <button onClick={clear} type="button">Cancelar</button>}
       </form>
    
        {users.map(u => (
          <div key={u.id}>
            <div> 
              <strong>{u.name}</strong>
              <p>{u.email}</p>
            </div>
            <button onClick={() => deletar(u.id)}>Apagar Usuario</button>
            <button onClick={() => edition(u)}>Editar</button>
          </div>
        ))}
      </div> 
  )
}


export default Users;

