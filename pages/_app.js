import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'

import withReduxStore from '../lib/with-redux-store'

import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme/theme'

import { config, library } from '@fortawesome/fontawesome-svg-core'
// Import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faSave, faTrashAlt, faTimes, faPen, faEdit } from '@fortawesome/free-solid-svg-icons'
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false
library.add(faSave, faTrashAlt, faTimes, faPen, faEdit)

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={reduxStore}>
          <Head>
            {/* Reference: https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
            <title>Proton-Note</title>
          </Head>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    )
  }
}

export default withReduxStore(MyApp)
