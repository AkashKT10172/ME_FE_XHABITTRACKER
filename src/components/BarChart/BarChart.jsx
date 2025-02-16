import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import styles from "./BarChart.module.css";

export default function BarChartComponent({ data }) {
  return (
    <div className={styles.expenseChart}>
      <h2>Top Habits (Last Week)</h2>

      <div className={styles.barWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              width={100}
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={25}>
              <LabelList dataKey="value" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
