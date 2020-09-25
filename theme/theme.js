import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    },
    typography: {
        h6: {
            fontWeight: 700
        }
    }
})

export default theme
