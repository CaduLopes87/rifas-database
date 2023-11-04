import { sql } from "./db.js";

export class DataBasePostgres {
    async listar(search) {
        let rifas;
        
        if(search){
            rifas = await sql`select * from rifas where pagamento ilike ${'%' + search + '%'}`;          
        } else {
            rifas = await sql`select * from rifas`;          
        }
        return rifas;
    }

    async criar(rifa){
        const { nome, numero, pagamento } = rifa;
        const rifaId = numero;
        
        await sql`insert into rifas (id, nome, numero, pagamento) VALUES (${rifaId}, ${nome}, ${numero}, ${pagamento})`;
    }
    
    async update(id, rifa) {
        const { nome, numero, pagamento } = rifa;
        const rifaId = numero;

        await sql`delete from rifas where id = ${id}`;
        await sql`insert into rifas (id, nome, numero, pagamento) VALUES (${rifaId}, ${nome}, ${numero}, ${pagamento})`;
    }
    
    async delete(id) {
        await sql`delete from rifas where id = ${id}`;
    }
}