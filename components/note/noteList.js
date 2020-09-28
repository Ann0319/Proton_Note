import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import EllipsisText from '../general/ellipsis'
import { makeStyles, withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { getNotes } from '../../redux/reducers/note'
import _ from 'lodash'
import { dateTime }  from '../../lib/time'

const CustomList = withStyles({
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
})(List)

const CutomListItem = withStyles(theme => ({
    root: {
        borderBottom: '1px solid #dedede',
        '&:last-of-type': {
            borderBottom: 'none'
        },
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        '.selected&': {
            backgroundColor: '#dddfec'
        }
    }
}))(ListItem)

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(0.2),
        marginBottom: theme.spacing(0.2),
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

const NoteList = (props) => {
    const classes = useStyles()
    const { noteId, notes, getNotes, onClickItem } = props
    const [currentNoteId, setCurrentNoteId] = useState(noteId || null)
    const [noteList, setNoteList] = useState(null)

    useEffect(() => {
        setCurrentNoteId(noteId)
        if (notes) {
            if (!notes[noteId]) {
                Router.push({
                    pathname: '/',
                })
            }
            const list = Object.values(notes)
            const orderedNotes = _.orderBy(list, ['updated_at'], ['desc'])
            setNoteList(orderedNotes)
        } else {
            getNotes()
        }
    }, [notes, noteId])

    const handleItemClick = (id) => {
        if (id === currentNoteId) {
            Router.push({
                pathname: '/',
            })
            setCurrentNoteId(null)
            onClickItem(null)
        } else {
            Router.push({
                pathname: '/',
                query: {
                    noteId: id
                }
            })
            setCurrentNoteId(id)
            onClickItem(id)
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <CustomList>
                    {noteList && noteList.map(l => (
                        <CutomListItem
                            className={l.id === currentNoteId ? 'selected' : null}
                            key={l.id} button
                            onClick={() => {
                                handleItemClick(l.id)
                            }}>
                            <ListItemText
                                primaryTypographyProps={{
                                    style: { fontWeight: 'bold' }
                                }}
                                primary={<EllipsisText>{l.title}</EllipsisText>}
                                secondary={`Updated at: ${dateTime(l.updated_at)}`} />
                        </CutomListItem>
                    ))}
                </CustomList>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        notes: state.note.notes
    })
}

const mapDispatchToProps = {
    getNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NoteList))