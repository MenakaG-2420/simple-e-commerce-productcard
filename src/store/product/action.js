export const ActionType = {
    PRODUCTLIST: "PRODUCTLIST"
}

export function productitem(payload) {
    return { type: ActionType.PRODUCTLIST, payload: payload }
}