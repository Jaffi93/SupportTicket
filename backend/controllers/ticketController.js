const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@dec      get tickets
//@route    api/tickets
//@access   private
const getTickets = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('No user found')
    }
    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

//@dec      get ticket
//@route    api/tickets:id
//@access   private
const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('No user found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('No ticket found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket)

})

//@dec      delete ticket
//@route    api/tickets:id
//@access   private
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('No user found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('No ticket found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await ticket.deleteOne()

    res.status(200).json({ success: true })

})

//@dec      update ticket
//@route    api/tickets:id
//@access   private
const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('No user found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('No ticket found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updateTicket)

})

//@dec      create ticket
//@route    api/tickets
//@access   private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(401)
        throw new Error("Please enter product and description")
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('No user found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})


module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
}