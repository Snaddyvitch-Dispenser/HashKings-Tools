import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>HashKings Tools</title>
                <meta name="description" content="Tools to make playing HashKings Easier" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Complaints</h1>
                <img src={"/shut.png"} alt={"seagull having it's beak closed and being told to shut up"} />
            </main>
        </div>
    )
}
