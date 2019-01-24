import * as React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface IDocument {
    lang: string;
    locale: string;
    styleTags
    localeDataScript: string;
}

const {CDN_URL} = process.env;

export default class extends Document<IDocument> {
  static async getInitialProps (context) {
    const sheet = new ServerStyleSheet()
    const props = await super.getInitialProps(context)
    const {req: {lang, localeDataScript}, renderPage} = context
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return {
      ...props,
      ...page,
      styleTags,
      lang,
      localeDataScript
    }
  }

  render () {
    const {lang} = this.props;
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${lang}`

    return (
      <html lang={lang}>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="icon" type="image/x-icon" href={`${CDN_URL}/favicon.ico`} />
            {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
              dangerouslySetInnerHTML={{
                  __html: this.props.localeDataScript
              }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
