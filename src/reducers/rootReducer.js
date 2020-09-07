const initState = {

    hits: [{title: 'some title', author: 'some author', objectID: 1}]
}


const rootReducer = (state=initState, action) => {

    if (action.type=='SET_IN_REDUCER') {

        return {...state, hits: action.hits}}

    if (action.type=='DELETE_FROM-REDUCER') {

        let id = action.id

        return {...state, hits: action.hits.filter(hit=>hit.id != id)}
    }
}

export default rootReducer