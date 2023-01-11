import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllProductsQuery } from '../features/productAPI'
import axios from 'axios'
import "../CSS/Product.css"
import { useDispatch } from 'react-redux'
import { addTocart } from '../features/CartSlice'

function Product() {
  const { data} = useGetAllProductsQuery()
  const dispatch = useDispatch();
  const [list, setList] = useState([])
 const params = useParams();
 useEffect(() => {
  axios.get(`/api/Product/${params.id}`).then((res)=>{
    setList(res.data)
  })
 }, [])
 
 const addtocart = (list) => {
  dispatch(addTocart(list));
}
  

  return (
    <div className='product-main'>
      <div className='product-image'>
        <img className='product-image1' src={list.image} alt="" />
      </div>
      <div className="product-right" key={list._id}>
       <h1 className='p-name'>{list.name}</h1>
         <h3 className='p-price'>Price :${list.price}</h3>
         <p className='p-desc'>{list.description}</p>
         <div className='btn1-class'>  <button class="btn1 btn btn-outline-dark" onClick={() => addtocart(list)}>Add To Cart</button></div>
       
      </div>
    </div>
  )
}

export default Product