import React, { PureComponent } from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
// import universal from 'react-universal-component'

//
import Routes from 'react-static-routes'
//
import { ApolloProvider } from 'react-apollo'
import client from './connectors/apollo'
import { AppBar } from './components/mui'


class App extends PureComponent {
  componentDidMount () {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
  render () {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div style={{ marginTop: 90 }}>
            <AppBar>
              <Link exact to="/">Home</Link>
              <Link to="/bigcomm">Big Commerce</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/products">Products</Link>
            </AppBar>
            <div className="content">
              <Routes />
            </div>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default hot(module)(App)
