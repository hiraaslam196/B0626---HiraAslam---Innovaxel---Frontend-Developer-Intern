import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { CATEGORY_COLORS } from '../utils/helpers'
import styles from './Charts.module.css'

const fmt = (v) => 'PKR ' + Number(v).toLocaleString('en-PK', { maximumFractionDigits: 0 })

export default function Charts({ catTotals, monthlyTrend }) {
  const pieData = Object.entries(catTotals).map(([name, value]) => ({ name, value }))
  const hasData = pieData.length > 0

  return (
    <div className={styles.grid}>
      {/* Pie / Doughnut */}
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>By Category</div>
        {hasData ? (
          <ResponsiveContainer width='100%' height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx='50%' cy='50%'
                innerRadius={55} outerRadius={85}
                paddingAngle={3}
                dataKey='value'
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#9ca3af'} stroke='transparent' />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [fmt(v), '']}
                contentStyle={{ background: '#22222c', border: '1px solid #2e2e3a', borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: '#f0eee8' }}
                labelStyle={{ color: '#7a7a8c' }}
              />
              <Legend
                iconType='circle'
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: '#7a7a8c', fontFamily: "'DM Sans', sans-serif" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className={styles.noData}>No data yet</div>
        )}
      </div>

      {/* Bar – monthly */}
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>Monthly Trend</div>
        <ResponsiveContainer width='100%' height={220}>
          <BarChart data={monthlyTrend} barSize={28}>
            <CartesianGrid strokeDasharray='3 3' stroke='#2e2e3a' vertical={false} />
            <XAxis dataKey='label' tick={{ fill: '#7a7a8c', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => 'PKR ' + (v >= 1000 ? (v/1000).toFixed(0)+'k' : v)} tick={{ fill: '#7a7a8c', fontSize: 10 }} axisLine={false} tickLine={false} width={72} />
            <Tooltip
              formatter={(v) => [fmt(v), 'Total']}
              contentStyle={{ background: '#22222c', border: '1px solid #2e2e3a', borderRadius: 8, fontSize: 12 }}
              itemStyle={{ color: '#f0c040' }}
              cursor={{ fill: 'rgba(240,192,64,0.06)' }}
            />
            <Bar dataKey='total' fill='rgba(240,192,64,0.7)' radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
