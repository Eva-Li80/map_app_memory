
import Link from "next/link";
import styles from "./home.module.scss"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     <h1 className={styles.hometitle}>Start sidan</h1>
     <Link href="/user" >Gå till användare</Link>
    </main>
  );
}
