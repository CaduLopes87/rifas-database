import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
const dataBase = new DataBasePostgres();

server.register(fastifyCors, {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://contabilizador-de-rifas.vercel.app',
            'http://192.168.1.114:5500'
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permitir a origem
        } else {
            callback(new Error('Not allowed by CORS')); // Bloquear a origem
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
});

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