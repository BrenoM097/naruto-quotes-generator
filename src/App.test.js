import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const response = { speaker: 'Speaker', quote: 'quote'}

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
      return res(ctx.json(response));
  })
);

// teste para ver se na pagina possui um botao, uma frase, e uma imagem
test('renders the app, with a button, a quote and a image', () => {
  render(<App />);
  
  const buttonEl = screen.getByRole('button');
  const imageEl = screen.getByRole('img');
  const textEl = screen.getByText(/loading speaker/);

  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument();
  expect(textEl).toBeInTheDocument();
});

// diferença do find para o get é que o find é assincrono, ele vai esperar o texto aparecer na tela
//teste para quando clicar no botao aparecer uma nova frase vindo da api
test('calls api on button has clicked and update its text', async () => {
  render(<App />);

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl)

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();

});

// teste para carregar a pagina e ja ter uma frase na tela
test('calls api on startup and renders it response', async () => {
  render(<App />);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
});