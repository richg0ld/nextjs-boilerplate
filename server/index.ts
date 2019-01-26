import {parse} from 'url'
import {basename, join} from 'path'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as LRUCache from 'lru-cache'
import * as express from 'express'
import * as accepts from 'accepts'
import * as glob from 'glob'
import * as next from 'next'
import api from './api';
import {readFileSync} from "fs";

dotenv.config();

const {PORT, NODE_ENV} = process.env;
const port: number = parseInt(PORT, 10) || 3000
const dev: boolean = NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const server = express()

/**
 * 서버쪽 ts코드들을 빌드할 때 .next/production-server/ 에 빌드가 된다. 해당 path에서 프로젝트 자원에 접근 하려면 개발환경 path와 depth가 차이 나기 때문에 아래코드로 환경에 따라 path경로를 변경시켜준다.
 */
const env_path = dev ? '' : '../'

const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
})

const languages = glob.sync('./lang/*/').map((f) => basename(f))
const statics = glob.sync('./static/**/*.*').map((f) => f.replace('./static', ''))

const localeDataCache = new Map()
const getLocaleDataScript = (locale) => {
    const lang = locale.split('-')[0]
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
        const localeDataScript = readFileSync(localeDataFile, 'utf8')
        localeDataCache.set(lang, localeDataScript)
    }
    return localeDataCache.get(lang)
}

const getMessages = (locale) => {
    return require(`./${env_path}../lang/${locale}`)
}

const getCacheKey = (req) => {
    return `${req.url}`
}

const renderAndCache = async function (req, res, pagePath, queryParams?) {
    if(true) {
        /**
         * 개발환경에서는 캐시 적용 안함.
         */
        app.render(req, res, pagePath, queryParams)
        return
    }
    const key = getCacheKey(req)

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
        console.log('HIT')
        res.setHeader('x-cache', 'HIT')
        res.send(ssrCache.get(key))
        return
    }

    try {
        // If not let's render the page into HTML
        const html = await app.renderToHTML(req, res, pagePath, queryParams)

        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html)
            return
        }

        // Let's cache this page
        ssrCache.set(key, html)
        console.log('MISS')
        res.setHeader('x-cache', 'MISS')
        res.send(html)
    } catch (err) {
        app.renderError(err, req, res, pagePath, queryParams)
    }
}

const setCustomRequest = () => {
    return (req, _res, next) => {
        // Cookies that have been signed
        // console.log('Signed Cookies: ', req.signedCookies)

        const accept = accepts(req)
        const locale = accept.language(languages) || 'en'
        const lang = req.cookies['lang'] || locale
        const theme = req.cookies['theme'] || 'dark'

        req['theme'] = theme
        req['lang'] = lang
        req['locale'] = locale
        req['localeDataScript'] = getLocaleDataScript(lang)
        req['messages'] = getMessages(lang)

        next()
    }
}

app.prepare()
    .then(() => {

        server.use(cookieParser())
        server.use(morgan('dev'))
        server.use(setCustomRequest())

        // api
        server.use('/api', api);

        // Use the `renderAndCache` utility defined below to serve pages
        server.get('/', (req, res) => {
            renderAndCache(req, res, '/')
        });

        server.get('/param/:something', (req, res) => {
            const actualPage = '/param';
            const queryParams = {something: req.params.something};
            renderAndCache(req, res, actualPage, queryParams)
        });

        server.get('*', (req, res) => {
            const parsedUrl = parse(req.url, true)

            if (statics.indexOf(parsedUrl.pathname) > -1) {
                // static 파일 서빙

                const path = join(__dirname, `${env_path}../static`, parsedUrl.pathname)
                app.serveStatic(req, res, path)
            } else {
                return handle(req, res, parsedUrl);
            }
        });

        server.listen(port, (err) => {
            if(err) throw err;
            console.log(`'> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });