import styles from "../styles/Welcome.module.css";
import Signin from "./Signin";
import SignUp from "./Signup";

const Welcome = () => {
    return (
        <section className={styles.container}>
            <h1>See what's happening</h1>
            <h2>Join Hackatweet today</h2>
            <p> Already have an account</p>
            <SignUp />
            <Signin />
        </section>
    );
};

export default Welcome;
