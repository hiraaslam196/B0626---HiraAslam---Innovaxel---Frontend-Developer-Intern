import { CATEGORIES } from '../utils/helpers'
import styles from './Filters.module.css'

export default function Filters({ filters, onChange }) {
  const set = (field) => (e) => onChange({ ...filters, [field]: e.target.value })
  const clear = () => onChange({ search: '', category: '', from: '', to: '' })
  const hasActive = Object.values(filters).some(Boolean)

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <label>Search</label>
        <input value={filters.search} onChange={set('search')} placeholder='Title or notes...' />
      </div>
      <div className={styles.group}>
        <label>Category</label>
        <select value={filters.category} onChange={set('category')}>
          <option value=''>All</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className={styles.group}>
        <label>From</label>
        <input type='date' value={filters.from} onChange={set('from')} />
      </div>
      <div className={styles.group}>
        <label>To</label>
        <input type='date' value={filters.to} onChange={set('to')} />
      </div>
      {hasActive && (
        <button className={styles.clear} onClick={clear}>✕ Clear</button>
      )}
    </div>
  )
}
