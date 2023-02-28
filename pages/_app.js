import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
  <Head>
   <meta name="google-site-verification" content="gyVaz2OoScHGNTlVrtWiGtAn6CzofalUBqScikrvwqg" />
  </Head>
  <Component {...pageProps} /></>
}

export default MyApp
