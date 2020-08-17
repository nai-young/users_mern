const express = require('express')
const router = express.Router()

let Client = require('../models/client.model')

router.route('/').get((req, res) => {
  Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    Client.collection.insertOne({
      name: req.body.name,
      lastn: req.body.lastn,
      email: req.body.email,
      mobileno: req.body.mobileno,
      project: req.body.project
    })
      .then(() => res.json('User added'))
      .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/edit/:id').post((req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      client.name = req.body.name
      client.lastn = req.body.lastn
      client.email = req.body.email
      client.mobileno = req.body.mobileno
      client.project = req.body.project

      client.save()
        .then(() => res.json('Client updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/:id').delete((req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json('Client deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
