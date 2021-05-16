import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import WebsiteDesignIsMyPassion from "../components/WebsiteDesignIsMyPassion";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HashKings Tools</title>
        <meta name="description" content="Tools to make playing HashKings Easier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Tools For HashKings</h1>
        <WebsiteDesignIsMyPassion />
      </main>
    </div>
  )
}
