import { fastify } from "fastify";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
const dataBase = new DataBasePostgres();

server.post('/rifas', async (request, reply) => {

    const { nome, numero, pagamento } = request.body;
    
    await dataBase.criar({
        nome,
        numero,
        pagamento
    });
    
    return reply.status(201).send();
});

server.get('/rifas', async (request) => {
    const search = request.query.search

    const rifas = await dataBase.listar(search);
    
    return rifas;
});

server.put('/rifas/:id', async (request, reply) => {
    const rifaId = parseInt(request.params.id);
    const { nome, numero, pagamento } = request.body;
    
    await dataBase.update(rifaId, {
        nome,
        numero,
        pagamento
    });
    
    return reply.status(204).send();
});

server.delete('/rifas/:id', async (request, reply) => {
    const rifaId = parseInt(request.params.id);
    
    await dataBase.delete(rifaId);
    
    return reply.status(204).send();
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});