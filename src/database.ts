import {Pool} from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '$Asdf1234$',
    database: 'geoapp',
    port: 5432
});