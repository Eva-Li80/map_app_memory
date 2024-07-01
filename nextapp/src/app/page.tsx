
import Loggin from "@/components/Loggin";
import styles from "./home.module.scss";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";
import User from "@/components/User";

export default async function Home() {
  const session = await getServerSession(options)
  return (
    <main className={styles.main}>
      <Header title="PekkaLi memory map app" />
      <h2>Server session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client session</h2>
      <User/>
      <Loggin/>
    </main>
  );
}
