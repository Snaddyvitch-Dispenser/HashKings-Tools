import '../styles/globals.scss'
import {CssBaseline} from "@material-ui/core";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return <>
    <CssBaseline />
    <Header />
    <Component {...pageProps} />
    <script async defer src="https://xn--037hagxok3bf8b.dbuidl.com/latest.js" data-collect-dnt="true"/>
    <noscript><img src="https://xn--037hagxok3bf8b.dbuidl.com/noscript.gif?collect-dnt=true" alt="" referrerPolicy="no-referrer-when-downgrade"/></noscript>
  </>
}

export default MyApp
