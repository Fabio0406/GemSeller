import pkg from 'pg'

export const pool = new pkg.Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER ||'postgres',
    password: process.env.DB_PASSWORD ||'Admin123',
    database: process.env.DB_DATABASE ||'Joyeria',
    port: process.env.DB_PORT || '5432'
})