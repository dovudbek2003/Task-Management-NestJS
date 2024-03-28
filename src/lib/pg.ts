import { Pool } from "pg"
import { config } from "src/common/config"

const pool = new Pool({
    connectionString: config.databaseUrl
})

export class Postgres {
    async fetch<ResponseType, Targs>(SQL: string, ...args: Array<Targs>): Promise<ResponseType> {
        const clien = await pool.connect()
        try {
            const { rows: [row] } = await pool.query(SQL, args);
            return row
        } finally {
            clien.release()
        }
    }

    async fetchAll<ResponseType, Targs = undefined>(SQL: string, ...args: Array<Targs>): Promise<Array<ResponseType>> {
        const clien = await pool.connect()
        try {
            const { rows } = await pool.query(SQL, args);
            return rows
        } finally {
            clien.release()
        }
    }
}