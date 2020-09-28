import actionTypes from '../actionTypes'
import { getNoteList, updateNoteData, createNewNote, deleteNoteData } from '../../lib/api/note'
import _ from 'lodash'

const initState = {
    notes: null
}

// REDUCERS
export const noteReducer = (state = initState, action) => {
    const { payload, type } = action
    switch (type) {
        case actionTypes.SET_NOTES:
        case actionTypes.CREATE_NOTE:
        case actionTypes.EDIT_NOTE:
        case actionTypes.DELETE_NOTE:
            return {
                ...state,
                notes: payload
            }

        default:
            return state
    }
}

export const getNotes = () => async (dispatch, getState) => {
    // Usually I'll store auth token in userReducer if that token is get from back-end and refresh access token while call api if necessary.
    // Since this App is only a front-end prototype, I didn't take IAM into consideration. 
    // const { user } = getState()
    const notes = await getNoteList()

    if (notes) {
        dispatch({
            type: actionTypes.SET_NOTES,
            payload: notes.reduce((result, current) => {
                return {
                    ...result,
                    [current.id]: current
                }
            }, {})
        })
    }
}

export const updateNote = (noteData, onFinish) => async (dispatch, getState) => {
    if (!noteData) {
        return
    }
    const { id, title, content } = noteData
    const { note } = getState()
    let actionError = null
    try {
        const oldNote = note.notes[id]
        await updateNoteData({
            ...noteData,
            title,
            content
        })
        dispatch({
            type: actionTypes.EDIT_NOTE,
            payload: {
                ...note.notes,
                [id]: {
                    ...oldNote,
                    title,
                    content,
                    updated_at: new Date().toISOString()
                }
            }
        })
    } catch (err) {
        actionError = err
    }

    if (onFinish) {
        onFinish(actionError)
    }
}

export const createNote = (noteData, onFinish) => async (dispatch, getState) => {
    if (!noteData) {
        return
    }
    const { note } = getState()
    let actionError = null
    try {
        const noteId = await createNewNote(noteData)
        dispatch({
            type: actionTypes.CREATE_NOTE,
            payload: {
                ...note.notes,
                [noteId]: {
                    ...noteData,
                    id: noteId,
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                }
            }
        })
    } catch (err) {
        actionError = err
    }

    if (onFinish) {
        onFinish(actionError)
    }
}

export const deleteNote = (noteId, onFinish) => async (dispatch, getState) => {
    if (!noteId) {
        return
    }
    const { note } = getState()
    let actionError = null
    try {
        await deleteNoteData(noteId)
        const newNotes = _.filter(note.notes, (n) => n.id !== noteId)
        dispatch({
            type: actionTypes.DELETE_NOTE,
            payload: newNotes.reduce((result, current) => {
                return {
                    ...result,
                    [current.id]: current
                }
            }, {})
        })
    } catch (err) {
        actionError = err
    }

    if (onFinish) {
        onFinish(actionError)
    }
}