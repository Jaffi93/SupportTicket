import React, { useState } from 'react'
import { useSelector } from 'react-redux'


function NewTicket() {
    const { user } = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')
    const onSubmit = () => { }
    return (
        <>
            <section className='heading'>
                <h1>Create new Heading</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Customer name</label>
                    <input className='form-control' type='text' value={name} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Customer email</label>
                    <input name='email' className='form-control' type='text' value={email} disabled></input>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor='product'>Product</label>
                        <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)} >
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea id='description' name='description' className='form-control' type='text' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className="form-group">
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>

            </section>
        </>
    )
}

export default NewTicket