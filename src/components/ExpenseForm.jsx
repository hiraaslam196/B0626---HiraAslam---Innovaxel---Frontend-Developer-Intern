import { useState, useEffect } from 'react'
import { CATEGORIES, todayStr } from '../utils/helpers'
import styles from './ExpenseForm.module.css'

const empty = { title: '', amount: '', category: '', date: todayStr(), notes: '' }

export default function ExpenseForm({ onSubmit, editData, onCancelEdit }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const isEdit = !!editData

  useEffect(() => {
    if (editData) setForm({ ...editData, amount: String(editData.amount) })
    else setForm({ ...empty, date: todayStr() })
    setErrors({})
  }, [editData])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.title.trim())          errs.title    = 'Title is required'
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = 'Enter a valid amount > 0'
    if (!form.category)              errs.category = 'Select a category'
    if (!form.date)                  errs.date     = 'Date is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, amount: parseFloat(form.amount) })
    if (!isEdit) setForm({ ...empty, date: todayStr() })
    setErrors({})
  }

  const field = (id, label, input, err) => (
    <div className={`${styles.group} ${err ? styles.hasError : ''}`}>
      <label>{label}</label>
      {input}
      {err && <span className={styles.err}>{err}</span>}
    </div>
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        {field('title', 'Title *',
          <input value={form.title} onChange={set('title')} placeholder='e.g. Dinner with friends' maxLength={60} className={errors.title ? styles.inputErr : ''} />,
          errors.title
        )}
        {field('amount', 'Amount (PKR) *',
          <input type='number' value={form.amount} onChange={set('amount')} placeholder='0.00' min='0.01' step='0.01' className={errors.amount ? styles.inputErr : ''} />,
          errors.amount
        )}
      </div>
      <div className={styles.row}>
        {field('category', 'Category *',
          <select value={form.category} onChange={set('category')} className={errors.category ? styles.inputErr : ''}>
            <option value=''>Select category</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>,
          errors.category
        )}
        {field('date', 'Date *',
          <input type='date' value={form.date} onChange={set('date')} className={errors.date ? styles.inputErr : ''} />,
          errors.date
        )}
      </div>
      {field('notes', 'Notes (optional)',
        <textarea value={form.notes} onChange={set('notes')} placeholder='Any additional details...' rows={3} />,
        null
      )}
      <button type='submit' className={styles.btnPrimary}>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
          {isEdit
            ? <path d='M20 6L9 17l-5-5'/>
            : <path d='M12 5v14M5 12h14'/>}
        </svg>
        {isEdit ? 'Save Changes' : 'Add Expense'}
      </button>
      {isEdit && (
        <button type='button' className={styles.btnSecondary} onClick={onCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  )
}
