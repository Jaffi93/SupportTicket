const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

router.get('/', protect, getTickets)
router.get('/:id', protect, getTicket)
router.delete('/:id', protect, deleteTicket)
router.put('/:id', protect, updateTicket)
router.post('/', protect, createTicket)

module.exports = router