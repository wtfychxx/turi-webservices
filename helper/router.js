const express = require('express')
const router = express.Router()

const peopleController = require('../controller/people')

router.use(function hitlog(request, response, next) {
    console.log('Time', Date.now())
    next()
})

router.get('/getPerson/:familyCardNumber', peopleController.getPeople)

module.exports = router