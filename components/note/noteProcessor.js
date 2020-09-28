import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'
import IconButton from '../general/iconButton'
import Markdown from '../general/markdown'
import Editor from '../general/mdEditor'
import _ from 'lodash'
import { stripIndent, decrypt, encrypt } from '../../lib/formator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateNote, createNote, deleteNote } from '../../redux/reducers/note'
import Router from 'next/router'

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
    },
    processingWrap: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .indicatorWrap': {
            position: 'relative',
        },
        '& .indicator': {
            fontSize: theme.spacing(3),
            width: theme.spacing(8),
            height: theme.spacing(8),
            borderRadius: '50%',
            backgroundColor: theme.palette.grey[200],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& .progressor': {
            position: 'absolute',
            top: -5,
            left: -5,
            zIndex: 1
        }
    }
}))

const NoteProcessor = (props) => {
    const classes = useStyles()
    const { noteId, isEditMode, onCancel, notes, updateNote, createNote, deleteNote } = props
    const [editMode, setEditMode] = useState(false)
    const [decrypted, setDecrypted] = useState(false)
    const [note, setNote] = useState(null)
    const [title, setTitle] = useState('')
    const [defaultContent, setDefaultContent] = useState('')
    const [content, setContent] = useState('')
    const [inValidTitle, setInvalidTitle] = useState(false)
    const titleRef = useRef(null)
    // const mdEditor = useRef(null)

    useEffect(() => {
        setEditMode(isEditMode)
    }, [isEditMode])

    useEffect(() => {
        if (noteId && notes) {
            setDecrypted(false)
            if (noteId !== '') {
                const currentNote = notes[noteId]
                if (currentNote) {
                    setNote(currentNote)
                    setTitle(currentNote.title)
                    setEditMode(false)
                    decrypt(currentNote.content).then(data => {
                        setDecrypted(true)
                        setDefaultContent(data)
                        setContent(data)
                    })
                }
            } else {
                setEditMode(true)
            }
        } else {
            if (!isEditMode) {
                setEditMode(false)
            }
            if (titleRef.current) {
                titleRef.current.value = ''
            }
            setNote(null)
            setTitle('')
            setContent('')
        }
    }, [notes, noteId])

    const handleCancel = () => {
        if (note) {
            setTitle(note.title)
            setContent(defaultContent)
        } else {
            if (onCancel) {
                onCancel()
            }
        }
        setEditMode(false)
    }

    const handleSave = () => {
        if (noteId) {
            if (content !== defaultContent) {
                encrypt(content).then(data => {
                    updateNote({
                        id: noteId,
                        title: title === '' ? note.title : title,
                        content: data
                    }, (err) => {
                        if (!err) {
                            setEditMode(false)
                        }
                    })
                })
            } else {
                updateNote({
                    id: noteId,
                    title: title === '' ? note.title : title,
                    content: note.content
                }, (err) => {
                    if (!err) {
                        setEditMode(false)
                    }
                })
            }
        } else {
            if (title === '') {
                setInvalidTitle(true)
                return
            }
            encrypt(content).then(data => {
                createNote({
                    title,
                    content: data
                }, (err) => {
                    if (!err) {
                        setEditMode(false)
                        if (onCancel) {
                            onCancel()
                        }
                    }
                })
            })
        }
    }

    return (
        <div className={classes.root}>
            <div className='header'>
                {editMode ?
                    <TextField
                        variant='standard'
                        placeholder='Type the title of your note here.'
                        fullWidth
                        defaultValue={title}
                        onChange={_.debounce(() => {
                            const { value } = titleRef.current
                            setTitle(value)
                        }, 300)}
                        inputProps={{
                            ref: titleRef
                        }}
                        onFocus={() => setInvalidTitle(false)}
                        error={inValidTitle}
                        autoFocus
                        required
                    />
                    : <Typography variant='h6'>{title}</Typography>
                }
            </div>
            <Divider variant='middle' />
            <div className={classes.content}>
                {editMode ?
                    <Editor
                        // ref={mdEditor}
                        value={stripIndent(content)}
                        style={{
                            height: '100%'
                        }}
                        // Abandon this method because forwardRef failed at some point
                        // onChange={_.debounce(() => {
                        //     const {value} = mdEditor.current
                        //     setContent(value)
                        // })}
                        onChange={({ text }) => {
                            setContent(text)
                        }}
                        renderHTML={text => <Markdown content={text} />} />
                    : (content !== null && decrypted) ?
                        <Markdown content={stripIndent(content)} />
                        : <div className={classes.processingWrap}>
                            <div className='indicatorWrap'>
                                <div className='indicator'>
                                    <FontAwesomeIcon icon='unlock-alt' />
                                </div>
                                <CircularProgress className='progressor' color='primary' size={75} />
                            </div>
                        </div>
                }
            </div>
            <Divider variant='middle' />
            <Grid container justify='space-between' className='action'>
                {editMode &&
                    <Grid item xs={2}>
                        <IconButton icon='times' label='Cancel'
                            onClick={handleCancel} />
                    </Grid>
                }
                <Grid item xs={editMode ? 10 : 12} className='action_right'>
                    {editMode ?
                        <>
                            <IconButton icon='save' label='Save' onClick={handleSave} />
                            {noteId &&
                                <IconButton icon='trash-alt' label='Delete' color='secondary'
                                    onClick={() => deleteNote(noteId, (err) => {
                                        if (!err) {
                                            setEditMode(false)
                                        }
                                    })}
                                />
                            }
                        </>
                        : decrypted && <IconButton icon='pen' label='Edit' onClick={() => setEditMode(true)} />
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
    updateNote,
    createNote,
    deleteNote
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteProcessor)