export const initialState = {
    cart: [],
    shippingData: {}
}

export const actionsTypes = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_SHIPPINGDATA: "SET_SHIPPINGDATA"
}

export const getTotalLenght = (cart) => {
    return( 
        cart?.reduce((acc,item) => item.quantity+ acc, 0))
}

export const getTotalCart = (cart) => {
    return(
        cart?.reduce((acc,item) => (item.price * item.quantity)+ acc, 0)
    )
}


const reducer = (state,action) => {
    switch(action.type){
        case "ADD_TO_CART":
            let item = state.cart.find(cartItem => cartItem.id === action.item.id)
            if (item) {
                item.quantity += 1
                return {...state}
            }
            else {
                let quantity = 1
                action.item = {...action.item, quantity}
                return{
                    ...state,
                    cart: [...state.cart, action.item]
                }
            }

        case "REMOVE_ITEM":
            console.log("case")
            const indexRemove = state.cart.findIndex(cartItem => cartItem.id === action.id)
            let newCart = [...state.cart]
            if (indexRemove >= 0) {
                newCart.splice(indexRemove,1)
            } else {
                console.log("no se puede eliminar el producto")
            }
            return{
                 ...state,
                 cart: newCart
            }
        case "SET_SHIPPINGDATA":
            return {
                ...state,
                shippingData: action.shippingData,
            }
            
        default: return state
        
            
    }

}
export default reducer