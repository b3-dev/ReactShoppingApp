const addToCart = product => {
    return {
        type: "ADD_TO_CART",
        product: product
    }
};
const removeFromCart = product => {
    return{
    	 type:"REMOVE_FROM_CART",
    	 product:product
    }
}

const logout =()=>{
    return{
        type:"LOGOUT"
    }
}

const login=()=>{
    return{
        type:"LOGIN"
    }
}
/*const loginUser = auth=>{
    return{
        type:"LOGIN_USER",
        auth:auth
    }
}*/

export {addToCart,removeFromCart,logout,login};