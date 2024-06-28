import React from 'react'
import styles from "./loggin.module.scss"
import Link from 'next/link'

const Loggin = () => {
  return (
    <div className={styles.loggin}>
      logga in
      <Link href="/user">Gå till användare</Link>
    </div>
  )
}

export default Loggin
