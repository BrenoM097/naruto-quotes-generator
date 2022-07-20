import { render, screen, fireEvent} from '@testing-library/react';
import { Quotes } from '.';


const quote = 'test quote';
const speaker = 'ramdom Speaker'

test(' renders received quote, speaker and a button', () => {
    render(<Quotes quote={quote} speaker={speaker}/>);

    const quoteEl = screen.getByText(quote);
    const speakerEl = screen.getByText(/speaker/i);
    const buttonEl = screen.getByRole('button');

    expect(quoteEl).toBeInTheDocument();
    expect(speakerEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
})

test('calls a callback when button is pressed', () => {
    const callback = jest.fn();

    render(<Quotes quote={quote} speaker={speaker} onUpdate ={callback}/>);
    const buttonEl = screen.getByRole('button');

    fireEvent.click(buttonEl); //simula o clique de um usuario

    expect(callback).toHaveBeenCalledTimes(1); // a função que foi passada foi chamada 1 vez
})