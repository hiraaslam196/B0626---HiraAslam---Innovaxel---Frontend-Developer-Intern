import { fmtCurrency } from '../utils/helpers'
import styles from './StatsRow.module.css'

const Card = ({ accent, label, value, sub }) => (
  <div className={styles.card} style={{ '--card-accent': accent }}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
    <div className={styles.sub}>{sub}</div>
  </div>
)

export default function StatsRow({ stats }) {
  const { total, avg, count, topCat } = stats
  return (
    <div className={styles.row}>
      <Card accent='var(--accent)' label='Total Spent'    value={fmtCurrency(total)}           sub='All filtered expenses' />
      <Card accent='var(--blue)'   label='Transactions'   value={count}                         sub='Expenses logged' />
      <Card accent='var(--green)'  label='Avg / Expense'  value={fmtCurrency(Math.round(avg))}  sub='Per transaction' />
      <Card accent='var(--purple)' label='Top Category'   value={topCat}                        sub='Highest spending' />
    </div>
  )
}
