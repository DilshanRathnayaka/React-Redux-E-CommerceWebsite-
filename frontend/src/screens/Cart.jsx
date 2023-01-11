import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import "../CSS/Cart.css"
import { ClearCart, DecreseCart, GetTotal, Increse, removeFromCart } from '../features/CartSlice';


function Cart() {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetTotal())
    }, [cart, dispatch])


    const handleremovefromcart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    };

    const handleDecrese = (cartItem) => {
        dispatch(DecreseCart(cartItem));
    }

    const handleIncrese = (cartItem) => {
        dispatch(Increse(cartItem));
    }

    const handleClearCart = (cartItem) => {
        dispatch(ClearCart(cartItem))
    }
    return (
        <div >

            <div className='shoppingcart-name'>Shopping Cart</div>
            <button class="btn3 btn btn-outline-dark" onClick={() => handleClearCart(cart.cartItem)}>Clear Cart</button>
            <div className='main'>

                <div className='left'>
                    {cart.cartItems.length === 0 ? (
                        <div className="cart-container">
                            <h2 className="cart-container">Shpping Cart Is Empty</h2>
                            <a href="/">Start Shopping</a><i class="fa-solid fa-arrow-right"></i>
                        </div>
                    ) : (
                        <div>
                            {cart.cartItems?.map((cartItem) => (

                                <div className='product' key={cartItem._id}>
                                    <div className="Card ">
                                        <img className='image' src={cartItem.image} alt="" />
                                        <div>
                                            <div className='cart-item-name'> {cartItem.name}</div>
                                            <div className='cart-item-name'>   ${cartItem.price}</div>
                                        </div>
                                    </div>
                                    <div className='product-details'>
                                        <div className='itemname'>
                                        </div>
                                        <div className='increse'>
                                            <div><button type="button" class="btn btn-link" onClick={() => handleDecrese(cartItem)}>-</button></div>
                                            <div className='cartitemq'> {cartItem.cartQuantity}</div>
                                            <div><button type="button" class="btn btn-link" onClick={() => handleIncrese(cartItem)}>+</button></div>
                                        </div>

                                        <i class="fa-solid fa-trash" onClick={() => handleremovefromcart(cartItem)}> </i>
                                    </div>
                                    <div className='totprice'>${cartItem.price * cartItem.cartQuantity}</div>
                                </div>
                            ))}

                        </div>


                    )}
                </div>
                <div className="right">
                    <div className='summury'>Summury</div>
                    <div className='left-tot-price'>
                        <div className='subtotal'>Subtotal</div>
                        <div className='tot-price'>${cart.CartTotalAmount}</div>
                    </div>
                    <div className='tot-button'><button type="button" class="btn1 btn btn-outline-dark">Checkout</button></div>
                </div>
            </div>

        </div>
    )
}

export default Cart