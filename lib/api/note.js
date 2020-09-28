import { get, post, put, Delete } from './request'
import { v4 as uuidv4 } from 'uuid'

export const getNoteList = async (auth) => {
    // if (!auth) {
    //     return
    // }

    // const response = get('urlToGetNoteList', null, auth)
    // return response

    // Mock return data.
    return [
        {
            id: 'c758c63b-5dbe-4e1f-becc-00cd1a3668a3',
            title: 'Note with italic and bold font style.',
            content: `
            _This is a sentence with italic font style._\n
            ** This is a sentence with bold font style. **
            `,
            created_at: '2020-07-16T02:11:00.682Z',
            updated_at: '2020-07-16T02:11:00.682Z'
        },
        {
            id: '726df3ff-c4a2-4b00-a22d-429353004fd1',
            title: 'Note with h1, h2, h3, h4, h5, h6.',
            content: `
            # This is an H1.
            ## This is an H2.
            ### This is an H3.
            #### This is an H4.
            ##### This is an H5.
            ###### This is an H6.
            `,
            created_at: '2020-07-16T02:13:00.682Z',
            updated_at: '2020-07-16T02:13:00.682Z'
        },
        {
            id: '0437b7bc-52cd-450d-946f-7420e7b06963',
            title: 'Note with numbered list.',
            content: `
            1.    First list item.
            2.  Second list item.
            3.  Third list item.
            4.  Fourth list item.`,
            created_at: '2020-07-16T02:14:00.682Z',
            updated_at: '2020-07-16T02:14:00.682Z'
        },
        {
            id: '38ef1890-4219-415f-9b4c-b0de2f701c93',
            title: 'Note with bulleted list.',
            content: `
            +    First list item.
            *  Second list item.
            -  Third list item.
            +  Fourth list item.
            `,
            created_at: '2020-07-16T02:15:00.682Z',
            updated_at: '2020-07-16T02:15:00.682Z'
        },
        {
            id: '9a8e6cc9-cd92-40f9-93fe-cc0e7523ee4c',
            title: 'Content of this note is mixed with blockquote, code and image.',
            content: `
            # Mixed content
            \`\`\`
            const useResizeDetect = (ref) => {
                const handleResize = () => {
                    if (ref.current) {
                        setElementWidth(labelElement.current.clientWidth)
                    }
                }
                useEffect(() => {
                    window.addEventListener('resize', handleResize)
                    return () => {
                        window.removeEventListener('resize', handleResize)
                    }
                })
            }
            const itemRef = useRef(null)
            useResizeDetect(itemRef)
            \`\`\`

            > This is the first level of quoting.
            >
            > > This is nested blockquote.
            >
            > Back to the first level.

            This is [an example][id] reference-style link.
            [id]: https://www.mylifeorganized.net/support/notes-formatting-with-Markdown/#more "Notes formatting with Markdown"
            ![bear](https://bit.ly/3kPmKAv)
            `,
            created_at: '2020-07-16T02:11:00.682Z',
            updated_at: '2020-07-16T02:11:00.682Z'
        }
    ]
}

export const updateNoteData = async (data, auth) => {
    if (!data
        // || !auth
        ) {
        return
    }

    // const response = await put(`urlToUpdateNote/${data.id}`, {
    //     title: data.title,
    //     content: data.content
    // }, auth)
    // return response

    // Usually backend will return 204 when update successfully.
    return
}

export const createNewNote = async (data, auth) => {
    if (!data
        // || !auth
        ) {
        return
    }

    // const response = await post(`urlToCreateNote`, {
    //     title: data.title,
    //     content: data.content
    // }, auth)
    // return response

    // Usually backend will return id of note when update successfully.
    return uuidv4()
}

export const deleteNoteData = async (noteId, auth) => {
    if (!noteId
        // || !auth
        ) {
        return
    }

    // const response = await Delete(`urlToDeleteNote/${noteId}`, null, auth)
    // Usually backend will return 204 when update successfully.
    return
}