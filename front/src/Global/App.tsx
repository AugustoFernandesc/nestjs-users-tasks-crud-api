import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import User from "../Pages/User";
import Task from "../Pages/Task";
import TelaLogin from "../Pages/TelaLogin";
import Layout from "./Layout";
import Home from "../Pages/Home";

/* componente de protecao de rota
 * responsavel por interceptar o acesso as telas internas no sistema
 */
function PrivateRoute() {

    // Verifica a existencia do jwt no armazenamento local para validar o acesso 
    const isAuthenticated = !!localStorage.getItem('token'); 

    //se autenticado, libera o acesso as rotas filhas (Outlet)
    //caso contrario, redireciona para a tela de login
    return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
    
}

{/* definicao centralizada das rotas da aplicacao */}
function App() {
    return (
        <Routes>
           
            {/* Rota publica: tela de entrada para autenticacao */}           
            <Route path="/" element={<TelaLogin />} />

            {/* grupo de rotas protegidas: exige que o PrivateRoute valide o token */}
            <Route element={<PrivateRoute />}>
                <Route element={<Layout/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/user" element={<User />} />
                    <Route path="/task" element={<Task />} />
                </Route>
            </Route>
            
            {/* rota fallback: redireciona qualquer url invalida de volta para o inicio */}
            <Route path="*" element={<Navigate to='/' />} />

        </Routes>
        
    );
}

export default App;