import axios from "axios";

const API_URL = '/api/tickets/'

//Create new ticket
const createTicket = async (ticketdata, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, ticketdata, config)
    return response.data
}

//get tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}



// Get user ticket
const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + ticketId, config)

    return response.data
}
const ticketService = {
    createTicket,
    getTickets,
    getTicket
}

export default ticketService
