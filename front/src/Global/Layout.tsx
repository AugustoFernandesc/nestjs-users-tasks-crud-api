import { Outlet, Link, useNavigate } from 'react-router-dom'
import '../Styles/Layout.css'
import { IoExit, IoHomeSharp } from 'react-icons/io5'
import { FaTasks, FaUser } from 'react-icons/fa'
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png'

// componente de Layout global
// responsavel por estruturar a sidebar de navegacao e o container principa; (outlet)
export default function Layout(){

    const navigate = useNavigate();

    //gerencia o encerramento da sessao do usuario 
    //remove os dados do localStorage e redireciona para a tela de login
    async function sair(){
        const result = await Swal.fire({
        title: "Deseja Sair?",
        icon: 'warning',
        iconColor: "red",
        confirmButtonText: "Sim, Sair!",
        confirmButtonColor: "#46d66a",
        showCancelButton: true,
        cancelButtonColor: "#181a18",
        reverseButtons: true,
        customClass:{title: 'h2-user-task'}
        })
        
        if(result.isConfirmed){
            
            // limpa as credenciais de acesso para invalidar a sessao
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            //redireciona para a tela de login
            navigate('/')
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

    return(
    <>
        <div className="layout-container">
            <aside className='sidebar'>
                {/* menu lateral de navegacao (sidebar) */}
                <img src={logo} />
                <nav className='nav-container'>
                <div className='border-button'></div>
   
                    {/* O uso do link garante a navegacao sem recarregar o browser (SPA) */}
                    <Link to='/home' className='button-layout'>
                        <span>Home</span>
                        <IoHomeSharp/>
                    </Link>

                    <Link to='/user' className='button-layout'>
                        <span>Usuários</span>
                        <FaUser/>
                    </Link>

                    <Link to='/task' className='button-layout'>
                        <span>Tarefas</span>
                        <FaTasks/>
                    </Link>
                    
                    {/* botao de logout com interacao */}
                    <div onClick={sair} className='button-layout logout' style={{ cursor: 'pointer' }}>
                        <span>Sair</span>
                        <IoExit/>
                    </div>
                </nav>
            </aside>

            {/* container dinamico que renderiza a rota filha selecionada */}
            <main className='content'>
                <Outlet/>
            </main>
        </div>
    </>
    )





}

