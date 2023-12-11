import React from 'react'
import useAdminReports from '@/hooks/useAdminReports';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const hardCodedData = [
   {
      day: "Sun",
      // visit: 2,
      comment: 9,
      favorite: 0,
   },
   {
      day: "Mon",
      // visit: 5,
      comment: 2,
      favorite: 1,
   },
   {
      day: "Tue",
      // visit: 7,
      comment: 3,
      favorite: 2,
   },
   {
      day: "Wed",
      visit: 22,
      comment: 7,
      favorite: 3,
   },
   {
      day: "Thu",
      // visit: 12,
      comment: 5,
      favorite: 1,
   },
   {
      day: "Fri",
      // visit: 10,
      comment: 10,
      favorite: 2,
   },
   {
      day: "Sat",
      // visit: 30,
      comment: 20,
      favorite: 4,
   },
]

const Chart = () => {
   const { data: weeklyData, error, mutate, isLoading } = useAdminReports();

  return (
    <div className="chart-container">
      <h2 className="chart-title">Weekly Recap</h2>
      <ResponsiveContainer width="92%" height="90%">
        <LineChart width={500} height={300} data={weeklyData || hardCodedData} margin={{ top: 5, right: 25, left: 15, bottom: 15 }}>
          <CartesianGrid strokeDasharray="5 10" opacity={0.25} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#fdfafa", opacity: "0.85" }} />
          <Legend wrapperStyle={{ marginLeft: "30px", paddingTop: "25px"}}/>
          {/* <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" name="Visits" /> */}
          <Line type="monotone" dataKey="comment" stroke="#82ca9d" strokeDasharray="3 4 5 2" name="Comments" />
          <Line type="monotone" dataKey="favorite" stroke="#ff6262" strokeDasharray="2 4" name="Favorites" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart