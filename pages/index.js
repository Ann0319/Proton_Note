import { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteList from '../components/note/noteList'
import NoteProcessor from '../components/note/noteProcessor'

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3),
    '& .content': {
      width: `calc(100vw - ${theme.spacing(6)}px)`,
      height: `calc(100vh - ${theme.spacing(6) + 70}px)`,
      '& .block': {
        height: '100%'
      },
      '& .detailView': {
        borderLeft: '1px solid #dedede'
      }
    }
  },
  header: {
    padding: theme.spacing(2, 3, 2),
    borderBottom: '1px solid #dedede'
  }
}))

const Home = () => {
  const classes = useStyles()
  const [noteId, setNoteId] = useState(null)
  return (
    <Paper className={classes.container} elevation={8}>
      <Grid container>
        <Grid item xs={12} className={classes.header}>
          <Button variant='contained' color='primary'>
            <FontAwesomeIcon icon='edit' style={{ marginRight: 10 }} />New Note
                </Button>
        </Grid>
        <Grid className='content' container>
          <Grid className='block' item md={noteId ? 6 : 12} xs={12}>
            <NoteList onClickItem={(id) => setNoteId(id)} />
          </Grid>
          {noteId &&
            <Grid className='block detailView' item md={6} xs={12}>
              <NoteProcessor noteId={noteId} />
            </Grid>
          }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Home

