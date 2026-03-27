import { useEffect, useState} from 'react'
import { api } from '../Services/api';


interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    isActive:boolean;
}


function Users() {

  const [users, setUsers] = useState<User[]> ([]);
  const [id, setId] = useState<number | null> (null); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [createdAt, setCreatedAt] = useState(new Date())

 
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
      const dados = {name, email, password, isActive, createdAt};
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
    setPassword(e.password);
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
    <div className='formulary'>
      <form className= 'formulary' onSubmit={save}>
        <h2>{id? 'Editando' : 'Novo usuario'}</h2>
        <input type='text' placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required/>
        <input type='email' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <input type='password' placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required/>

        <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
        {id && <button onClick={clear} type="button">Cancelar</button>}
       </form>
    
        {users.map(u => (
          <div key={u.id}>
            <div> 
              <strong>{u.name}</strong>
              <p>{u.email}</p>
              <p>{u.password}</p>
            </div>
            <button onClick={() => deletar(u.id)}>Apagar Usuario</button>
            <button onClick={() => edition(u)}>Editar</button>
          </div>
        ))}
      </div> 
  )
}


export default Users;

