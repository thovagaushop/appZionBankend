const { Pool } = require('pg');

const pool = new Pool({
    host: 'db.xfnfzkwfbjtuljlcszjm.supabase.co',
    user: 'postgres',
    password: 'dung0946238573',
    database: 'postgres',
});

module.exports = pool;
