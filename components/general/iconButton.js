import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IButton = withStyles(theme => ({
    root: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        minWidth: 'unset',
        padding: 0,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& div': {
            fontSize: '1.4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
                marginBottom: theme.spacing(0.5)
            },
            '& .MuiTypography-caption': {
                lineHeight: 1
            }
        }
    }
}))(Button)

const IconButton = (props) => {
    const { icon, label, onClick, color } = props

    return (
        <IButton variant='outlined' onClick={onClick} color={color}>
            <div>
                <FontAwesomeIcon icon={icon} />
                <Typography variant='caption' component='span'>
                    {label}
                </Typography>
            </div>
        </IButton>
    )
}

export default React.memo(IconButton)

