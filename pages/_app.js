import '../styles/globals.scss'
import {CssBaseline} from "@material-ui/core";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return <>
    <CssBaseline />
    <Header />
    <Component {...pageProps} />
  </>
}

export default MyApp
