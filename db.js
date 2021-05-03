import pg from 'pg';
const pool = new pg.Pool({
    user: "iejukrjtrvsarc",
    password: "1cb755cfec8705837b3299307e0c3cfa8d28b8cc160b185dd483d2917709c895",
    host: "ec2-54-87-112-29.compute-1.amazonaws.com",
    port: 5432,
    database: "dfsb978io9e3hr",
    ssl: { rejectUnauthorized: false }
});

export default pool;