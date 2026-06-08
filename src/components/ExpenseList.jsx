import { CATEGORY_COLORS, CATEGORY_BG, fmtCurrency, fmtDate } from '../utils/helpers'
import styles from './ExpenseList.module.css'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📭</div>
        <p>No expenses found.</p>
        <span>Add one using the form or adjust your filters.</span>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {expenses.map((e, i) => (
        <div
          key={e.id}
          className={styles.item}
          style={{ animationDelay: `${Math.min(i * 0.04, 0.3)}s` }}
        >
          <div className={styles.info}>
            <div className={styles.title}>{e.title}</div>
            <div className={styles.meta}>
              <span className={styles.date}>📅 {fmtDate(e.date)}</span>
              <span
                className={styles.cat}
                style={{ background: CATEGORY_BG[e.category], color: CATEGORY_COLORS[e.category] }}
              >
                {e.category}
              </span>
            </div>
            {e.notes && <div className={styles.notes}>💬 {e.notes}</div>}
          </div>

          <div className={styles.amount} style={{ color: CATEGORY_COLORS[e.category] }}>
            {fmtCurrency(e.amount)}
          </div>

          <div className={styles.actions}>
            <button className={styles.btnEdit} onClick={() => onEdit(e)}>Edit</button>
            <button className={styles.btnDelete} onClick={() => onDelete(e.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
