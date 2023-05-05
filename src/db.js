import pkg from 'pg'

export const pool = new pkg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Admin123',
    database: 'Joyeria',
    port: '5432'
})