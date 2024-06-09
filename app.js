const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const contactsRouter = require('./routes/api/contactsRoutes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
// token mongodb = uOK8aqvThczs6gMj
// mongodb+srv://alemadera:uOK8aqvThczs6gMj@cluster0.l1n1pem.mongodb.net/
// 