// import express
import express from 'express'
// import bodyparser
import bodyParser from 'body-parser'
// import router
import router from './helper/router.js'
// import cors
import cors from 'cors'

// .env initizliation
import dotenv from 'dotenv'
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