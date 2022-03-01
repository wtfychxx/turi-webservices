import express from 'express'
const router = express.Router()

import { getPeople } from '../controller/people.js'

router.use(function hitlog(request, response, next) {
    console.log('Time', Date.now())
    next()
})

router.get('/getPerson/:familyCardNumber', getPeople)

export default router