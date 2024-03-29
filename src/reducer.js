export const initialState = {
    basket: [],
    user: null,
}; 

export const getBasketTotal = (basket) => 
    basket?.reduce((amount,item) => item.price + amount, 0) ;


const reducer = (state, action) => {
    switch(action.type) {
        case 'add-to-basket':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case 'remove-from-basket':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket] ;
            if(index >= 0) {
                newBasket.splice(index,1) ;
            }else {
                console.warn(
                    'Cant remove product (id: ${action.id}) as its not in the basket!'
                )
            }
            return {
                ...state,
                basket: newBasket 
            } ;
        case 'empty-basket':
            return {
                ...state,
                basket: []
            }
        case 'set-user':
            return {
                ...state,
                user: action.user 
            }
        default:
            return state ;
    }
};

export default reducer ;