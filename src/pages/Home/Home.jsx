import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import HabitsList from "../../components/habitsList/habitsList";
import HabitForm from "../../components/Forms/HabitForm/HabitForm";
import Modal from "../../components/Modal/Modal";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";

export default function Home() {
  const [habitList, setHabitList] = useState([]);
  const [isOpenHabit, setIsOpenHabit] = useState(false);

  // Load data from localStorage only on initial mount
  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    // console.log("Stored Habits from localStorage:", storedHabits); // Debugging: Log stored data

    if (storedHabits) {
      try {
        const parsedHabits = JSON.parse(storedHabits);
        // console.log("Parsed Habits:", parsedHabits); // Debugging: Log parsed data
        setHabitList(parsedHabits);
      } catch (error) {
        // console.error("Error parsing stored habits, resetting localStorage:", error);
        localStorage.removeItem("habits"); // Clear localStorage on error
        setHabitList([]); // Reset habitList to empty array
      }
    }
  }, []);

  // Update localStorage whenever habitList changes
  useEffect(() => {
    if (habitList.length > 0) {
      // console.log("Saving updated habits to localStorage:", habitList); // Debugging: Log habitList before saving
      localStorage.setItem("habits", JSON.stringify(habitList));
    }
  }, [habitList]);

  // Aggregate the counts of selected options (reading, exercise, meditation)
  const today = new Date();
  const day = today.getDate();

  const getTotalCountsWeekly = () => {
    let readingCount = 0;
    let exerciseCount = 0;
    let meditationCount = 0;

    habitList.forEach(habit => {
      const currentDay = habit.date.slice(8, 10);

      if(day - 7 < currentDay) {
        if (habit.selectedOptions.reading) readingCount++;
        if (habit.selectedOptions.exercise) exerciseCount++;
        if (habit.selectedOptions.meditation) meditationCount++;
      }
    });
    return { readingBar: readingCount, exerciseBar: exerciseCount, meditationBar: meditationCount };
  };
  const getTotalCountsOverall = () => {
    let readingCount = 0;
    let exerciseCount = 0;
    let meditationCount = 0;

    habitList.forEach(habit => {
        if (habit.selectedOptions.reading) readingCount++;
        if (habit.selectedOptions.exercise) exerciseCount++;
        if (habit.selectedOptions.meditation) meditationCount++;
    });
    return { readingPie: readingCount, exercisePie: exerciseCount, meditationPie: meditationCount };
  };
  const { readingBar, exerciseBar, meditationBar } = getTotalCountsWeekly();
  const { readingPie, exercisePie, meditationPie } = getTotalCountsOverall();

  const barChartData = [
    { name: "Reading", value: readingBar },
    { name: "Exercise", value: exerciseBar },
    { name: "Meditation", value: meditationBar },
  ];
  const pieChartData = [
    { name: "Reading", value: readingPie },
    { name: "Exercise", value: exercisePie },
    { name: "Meditation", value: meditationPie },
  ];

  return (
    <div className={styles.container}>
      <h1>Habit Tracker</h1>

      <div className={styles.cardsWrapper}>
        <Card
          title="Update Today's Progress"
          buttonText="+ Add data"
          setIsOpenHabit={setIsOpenHabit}
        />

        <PieChart data={pieChartData} />
        <BarChart data={barChartData} />
      </div>

      <div className={styles.transactionsWrapper}>
        <HabitsList
          habitList={habitList}
          setHabitList={setHabitList}
          title="Recent Habit Completions"
        />
      </div>

      <Modal isOpen={isOpenHabit} setIsOpen={setIsOpenHabit}>
        <HabitForm
          setIsOpen={setIsOpenHabit}
          habitList={habitList}
          setHabitList={setHabitList}
        />
      </Modal>
    </div>
  );
}
