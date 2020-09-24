import actionTypes from '../actionTypes'
import { getNoteList } from '../../lib/api/note'

const initState = {
    notes: null
}

// REDUCERS
export const noteReducer = (state = initState, action) => {
    const { payload, type } = action
    switch (type) {
        case actionTypes.SET_NOTES:
            return {
                ...state,
                notes: payload
            }
        case actionTypes.CREATE_NOTE:
            return

        case actionTypes.EDIT_NOTE:
            return

        case actionTypes.DELETE_NOTE:
            return

        default:
            return state
    }
}

export const initNotes = () => async (dispatch, getState) => {
    const notes = await getNoteList()

    if (notes) {
        dispatch({
            type: actionTypes.SET_NOTES,
            payload: notes
        })
    }
}