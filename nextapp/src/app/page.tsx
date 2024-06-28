
import Loggin from "@/components/Loggin";
import styles from "./home.module.scss";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header title="PekkaLi memory map app" />
      <Loggin/>
    </main>
  );
}
