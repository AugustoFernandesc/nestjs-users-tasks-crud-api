# 🚀 TaskFlow - NestJS & React CRUD

Repositório do projeto **TaskFlow**, um ecossistema completo (Fullstack) para gerenciamento de usuários e tarefas. Desenvolvido como exercício técnico, aplicando conceitos de rotas protegidas, autenticação JWT e persistência de dados.

## 🛠️ Tecnologias e Ferramentas

### **Backend (NestJS)**
* **Framework:** NestJS (Node.js) com TypeScript
* **ORM:** TypeORM para abstração de banco de dados
* **Database:** PostgreSQL
* **Segurança:** Passport JWT para autenticação e Bcrypt para hash de senhas
* **Validação:** Class-validator e Class-transformer

### **Frontend (React)**
* **Library:** React.js com TypeScript
* **Roteamento:** React Router Dom (v6) com Rotas Protegidas
* **Estilização:** CSS3 e React Icons
* **Comunicação:** Axios para consumo de API REST
* **Feedback:** SweetAlert2 para diálogos interativos

---

## 📌 Funcionalidades Principais

### **Módulo de Usuários**
* Cadastro e login com geração de token JWT.
* Gerenciamento completo (CRUD) via Modais.
* Atribuição de perfis (ADMIN/USUARIO) *(Não funcionais)*.

### **Módulo de Tarefas**
* CRUD completo vinculado ao usuário autenticado.
* Filtro de busca por título.
* Controle de status (A Realizar / Realizada).

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone [https://github.com/AugustoFernandesc/TaskFlow.git](https://github.com/AugustoFernandesc/TaskFlow.git)
cd TaskFlow