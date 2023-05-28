import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { closeTicket, getTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Ticket() {
    const { ticket, isLoading, isSucess, isError, message } = useSelector((state) => state.tickets)

    const dispatch = useDispatch()
    const { ticketId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
    }, [message, isError, ticketId, dispatch])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticked closed')
        navigate('/tickets')
    }

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>
    }
    return (
        <>
            <div className='ticket-page'>
                <header className='ticket-header'>
                    <BackButton url='/tickets' />
                    <h2>
                        Ticket ID: {ticket._id}
                        <span className={`status status-${ticket.status}`}>
                            {ticket.status}
                        </span>
                    </h2>
                    <h3>
                        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                    </h3>
                    <h3>Product: {ticket.product}</h3>
                    <hr />
                    <div className='ticket-desc'>
                        <h3>Description of Issue</h3>
                        <p>{ticket.description}</p>
                    </div>
                    <h2>Notes</h2>
                </header>

                {ticket.status !== 'closed' && (
                    <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
                )}
            </div>
        </>
    )
}

export default Ticket