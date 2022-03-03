// import express
const express = require('express')
    // import bodyparser
const bodyParser = require('body-parser')
    // import router
const router = require('./helper/router.js')
    // import cors
const cors = require('cors')

// .env initizliation
const dotenv = require('dotenv')
dotenv.config()

// port initializtion
const port = process.env.PORT || 4080

// express initializtion
const app = express()

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use('/api', router)

app.all('*', (request, response) => {
    response.send({ message: "Your url was not found, please make sure you have entered an correct url!" })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})