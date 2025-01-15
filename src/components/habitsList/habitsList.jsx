import styles from './habitsList.module.css'
import Modal from '../Modal/Modal'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination'
import HabitsCard from '../habitsCard/habitsCard'
import EditHabitForm from '../Forms/editHabitForm/EditHabitForm'

export default function TransactionList({ habitList, setHabitList, title }) {

    const [editId, setEditId] = useState(0)
    const [isDisplayEditor, setIsDisplayEditor] = useState(false)
    const [currentHabits, setCurrentHabits] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0)

    const handleDelete = (id) => {
        const updatedHabitList = habitList.filter(item => item.id !== id);
        setHabitList(updatedHabitList);

        // Persist the updated habit list to localStorage
        localStorage.setItem("habits", JSON.stringify(updatedHabitList));
    };

    const handleEdit = (id) => {
        setEditId(id)
        setIsDisplayEditor(true)
    }

    useEffect(() => {

        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, habitList.length)

        setCurrentHabits([...habitList].slice(startIndex, endIndex))
        setTotalPages(Math.ceil(habitList.length / maxRecords))

    }, [currentPage, habitList])

    // update page if all items on current page have been deleted
    useEffect(() => {

        if(totalPages < currentPage && currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }

    }, [totalPages])

    return (
        <div className={styles.habitListWrapper}>

            {title && <h2>{title}</h2>}

            {habitList.length > 0 ?
                <div className={styles.list}>
                    <div>
                        {currentHabits.map(habit => (
                            <HabitsCard
                                details={habit}
                                key={habit.id}
                                handleDelete={() => handleDelete(habit.id)}
                                handleEdit={() => handleEdit(habit.id)}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (<Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}
                </div>
                : (
                    <div className={styles.emptyHabitListWrapper}>
                        <p>No Progress to show!</p>
                    </div>
                )
            }


            <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
                <EditHabitForm
                    habitList={habitList}
                    setHabitList={setHabitList}
                    editId={editId}
                    setIsOpen={setIsDisplayEditor}
                />
            </Modal>
        </div>
    )
}