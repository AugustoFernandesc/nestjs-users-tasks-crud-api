import { useEffect, useState} from 'react'
import { api } from '../Services/api';
import '../Styles/UserStyles.css';

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

      clear()
      getUser()
  }

   function edition(e:User) {
    setId(e.id);
    setName(e.name);
    setPerfil(e.perfil);
    setEmail(e.email);
    setIsActive(e.isActive);
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
    await api.delete(`/users/${id}`)
    getUser();
  }



    
  return(
    <>    
      <div className='formulary'>
        <form className= 'formulary' onSubmit={save}>
          <h2>{id? 'Editando' : 'Novo usuario'}</h2>
          <input type='text' placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required/>
          <input type='email' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
          <select value={perfil} onChange={e => setPerfil(e.target.value)} required>
            <option>Selecione...</option>
            <option>ADIMIN</option>
            <option>USUARIO</option>
          </select>
          <input type='password' placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required/>

          <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
          {id && <button onClick={clear} type="button">Cancelar</button>}
        </form>
    </div>
    
    <div>
        <table>
          <thead>
              <tr> 
                <th>USUARIO</th>
                <th>LOGIN</th>
                <th>PERFIL</th>
              </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.perfil ? u.perfil : 'USUARIO'}</td>
                <td className='acoes'>
                  <button className='editar' onClick={() => edition(u)}>Editar</button>
                  <button className='excluir' onClick={() => deletar(u.id)}>X</button>
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

