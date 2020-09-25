import { get, post, put, Delete } from './request'
import { v4 as uuidv4 } from 'uuid'

export const getNoteList = (auth) => {
    // if (!auth) {
    //     return
    // }

    // const response = get('urlToGetNoteList', null, auth)
    // return response

    // const codeContent = ```
    // const useResizeDetect = (ref) => {
    //     const handleResize = () => {
    //         if (ref.current) {
    //             setElementWidth(labelElement.current.clientWidth)
    //         }
    //     }

    //     useEffect(() => {
    //         window.addEventListener('resize', handleResize)
    //         return () => {
    //             window.removeEventListener('resize', handleResize)
    //         }
    //     })
    // }

    // const itemRef = useRef(null)
    // useResizeDetect(itemRef)
    // ```

    return [
        {
            id: uuidv4(),
            title: 'Note with italic and bold font style.',
            content: `
            _This is a sentence with italic font style._\n
            ** This is a sentence with bold font style. **
            `,
            created_at: '2020-07-16T02:11:00.682060',
            updated_at: '2020-07-16T02:11:00.682079'
        },
        {
            id: uuidv4(),
            title: 'Note with h1, h2, h3, h4, h5, h6.',
            content: `
            # This is an H1.
            ## This is an H2.
            ### This is an H3.
            #### This is an H4.
            ##### This is an H5.
            ###### This is an H6.
            `,
            created_at: '2020-07-16T02:13:00.682060',
            updated_at: '2020-07-16T02:13:00.682060'
        },
        {
            id: uuidv4(),
            title: 'Note with numbered list.',
            content: `
            1.    First list item.
            2.  Second list item.
            3.  Third list item.
            4.  Fourth list item.`,
            created_at: '2020-07-16T02:14:00.682060',
            updated_at: '2020-07-16T02:14:00.682079'
        },
        {
            id: uuidv4(),
            title: 'Note with bulleted list.',
            content: `
            +    First list item.
            *  Second list item.
            -  Third list item.
            +  Fourth list item.
            `,
            created_at: '2020-07-16T02:15:00.682060',
            updated_at: '2020-07-16T02:15:00.682079'
        },
        {
            id: uuidv4(),
            title: 'Content of this note is mixed with blockquote, code and image.',
            content: `
            # Mixed content
            > This is the first level of quoting.
            >
            > > This is nested blockquote.
            >
            > Back to the first level.

            This is [an example][id] reference-style link.
            [id]: https://www.mylifeorganized.net/support/notes-formatting-with-Markdown/#more "Notes formatting with Markdown"
            `,
            created_at: '2020-07-16T02:11:00.682060',
            updated_at: '2020-07-16T02:11:00.682079'
        }
    ]
}