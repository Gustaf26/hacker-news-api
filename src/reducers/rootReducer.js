const initState = {

    hits: [{title: 'some title', author: 'some author', objectID: 1}]
}


const rootReducer = (state=initState, action) => {

    if (action.type=='SET_IN_REDUCER') {

        return {...state, hits: action.hits}}

    if (action.type=='DELETE_FROM_REDUCER') {

        let id = action.id

        let newHits = state.hits.filter(hit=>id != hit.objectID)

        return {...state, hits: newHits}
    }
}

export default rootReducer