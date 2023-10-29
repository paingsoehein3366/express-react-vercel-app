import { Pool } from 'pg';

export const db = new Pool({
    host: "dpg-ckv1gh237rbc73e6kkug-a.singapore-postgres.render.com",
    user: "express_server_user",
    password: "ouAVUpWziuSiBDgzuQcy9hnCAJtYEUcb",
    database: "express_server",
    max: 20,
    ssl: true,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});