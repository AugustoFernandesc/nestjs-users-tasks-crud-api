import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App';

/** Aqui o react e renderizado dentro da div 'root' do index.html **/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/** BrowserRouter prove o contexto de navegacao para toda a aplicacao 
     * permitindo que o uso de rotas dinamicas e protecao de acesso (jwt) **/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
