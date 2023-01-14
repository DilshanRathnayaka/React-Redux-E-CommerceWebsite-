import React, { useState, useEffect } from 'react'
import { useGetAllProductsQuery } from '../features/productAPI'
import "../CSS/Homescreen.css"
import { useDispatch } from 'react-redux'
import { addTocart } from '../features/CartSlice'
import axios from 'axios'

function Homescreen() {
  const { data, error, isLoading } = useGetAllProductsQuery()
  const dispatch = useDispatch();
  const [filteredproduct, setFilteredproduct] = useState([]);
  const [searchinput, setSearchinput] = useState("")
  const [productlist, setProductlist] = useState(data)

  useEffect(() => {
    axios.get('/api/Product').then((res) => {
      setProductlist(res.data)
    })
  }, [])

  const addtocart = (product) => {
    dispatch(addTocart(product));
  }

  const searchItems = (searchValue) => {
    setSearchinput(searchValue);
    if (searchinput !== "") {
      const filteredData = productlist.filter((list) => {
        return Object.values(list.name)
          .join("")
          .toLowerCase()
          .includes(searchinput.toLowerCase());
      });
      console.log(filteredData);
      setFilteredproduct(filteredData);
    } else {
      setFilteredproduct(productlist);
    }
  };



  return (
    <div className='main-home-container'>
      <div className="search-head">
        <input className='home-input' type="search" placeholder='Search' onChange={(e) => searchItems(e.target.value)} name="searchitem" />
      </div>

      <div className='main-home' >
        {isLoading ? (<p>Loading</p>) : error ? (<p>An Error Occured</p>) : (
          <>
            {searchinput.length > 1 ? filteredproduct.map((product) => {
              return (
                
                <div class="card" key={product._id}>
                 <a href="#"> <img src={product.image} alt="image" className='img-fluid' /></a>
                 
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <button type="button" class="btn1 btn btn-outline-dark" onClick={() => addtocart(product)}>Add To Cart</button>
                  </div>
                </div>

              )
            }) :

              data?.map(product =>
                <div class="card" key={product._id}>
                 <a href={`/Product/${product._id}`}><img src={product.image} alt="" className='img-fluid' /></a> 
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <button type="button" class="btn1 btn btn-outline-dark" onClick={() => addtocart(product)}>Add To Cart</button>
                  </div>
                </div>
              )}

          </>
        )}

      </div>
    </div>



  )





}

export default Homescreen