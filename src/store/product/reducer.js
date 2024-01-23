import { ActionType } from "./action";

export const initialState = {
    products: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.PRODUCTLIST:
            return {
                ...state, ...{ products: action.payload }
            }
        default:
            return state
    }

}

export default reducer