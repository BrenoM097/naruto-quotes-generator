import styled from "styled-components";
import { string, func} from 'prop-types';
import { Button } from './button/Button';

export const Quotes = ({ quote, speaker, onUpdate}) => {
    return (
        <Wrapper>
        <Quote>{quote}</Quote>
        <Speaker>- {speaker}</Speaker>
        <Button onClick={onUpdate}>Quote no jutsu</Button>

        </Wrapper>
        
    )
}
//avisa se o que vir no quote ou speaker nao for uma string, ele alerta
Quotes.protoTypes = {
    quote: string,
    speaker: string,
    onUpdate: func
}

// colocou o naruto mais para direita
const Wrapper = styled.div `
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


// 1em = tamanho da fonte definida no navegador, da mais flexibilidade conforme o dispositivo
const Quote = styled.p `
    font-size: 2em;
    flex: 1;
    margin: 0;
`;
// peguei as propriedades de um elemento ja criado e adicionei em outro, assim posso reaproveitar o que ele ja tinha e adicionar novos, é igual herança de classe
const Speaker = styled(Quote) `
    text-align: right;
    margin-bottom: 50px;
`;