import axios from 'axios'
import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { request } from 'graphql-request'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import theme from './src/theme'

const query = `{
  products {
    allProducts
  }
}`

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const {
      products,
    } = await request('https://api.graph.cool/simple/v1/cjiw8gp4k2dyw0149xugcnegh', query)
    console.log(products.allProducts.data[0])
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/bigcomm',
        component: 'src/containers/BigCommerceTest',
      },
      {
        path: '/products',
        component: 'src/containers/Products',
        getData: () => ({ products: products.allProducts.data }),
        children: products.allProducts.data.map(product => ({
          path: `/product/${product.id}`,
          component: 'src/containers/Product',
          getData: () => ({ product }),
        })),
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry()

    // Create a MUI theme instance.
    const muiTheme = createMuiTheme(theme)

    const generateClassName = createGenerateClassName()

    const html = render(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
          <Comp />
        </MuiThemeProvider>
      </JssProvider>
    )

    meta.jssStyles = sheetsRegistry.toString()

    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
              rel="stylesheet"
            />
          </Head>
          <Body>
            {children}
            <style id="jss-server-side">{renderMeta.jssStyles}</style>
          </Body>
        </Html>
      )
    }
  },
}
