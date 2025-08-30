# Projeto StarWars (Refactor)

Aplicativo **React Native (Expo)** com tema Star Wars, integrado à **SWAPI (swapi.online)** e com persistência via **AsyncStorage**.

## Funcionalidades
- Registro de usuário (nome e e-mail).
- Seleção de personagem no primeiro uso.
- Preferência de personagem salva para futuras sessões.
- Busca de personagens via API com lista clicável.
- Tela de Perfil para visualizar e alterar preferências.
- Tema visual inspirado em Star Wars (preto + amarelo).

## Como rodar
1. **Pré-requisitos**: Node.js LTS, `npm` ou `yarn`, e **Expo CLI** (`npm i -g expo` opcional).
2. **Instalar dependências**:
   ```bash
   npm install
   ```
3. **Executar**:
   ```bash
   npm start
   ```
   Depois abra no Android/iOS (físico ou emulador).

> Caso prefira React Native CLI puro, você pode copiar a pasta `src/` e usar os mesmos componentes/telas, ajustando o `index.js`/`App.js` do seu projeto.

## Estrutura
```
/src
  /components
    CharacterCard.js
  /screens
    RegisterScreen.js
    CharacterSelectScreen.js
    HomeScreen.js
    SearchScreen.js
    ProfileScreen.js
  /services
    api.js
  /storage
    userPrefs.js
App.js
```
## Solução do bug do botão que não aparecia
- O botão **Confirmar** na seleção de personagens agora é **fixado no rodapé** e fica **desabilitado** até que um item seja selecionado (`selected !== null`).
- O item selecionado fica destacado e mostra o selo **SELECIONADO**.
- Em `SearchScreen`, no modo seleção, o botão **Usar \<nome\>** só aparece habilitado quando há seleção.

## Documentação rápida de uso
- Abra o app → Tela **Registro** → **Continuar** → Tela **Escolha seu Personagem** → selecione e **Confirmar** → Tela **Início**.
- Para alterar o personagem depois: **Perfil & Preferências** → **Alterar Personagem**.

## Integrantes
- (Preencha aqui os nomes dos integrantes)

## Limitações conhecidas
- Sem paginação infinita na listagem principal (pode ser adicionado).
- Sem fontes customizadas por enquanto (apenas tema de cores).