import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/styles'
import IconButton from '../general/iconButton'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .header, .action, $content': {
            padding: theme.spacing(3),
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
        '-ms-overflow-style': 'none'
    }
}))

const NoteProcessor = (props) => {
    const classes = useStyles()
    const { noteId, notes } = props
    const [note, setNote] = useState(null)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (noteId) {
            if (noteId !== '') {
                setNote(notes[noteId])
            } else {
                setEditMode(true)
            }
        } else {
            setNote(null)
        }
    }, [noteId])

    return (
        <div className={classes.root}>
            <div className='header'>
                <Typography variant='h5'>{note && note.title}</Typography>
            </div>
            <Divider variant='middle' />
            <div className={classes.content}>
                <Typography variant='body1'>{note && note.content}</Typography>
            </div>
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
                            <IconButton icon='trash-alt' label='Delete' color='secondary' />
                        </>
                        : <IconButton icon='pen' label='Edit' onClick={() => setEditMode(true)} />
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