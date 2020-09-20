import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    }
})

export default theme
