import actionTypes from '../actionTypes'

const initState = {
    notes: {
        1: {
            id: 1,
            title: 'This is first note.',
            content: 'This is content of first note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        2: {
            id: 2,
            title: 'This is second note.',
            content: 'This is content of second note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        3: {
            id: 3,
            title: 'This is third note.',
            content: 'This is content of third note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        4: {
            id: 4,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        5: {
            id: 5,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        6: {
            id: 6,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        7: {
            id: 7,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        8: {
            id: 8,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        9: {
            id: 9,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        10: {
            id: 10,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        11: {
            id: 11,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        12: {
            id: 12,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        13: {
            id: 13,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        14: {
            id: 14,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        15: {
            id: 15,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 18:00:00'
        },
        16: {
            id: 16,
            title: 'This is fourth note.',
            content: 'This is content of fourth note',
            created_at: '2020/09/29 18:00:00',
            updated_at: '2020/09/29 20:00:00'
        }
    }
}

// REDUCERS
export const noteReducer = (state = initState, action) => {
    const { payload, type } = action
    switch (type) {
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