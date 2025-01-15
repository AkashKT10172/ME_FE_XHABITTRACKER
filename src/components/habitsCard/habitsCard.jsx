import styles from './habitsCard.module.css'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

export default function HabitsCard({ details, handleDelete, handleEdit }) {
    // console.log(details);
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardInfo}>
                    <h5>{details.description}</h5>
                    <p>{(details.selectedOptions.reading === true) ? "Reading" : ""}
                            &nbsp; {(details.selectedOptions.exercise === true) ? "Exercise" : ""}
                            &nbsp; {(details.selectedOptions.meditation === true) ? "Meditation" : ""}
                    </p>
                </div>
            </div>

            <div className={styles.cardInner}>
                <p className={styles.cardPrice}>{details.date}</p>
                <div className={styles.cardButtonWrapper}>
                    <button className={styles.cardDelete} onClick={handleDelete}>
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className={styles.cardEdit} onClick={handleEdit}>
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>

        </div>
    )
}