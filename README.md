# 🎭 PRÓLOGO

Este documento serve como guia de inicialização e mapeamento técnico para o **Aplicativo Controle de Gastos**. Abaixo estão descritas as instruções exatas para instalar o ambiente e a listagem completa das bibliotecas que dão suporte ao ecossistema da aplicação.

---

## 🛠️ Como Instalar e Executar o Projeto

Siga os comandos abaixo no seu terminal para preparar o ambiente e rodar o aplicativo do zero:

```bash
# 1. Clonar o repositório (caso esteja baixando em outra máquina)
git clone <URL_DO_SEU_REPOSITÓRIO>
cd aplicativocontrolegastos

# 2. Instalar todas as dependências mapeadas no projeto
npm install

# 3. Iniciar o servidor de desenvolvimento limpando o cache do Metro Bundler
npx expo start -c

# 4. Executar no Emulador Android
# (Pressione a tecla 'a' no terminal com o emulador aberto ou use o script abaixo)
npm run android

# 📱 Aplicativo Controle de Gastos

[cite_start]Projeto de aplicativo mobile desenvolvido em **React Native** com **JavaScript** para a disciplina de Programação para Dispositivos Móveis (Avaliação P2)[cite: 3, 27]. [cite_start]O objetivo principal é permitir que o usuário registre, acompanhe e armazene localmente seus gastos pessoais por meio de uma interface organizada, limpa e funcional[cite: 3, 43, 158].

## 🎯 Objetivo da Avaliação
[cite_start]Este projeto foi desenvolvido de forma **individual** com componentes funcionais para demonstrar o domínio prático dos seguintes conceitos[cite: 4, 22, 28]:
- [cite_start]Gerenciamento de estado com `useState`[cite: 11, 102].
- [cite_start]Construção de interfaces e estilização com `StyleSheet` (sem uso de templates prontos)[cite: 13, 14, 32].
- [cite_start]Navegação entre telas utilizando Stack Navigator do **React Navigation**[cite: 15, 114, 118].
- [cite_start]Persistência de dados local integrada ao ciclo de vida da aplicação utilizando **SQLite**[cite: 17, 132, 156].

---

## 🛠️ Funcionalidades Desenvolvidas

### 1. Tela Inicial (Listagem de Gastos)
- [cite_start]Apresenta o título da aplicação na Toolbar estilizada[cite: 57, 121, 167].
- [cite_start]Exibe a listagem dos gastos cadastrados de forma organizada utilizando o componente nativo `FlatList`[cite: 55, 59, 65].
- [cite_start]**[BÔNUS/EXTRA]:** Exibe um painel de resumo financeiro com o cálculo dinâmico do **Total Acumulado** de todos os gastos salvos[cite: 195].
- [cite_start]Botão de ação flutuante (FAB) integrado com ícone para navegar até a tela de cadastro[cite: 58, 120, 197].

### 2. Tela de Cadastro de Gastos
- [cite_start]Campos obrigatórios validados antes do salvamento[cite: 77, 85, 88]:
  - [cite_start]**Descrição:** Caixa de texto para o detalhe do gasto[cite: 79].
  - [cite_start]**Categoria:** Menu seletor utilizando o componente `Picker` para evitar erros de digitação[cite: 80].
  - [cite_start]**Valor:** Input numérico validado para aceitar apenas valores maiores que zero[cite: 81, 87].
  - **Data:** Seletor de calendário nativo integrado via `DateTimePicker`.
- [cite_start]Mecanismo de persistência que grava os dados e retorna o usuário automaticamente para a tela principal após salvar[cite: 91, 92, 123].

---

## 📂 Estrutura de Diretórios do Projeto

[cite_start]O projeto segue estritamente a arquitetura modular sugerida para manter o código legível e organizado[cite: 172, 173, 213]:

```text
/src
 ├── /components
 │    └── ExpenseItem.js       # Componente responsável por renderizar cada item da lista
 ├── /database
 │    └── database.js          # Configuração, inicialização e queries do SQLite
 ├── /navigation
 │    └── routes.js            # Configuração do NavigationContainer e rotas do Stack
 ├── /screens
 │    ├── Home.js              # Tela principal de listagem e sumário de gastos
 │    └── AddExpenseScreen.js  # Tela de formulário e validações de cadastro
 └── App.js                    # Inicializador do ciclo de vida global e provedores do app