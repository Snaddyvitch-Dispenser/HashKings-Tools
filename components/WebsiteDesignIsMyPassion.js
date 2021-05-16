import styles from "../styles/WebsiteDesignIsMyPassion.module.scss";

export default function WebsiteDesignIsMyPassion() {
    return <div className={styles.outer}>
        <div className={styles.first}><span className={styles.bluePassport}>Website</span></div>
        <div className={styles.second}><span className={styles.bluePassport}>Design</span></div>
        <div className={styles.third}><span className={styles.bluePassport}>is</span></div>
        <div className={styles.fourth}>my</div>
        <div className={styles.fifth}><span className={styles.bluePassport}>passion</span></div>
    </div>;
}