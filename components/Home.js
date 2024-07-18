import Image from "next/image";
import styles from "../styles/Home.module.css";
import Welcome from "./Welcome";

function Home() {
    return (
        <div>
            <main className={styles.main}>
                <Image
                    src="/background.png"
                    alt="Image du hackatweet"
                    width={500}
                    height={500}
                />
                <Welcome />
            </main>
        </div>
    );
}

export default Home;
