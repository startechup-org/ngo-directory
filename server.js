const express = require('express')

const { db } = require('./db/index')

async function server_init() {
    await db()

    const app = express()
    app.listen({ port: process.env.PORT || 3000 }, () => {
        console.log('Server running at: ', process.env.PORT || 3000)
    })
}

server_init()