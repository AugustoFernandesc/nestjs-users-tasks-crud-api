import { useEffect, useState, type HTMLElementType } from "react";
import { api } from "../Services/api";



interface Task{
  id:number;
  title:string;
  description:string;
  completed:boolean;
  userId:number;
  createdAt:Date;
}


function Task() {

  const [tasks, setTasks] = useState<Task[]> ([]);
  const [id, setId] = useState<number | null> (null);
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState<number | null> (null);
  const [createdAt, setCreatedAt] = useState(new Date())

    async function getTask() {
    const res = await api.get('/tasks');
    setTasks(res.data);
    }

    useEffect(()=> {getTask()}, []);

    async function updateTask(u: React.FormEvent<HTMLFormElement>){
      u.preventDefault();
      const dados = {title, description, completed, userId, createdAt};
      if(id){
        await api.put(`/tasks/${id}`, dados);
      }else{
        await api.post('/tasks', dados);
      }

      clear()
      getTask();
  }

   function edition(e:Task) {
    setId(e.id);
    setTitle(e.title);
    setDesciption(e.description);
    setCompleted(e.completed);
    setUserId(e.userId);
    setCreatedAt(e.createdAt);
  }

   function clear() {
    setId(null);
    setTitle("");
    setDesciption("");
    setCompleted(false);
    setUserId(null);
    setCreatedAt(new Date());
  }

   async function deletar(id:number) {
        await api.delete(`/tasks/${id}`)
        getTask();
  }

  return(
    <div> 
    
        <form onSubmit={updateTask}>
        <h2>{id? 'Editando' : 'Novo Tarefa'}</h2>
        <input placeholder="Titulo da Tarefa" value={title} onChange={e => setTitle(e.target.value)} required/>
        <input placeholder="Descricao" value={description} onChange={e => setDesciption(e.target.value)} required/>


        <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
        {id && <button onClick={clear} type="button">Cancelar</button>}
        </form>

        {tasks.map(u => (
          <div key={u.id}>
            <div>
              <strong>{u.title}</strong>
              <p>{u.description}</p>
            </div>
            <button onClick={() => deletar(u.id)}>Apagar</button>
            <button onClick={() => edition(u)}>Editar</button>
          </div>
        ))}

    </div>

  )

}

export default Task