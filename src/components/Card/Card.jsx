import styles from './Card.module.css';

export default function Card({ title, buttonText, setIsOpenHabit }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>
                {title}
            </h3>
            <button className={styles.cardButton} onClick={() => setIsOpenHabit(true)}>{buttonText}</button>
        </div>
    );
}