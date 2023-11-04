import { sql } from "./db.js";

// sql `DROP TABLE IF EXISTS rifas`.then(() => {
//     console.log('Tabela Apagada!');
// });

sql `
    CREATE TABLE rifas (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    numero INTEGER NOT NULL,
    pagamento TEXT NOT NULL
);

`.then(() => {
    console.log('Tabela Criada!');
});