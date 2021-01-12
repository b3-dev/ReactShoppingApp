const cartReducer = (state=[] , action) => {

    switch (action.type) {
        case "ADD_TO_CART":
          //  console.log('state..'+state);
           // return 
            //FINDINDEX find index of and object..
            let index =  state.findIndex(product => product.id_articulo === action.product.id_articulo && product.size==action.product.size)
            console.log('index filtrado=>'+index)
            if(index>=0){
                /**/
                console.log('quantity'+action.product.cuantity);
                state[index].cuantity += action.product.cuantity;
                state[index].price = action.product.price* state[index].cuantity;
                console.log('stateConcatenar'+JSON.stringify(state[index]));
                return state.concat([]);
                //return [ ...state[index].cuantity,action.product.cuantity];
            }
            else{
                console.log('no existe..')
                return [ ...state,action.product];
            } 
            
           /* if( index.id_articulo ){

                return this.setState((state) => {
                    // Importante: lee state en vez de this.state al actualizar.
                     return {cuantity: product.cuantity + 1}
                 });
                //return console.log('index'+JSON.stringify(index));

                console.log('index'+JSON.stringify(index));
            }*/
                
          //  index &&  index.size==action.product.size ? console.log('existe sumarle 1..'):'no existe, agregarlo';
               // console.log('index'+JSON.stringify(index));
           
            //  cart: state.cart.concat(action.product),
        case "REMOVE_FROM_CART":
            //let index = action.product;
            //remove just items equals to productId and sizeId
            console.log('action'+JSON.stringify(action));
            return  state.filter(product => product !== state[action.product]);
            
       
        case "LOGOUT" :
            console.log('reducer..logout..')
        return  state
           
        
        case "LOGIN" :
            console.log('reducer..login..')
        return  state

        default:
            return state;



    }

}

export default cartReducer;
