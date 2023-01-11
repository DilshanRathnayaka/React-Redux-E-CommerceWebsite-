import axios from 'axios';
import React, { useState, useEffect } from 'react'
import "../CSS/Admin.css";
function Admin() {
    const [name, setName] = useState("")
    const [price, setprice] = useState("");
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/Product').then((res) => {
            setProducts(res.data)
        })
    }, [])


    const Handlesubmit = () => {
        axios.post('/api/Product', {
            name,
            price,
            image,
            description
        }).then((res) => {
            setProducts([...products,{
                name,
                price,
                image,
                description
            }])
            console.log(res)
        })
    }

    const Delete = (id) => {
        axios.delete(`/api/Product/${id}`).then((res) => {
            window.location.reload();
        })
    }

    return (
        <div className='admin-container'>

            <div className='admin-left'>

                <div>

                    <table class="table table-light">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr>
                                        <th >  <img className='admin-image' src={product.image} alt="" /></th>
                                        <th>{product.name}</th>
                                        <td > ${product.price}</td>
                                        <td> {product.description}</td>
                                        <td><button type="button" class="admin-btn btn btn-light" onClick={() => Delete(product._id)} > Delete</button>      </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>


            <div className="admin-right"><div className="form">
               <p className='list-new'>List New Product</p> 
                <input type="text" onChange={(e) => { setName(e.target.value) }} name='name' placeholder='name' />
                <input type="number" onChange={(e) => { setprice(e.target.value) }} name='price' placeholder='price' />
                <input type="text" onChange={(e) => { setImage(e.target.value) }} name='image' placeholder='image URL' />
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} name='description' placeholder='description' />
                <button onClick={Handlesubmit} type="button" class="btn1 btn btn-outline-dark">Create Product</button>
            </div></div>






        </div>
    )
}

export default Admin