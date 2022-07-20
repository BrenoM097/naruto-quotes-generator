import { useState, useEffect, useRef } from 'react';
import './App.css';
import narutoImg from './images/naruto.png';
import styled from 'styled-components';
import {Quotes} from './components';
import jutsoSound from './sounds/jutso.mp3';
import { getQuote } from './services';

const audio = new Audio(jutsoSound);

function App() {
  const isMounted = useRef(true);

  const [ quoteState, setQuoteState ] =  useState({ quote: 'loading quote...', speaker: 'loading speaker...'});
  
  const onUpdate = async () => {
    const quote = await getQuote();

    if (isMounted.current) {
    audio.play();
    setQuoteState(quote); 
  }
  };

  // toda vez que a propriedade for alterada faz algo, observa o estado do que foi passado.
useEffect(() => {
  onUpdate();

  return () => {
    isMounted.current = false;
  };
}, []);


//operador spread "...", um atalho, basicamente ele vai entrar no objeto .state e pegar todas as propriedades dele e mapear para o componente quoteState.
  return (
    <Content>
      <Quotes {...quoteState} onUpdate={onUpdate} /> 
      <NarutoImg src={narutoImg} alt="naruto photo"/>
   </Content>
  );
}

//css que vai se aplicar apenas pra esse elemento, usando a o import
const Content = styled.div ` 
  height: 100vh; 
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

//vh = height é vw é width
const NarutoImg = styled.img `
  max-width: 50vw;
  align-self: flex-end;

`;


export default App;
