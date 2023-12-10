import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
   {
      name: "Sun",
      visit: 4000,
      click: 2400,
   },
   {
      name: "Mon",
      visit: 3000,
      click: 1398,
   },
   {
      name: "Tue",
      visit: 2000,
      click: 3800,
   },
   {
      name: "Wed",
      visit: 2780,
      click: 3908,
   },
   {
      name: "Thu",
      visit: 1890,
      click: 4800,
   },
   {
      name: "Fri",
      visit: 2390,
      click: 3800,
   },
   {
      name: "Sat",
      visit: 3490,
      click: 4300,
   },
]

const Chart = () => {
  return (
    <div className="chart-container">
      <h2 className="chart-title">Weekly Recap</h2>
      <ResponsiveContainer width="92%" height="90%">
        <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 25, left: 15, bottom: 15 }}>
          <CartesianGrid strokeDasharray="5 10" opacity={0.25} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#fdfafa", opacity: "0.85" }} />
          <Legend wrapperStyle={{ marginLeft: "30px", paddingTop: "25px"}}/>
          <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart