import React from 'react'
import { Layout } from '@components';
import styles from '../styles/about.module.scss'
import Head from 'next/head';
export default function about() {
  return (
    
    <Layout>
    <Head>
        <title>About Me</title>
        <link rel="shortcut icon" href="/cardverse.png" />

    </Head>
    <div className={styles.AboutPage}>

        <div className={styles.content}>
            <h1 className="text-2xl font-bold">About</h1>
            <div className={styles.text}>
            
            <p>I developed a straightforward application to exhibit a set of Marvel cards dating back to 1990. Given my childhood passion for these cards, I aimed to craft an uncomplicated app that not only presents the collection but also integrates a custom API. Additionally, I leveraged the Marvel API to seamlessly present details like images, biographies, and comic affiliations. </p>
            </div>
        </div>
        
    
    </div>

    </Layout>
  )
}
