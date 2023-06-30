const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL_EXT,
    //ssl: true
})

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM conductor')
    res.status(200).json(response.rows)
}

const createUser = async (req, res) => {

}

const getDate = async (req, res) => {
    const response = await pool.query('SELECT NOW()')
    return res.json(response.rows[0])
}


module.exports = { // to export and use the functions everywhere
    getUsers,
    createUser,
    getDate
}




