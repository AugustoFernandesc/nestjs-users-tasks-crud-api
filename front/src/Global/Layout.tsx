import { Outlet, Link } from 'react-router-dom'
import '../Styles/Layout.css'
import { IoExit, IoHomeSharp } from 'react-icons/io5'
import { FaTasks, FaUser } from 'react-icons/fa'

export default function Layout(){

    return(
    <>
        <div className="layout-container">
            <aside className='sidebar'>
                <h2 className='title'>MG CODE</h2>
                <nav className='nav-container'>
   
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

                    <Link to='/' className='button-layout logout'>
                        <span>Sair</span>
                        <IoExit/>
                    </Link>
                </nav>
            </aside>
            <main className='content'>
                <Outlet/>
            </main>
        </div>
    </>
    )





}

