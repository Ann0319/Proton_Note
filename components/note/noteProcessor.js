import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/styles'
import IconButton from '../general/iconButton'
import Markdown from '../general/markdown'
import Editor from '../general/mdEditor'
import _ from 'lodash'
import { stripIndent, decrypt } from '../../lib/formator'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .header, .action, $content': {
            padding: theme.spacing(2, 3),
            '& .action_right': {
                display: 'flex',
                justifyContent: 'flex-end',
                '& .MuiButton-root': {
                    marginLeft: theme.spacing(4),
                    ':last-of-type': {
                        marginLeft: 0
                    }
                }
            }
        }
    },
    content: {
        height: '100%',
        flexGrow: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar': {
            width: 3,
            backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 2,
            backgroundColor: 'rgba(0, 9, 16, 0.3)'
        },
        '-ms-overflow-style': 'none',
        '& img': {
            width: '100%',
            height: 'auto'
        },
        '& blockquote': {
            marginInlineStart: '20px',
            marginInlineEnd: '20px'
        }
    }
}))

const NoteProcessor = (props) => {
    const classes = useStyles()
    const { noteId, isEditMode, notes } = props
    const [note, setNote] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [decryptedContent, setDecryptedContent] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const titleRef = useRef(null)
    const mdEditor = useRef(null)

    useEffect(() => {
        setEditMode(isEditMode)
    }, [isEditMode])

    useEffect(() => {
        if (noteId && notes) {
            setDecryptedContent(null)
            if (noteId !== '') {
                setNote(notes[noteId])
                setEditMode(false)
                decrypt(notes[noteId].content).then(data => setDecryptedContent(data))
            } else {
                setEditMode(true)
            }
        } else {
            if (!isEditMode) {
                setEditMode(false)
            }
            setNote(null)
            setDecryptedContent(null)
        }
    }, [notes, noteId])

    return (
        <div className={classes.root}>
            <div className='header'>
                {editMode ?
                    <TextField
                        variant='standard'
                        placeholder='Type the title of your note here.'
                        fullWidth
                        value={title}
                        onChange={_.debounce(() => {
                            const { value } = titleRef.current
                            setTitle(value)
                        }, 300)}
                        inputProps={{
                            ref: titleRef
                        }}
                    />
                    : <Typography variant='h6'>{note && note.title}</Typography>
                }
            </div>
            <Divider variant='middle' />
            <div className={classes.content}>
                {editMode ?
                    <Editor
                        ref={mdEditor}
                        value={content}
                        style={{
                            height: '100%'
                        }}
                        onChange={_.debounce(() => {
                            const { value } = mdEditor.current
                            setContent(value)
                        }, 300)}
                        renderHTML={text => <Markdown content={text} />} />
                    : (note && decryptedContent) ?
                        <Markdown content={note && stripIndent(decryptedContent)} />
                        : <Typography>Decrypting...</Typography>
                }
            </div>
            <Divider variant='middle' />
            <Grid container justify='space-between' className='action'>
                {editMode &&
                    <Grid item xs={2} onClick={() => setEditMode(false)}>
                        <IconButton icon='times' label='Cancel' />
                    </Grid>
                }
                <Grid item xs={editMode ? 10 : 12} className='action_right'>
                    {editMode ?
                        <>
                            <IconButton icon='save' label='Save' />
                            {noteId &&
                                <IconButton icon='trash-alt' label='Delete' color='secondary' />
                            }
                        </>
                        : decryptedContent && <IconButton icon='pen' label='Edit' onClick={() => setEditMode(true)} />
                    }
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        notes: state.note.notes
    })
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NoteProcessor)