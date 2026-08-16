# ChromebookBooking

### Equipe

- [Guilherme Halter Nunes](https://github.com/GuilhermeHalter)
- [João Vitor Bagatoli](https://github.com/joao-bagatoli)

### Responsabilidades Principais

**Guilherme**<br>
Responsável pelo desenvolvimento Frontend, incluindo a implementação de telas e funcionalidades da aplicação, além da definição e aplicação de aspectos de UI/UX. Também atua na elaboração dos Diagramas C4, contribuindo para a documentação e representação da arquitetura do sistema.

**João**<br>
Responsável pelo desenvolvimento Backend, incluindo a implementação de APIs, regras de negócio e algumas telas e funcionalidades da aplicação. Também atua na infraestrutura e deploy, garantindo a configuração, disponibilização e funcionamento do sistema nos ambientes necessários.

## Descrição

Sistema web desenvolvido para gerenciar reservas de gabinetes com Chromebooks em uma escola pública, substituindo o controle manual realizado por planilhas. A solução permite organizar reservas, evitar conflitos de horários e manter um histórico estruturado de utilização, proporcionando maior controle, confiabilidade e praticidade para professores e responsáveis pela sala digital.

## Problema Atendido

O projeto atende à falta de organização e controle no processo de reserva dos gabinetes com Chromebooks, que atualmente é realizado manualmente por meio de planilhas. A solução reduz conflitos de horários, inconsistências e tarefas manuais, além de facilitar o acompanhamento e o histórico de utilização dos recursos.

## Publico Beneficiado

O sistema beneficia principalmente professores e responsáveis pela sala digital da **Escola Municipal Profª Zulma do Rosário Miranda**, facilitando o processo de reserva e gerenciamento dos gabinetes. Indiretamente, também beneficia os alunos, ao contribuir para uma melhor organização e disponibilidade dos Chromebooks durante as atividades escolares.

## Objetivo do Sistema

O objetivo do sistema é digitalizar e otimizar o processo de reserva e gerenciamento dos gabinetes com Chromebooks, substituindo o controle manual realizado por meio de planilhas. A aplicação busca facilitar o agendamento pelos professores, evitar conflitos de horários e garantir maior organização e disponibilidade dos recursos.

Além disso, o sistema pretende centralizar as informações das reservas, manter um histórico estruturado de utilização e reduzir tarefas manuais da responsável pela sala digital, proporcionando maior controle, confiabilidade, rastreabilidade e praticidade na gestão dos gabinetes.

## Stack Tecnológica

**Front-end** 
- Vue.js 
- Typescript 
- Pinia 
- PrimeVue

**Back-end** 
- .NET 
- Entity Framework Core 
- LINQ 
- PostgreSQL


## Arquitetura Resumida

### Front-end 

**Feature-based structure**

```text
src/
├── layouts/
│   └── components/
├── modules/
│   └── module name/
│       ├── components/
│       ├── views/
│       ├── services/
│       ├── stores/
│       └── types/
├── shared/
│   ├── components/
│   ├── services/
│   └── types/
└── router/
```
Fluxo 

View → Store → Service → Api 

### Back-end 

**Layered Architecture** 

```text
Api/
├── Controllers/
├── Services/
├── DTOs/
├── Domain/
│   ├── Entities/
│   ├── Value Objects/
│   └── Enums/
├── Infrastructure/
│   └── Persistences/
└── Tests/
```
Fluxo 

Controller → Service → DbContext 

Estrutura geral do projeto 

**root folder**  
```text
AppName.App/
AppName.Api/
AppName.Tests/
```

## Introdução de instalação e Execução local

Para executar o projeto localmente, é necessário que o ambiente possua algumas tecnologias previamente instaladas e configuradas. O sistema é composto por uma aplicação frontend, desenvolvida com Node.js, uma API backend desenvolvida com .NET e um banco de dados PostgreSQL.

>⚠️ Observação importante: Antes de executar o projeto, é necessário configurar corretamente todas as variáveis de ambiente utilizadas pelo frontend e pelo backend. A configuração deve ser realizada antes dos >comandos de instalação e execução, como npm install, npm run dev e dotnet run. Sem essas variáveis configuradas corretamente, o frontend e/ou backend poderá não conseguir se conectar à API, ao Supabase ou ao >banco de dados PostgreSQL.

### Tecnologias necessárias

Antes de iniciar a execução do projeto, verifique se as seguintes tecnologias estão instaladas:

- **Node.js** — utilizado para instalar as dependências e executar o frontend.
- **.NET SDK** — utilizado para restaurar as dependências e executar o backend.
- **PostgreSQL** — banco de dados utilizado pela aplicação.

#### Clonando o projeto

Primeiramente, deve-se clonar o repositório do projeto para a máquina local:

```bash
git clone https://github.com/joao-bagatoli/ChromebookBooking.git
```

Após o download, acesse a pasta do projeto:

```bash
cd ChromebookBooking
```
#### Preparando o banco de dados

O projeto utiliza o PostgreSQL como sistema de gerenciamento do banco de dados e o Entity Framework Core para realizar o mapeamento entre as entidades da aplicação e as tabelas do banco.

Antes de executar o backend, certifique-se de que o serviço do PostgreSQL esteja instalado e em execução.

A criação e a atualização das estruturas do banco de dados são realizadas por meio das migrations do Entity Framework Core. Dessa forma, as tabelas e demais estruturas necessárias podem ser criadas a partir das configurações e entidades definidas no projeto.

Para aplicar as migrations e criar ou atualizar o banco de dados, dentro da pasta `AppName.Api/`, execute:

```bash
dotnet ef database update
```
Após a execução do comando, o Entity Framework Core aplicará as migrations pendentes no banco de dados configurado pela aplicação.

O pgAdmin 4 pode ser utilizado para acessar o PostgreSQL e verificar as tabelas, registros e demais estruturas criadas pelo Entity Framework Core.

>Observação: o pgAdmin 4 é uma ferramenta de gerenciamento e visualização do banco de dados. Ele não substitui o PostgreSQL, que precisa estar instalado e em execução para que a aplicação consiga se conectar ao banco.

#### Executando o Frontend

Acesse a pasta responsável pela aplicação frontend:

```bash
cd AppName.App/
```

Instale as dependências:

```bash
npm install
```
Depois, execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```
O terminal deverá apresentar o endereço local em que a aplicação estará disponível.

#### Executando o Backend

Em outro terminal, acesse a pasta da API:

```bash
cd AppName.Api/
```

Restaure as dependências do projeto .NET:

```bash
dotnet restore
```

Em seguida, execute a API:

```bash
dotnet run
```

A API será iniciada e ficará disponível no endereço informado pelo terminal.

#### Execução completa

Para utilizar o sistema localmente, é necessário manter os serviços necessários em execução simultaneamente:

**1. PostgreSQL**

Certifique-se de que o serviço do PostgreSQL esteja ativo.

**2. pgAdmin 4 — opcional**

Abra o pgAdmin 4 caso seja necessário consultar ou acompanhar os dados do banco durante o desenvolvimento e os testes.

**3. Frontend**
```bash
cd AppName.App/
npm install
npm run dev
```
**4. Backend**

Em outro terminal:
```bash
cd AppName.Api/
dotnet restore
dotnet run
```

Com o PostgreSQL, backend e frontend configurados e em execução, o sistema estará disponível para utilização local.

Durante o desenvolvimento, o pgAdmin 4 pode ser utilizado para verificar se as operações realizadas pelo sistema, como criação, alteração ou exclusão de registros, estão sendo corretamente refletidas no banco de dados.

## Variáveis de ambiente esperadas

O projeto utiliza variáveis de ambiente para configurar a comunicação entre o frontend, o backend, o banco de dados e o serviço de autenticação do Supabase.

Arquivo `.env`

Na raiz do projeto, deve existir um arquivo `.env` contendo as variáveis utilizadas pelo frontend:
```bash
VITE_BASE_URL=http://localhost:5088/api

VITE_SUPABASE_URL=https://pujsdzwyquopauhglvlj.supabase.co/

VITE_SUPABASE_ANON_KEY=SUA_CHAVE_SUPABASE_ANON
```
> Observação: por questões de segurança, chaves e credenciais não devem ser expostas ou versionadas publicamente. A chave `VITE_SUPABASE_ANON_KEY` deve ser configurada de acordo com o ambiente utilizado.

## Variáveis de ambiente do sistema

Além do arquivo `.env`, o backend utiliza algumas variáveis de ambiente configuradas diretamente no sistema operacional:

```bash
Supabase__ValidIssuer=https://pujsdzwyquopauhglvlj.supabase.co/auth/v1

ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=ChromebookBooking;Username=postgres;Password=SUA_SENHA
```

A variável `Supabase__ValidIssuer` define o endereço utilizado para validação da autenticação do Supabase.

A variável `ConnectionStrings__DefaultConnection` contém a string de conexão utilizada pelo backend para acessar o banco de dados PostgreSQL. Ela define o endereço do servidor, porta, nome do banco, usuário e senha utilizados na conexão.

## Definição do MVP

Sistema web que permite aos professores consultar a disponibilidade e realizar reservas de gabinetes com Chromebooks, enquanto a escola pode acompanhar e gerenciar essas reservas.

#### Fluxo principal do MVP
Professor realiza login → acessa a tela de reservas → consulta a disponibilidade dos gabinetes → seleciona data, horário e gabinete → realiza a reserva → sistema registra a reserva e atualiza a disponibilidade.

#### Funcionalidades incluídas
Autenticação de usuários; visualização dos gabinetes disponíveis; consulta de disponibilidade por data e horário; criação de reservas; visualização das reservas realizadas; armazenamento das informações no banco de dados; gerenciamento básico das reservas.

#### Como será demonstrado?
Através de uma demonstração prática do sistema, realizando o login de um usuário, consultando a disponibilidade de um gabinete, efetuando uma reserva e verificando a atualização das informações no sistema e no banco de dados.

#### Evidência mínima de funcionamento
Uma reserva deve ser criada com sucesso, registrada no banco de dados e apresentada corretamente no sistema, impedindo que outro usuário realize uma reserva conflitante para o mesmo gabinete, data e horário.

## backlog inicial

O backlog inicial do projeto está organizado no `Linear`, ferramenta utilizada pela equipe para gerenciamento das atividades e acompanhamento do desenvolvimento do sistema.

Backlog do projeto: https://linear.app/bagatoli/project/pac-vi-0b9b1d7a4af1/issues

## Cronograma Resumido

| Período      | Etapa                     | Principais atividades                                                                                                      |
| ------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Agosto**   | **Autenticação**          | Autenticação via Google, restrição ao e-mail institucional e tela de login.                                                |
| **Agosto**   | **Cadastros**             | Tela de usuários, tela de turmas, associação de professores às turmas, tela de gabinetes e definição dos horários de aula. |
| **Setembro** | **Agendamento**           | Tela de nova reserva, agenda de reservas, edição e exclusão de reservas.                                                   |
| **Outubro**  | **Piloto e Histórico**    | Início do piloto, tela de histórico de reservas e limpeza automática do histórico.                                         |
| **Novembro** | **Dashboard**             | Desenvolvimento da tela de dashboard.                                                                                      |
| **Novembro** | **Treinamento e Go Live** | Treinamento dos usuários, realização do Go Live e operação assistida.                                                      |
