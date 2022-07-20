import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getQuote } from './quotesService';

const response = { test: 'testing'};

// um servidor fictício que intercepta todas as requisiçoes na porta 5000 no localhost e vai responder com o testing
const server = setupServer(
    rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
        return res(ctx.json(response));
    })
);

beforeAll(() => server.listen());
afterAll(() => server.resetHandlers());
afterAll(() => server.close());

test ('transform json response into object js', async () => {
    const quote = await getQuote();

    expect(quote).toStrictEqual(response);
});