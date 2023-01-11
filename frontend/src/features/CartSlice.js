import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
    cartItems: localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : [],
    cartTotalQuantity: 0,
    CartTotalAmount: 0
};

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTocart(state, action) {

            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info("Incrsed", {
                    position: "bottom-left"
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} Added To Cart`, {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("CartItems", JSON.stringify(state.cartItems))

        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("CartItems",JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} Remove From Cart`, {
                position: "bottom-left",
            });

        },
        DecreseCart(state,action){
            const itemIndex =state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity-=1
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem._id !== action.payload._id
                )
                state.cartItems = nextCartItems;
               
            }
            localStorage.setItem("CartItems",JSON.stringify(state.cartItems))
        },
        Increse(state, action) {

            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
               
            }

            localStorage.setItem("CartItems", JSON.stringify(state.cartItems))

        },
        ClearCart(state,action){
            state.cartItems = [];
            toast.error('Cart Cleared', {
                position: "bottom-left",
            });
            localStorage.setItem("CartItems", JSON.stringify(state.cartItems))
        },
        GetTotal(state,action){
           let {total,quantity} = state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal;
            },{
                total:0,
                quantity:0
            });
            state.cartTotalQuantity = quantity;
            state.CartTotalAmount = total;
        }
    },
});

export const { addTocart,removeFromCart,DecreseCart,Increse ,ClearCart,GetTotal} = CartSlice.actions;
export default CartSlice.reducer;