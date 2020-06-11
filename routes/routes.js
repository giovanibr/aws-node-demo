const express = require('express')
const { query } = require('express-validator')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()

// controllers
const s3Controller = require('../controllers/s3-controllers')

router.get('/s3-download', [
    query('key').not().isEmpty().withMessage('key é obrigatório')
  ],
  function (req, res) {
    const errors = validationResult(req)
    console.log(req.body)

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      return s3Controller.download(req, res)
    }
  })

router.post('/s3-upload', s3Controller.upload)

module.exports = router
