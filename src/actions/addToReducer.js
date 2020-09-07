export const addToReducer = (hits) => {

    return {
        type: 'SET_IN_REDUCER',
        hits: hits
    }
}