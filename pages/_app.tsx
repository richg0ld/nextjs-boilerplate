import App, { Container } from 'next/app'
import React from 'react'
import { IntlProvider, addLocaleData } from "react-intl";
import NProgress from "nprogress";
import Router from "next/router";
import { Provider, connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '../store'
import { fromJS } from 'immutable'
import ThemeProvider from "../contexts/ThemeProvider";
import Cookies from 'js-cookie';
import moment from "moment";

declare global {
    interface Window {
        ReactIntlLocaleData: any;
        __NEXT_DATA__: any;
    }
}

if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface IApp {
    store,
    locale: string;
    messages,
    lang: string;
    theme: string;
    chat: string;
}

class MyApp extends App<IApp> {
  static async getInitialProps ({ Component, ctx }) {
      /**
       * @TODO: api, redux 연동 예시 작업 필요.
       */
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {}

    const { req, isServer } = ctx;
    const { lang, locale, messages, theme } = req || window.__NEXT_DATA__.props.initialProps;

    return { pageProps, lang, locale, messages, theme, isServer };
  }

  componentDidMount() {
    const {lang} = this.props;
    Cookies.set("lang", lang);
  }
  render() {
    const { Component, pageProps, store, lang, locale, messages, theme } = this.props;

    moment.locale(lang);

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <IntlProvider locale={lang} messages={messages}>
                    <Provider store={store}>
                        <Component {...pageProps} lang={lang} locale={locale} />
                    </Provider>
                </IntlProvider>
            </ThemeProvider>
        </Container>
    );
  }
}

/**
 * immutable을 사용 할 경우 withRedux에 createStore, 뿐만 아니라 serializeState, deserializeState도 세팅해줘야 한다.
 */
export default withRedux(createStore, {
    serializeState: state => state.toJS(),
    deserializeState: state => fromJS(state),
})(withReduxSaga({ async: true })(connect()(MyApp)))