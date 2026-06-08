import { useState } from 'react'
import toast from 'react-hot-toast'
import { useExpenses } from './hooks/useExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import StatsRow from './components/StatsRow'
import Filters from './components/Filters'
import Charts from './components/Charts'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import styles from './App.module.css'

export default function App() {
  const {
    filtered, filters, setFilters,
    addExpense, updateExpense, deleteExpense,
    stats, monthlyTrend,
  } = useExpenses()

  const [editData, setEditData]       = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleAdd = (data) => {
    addExpense(data)
    toast.success('Expense added!')
  }

  const handleEdit = (expense) => {
    setEditData(expense)
    // scroll form into view on mobile
    document.getElementById('form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleUpdate = (data) => {
    updateExpense(editData.id, data)
    setEditData(null)
    toast.success('Expense updated!')
  }

  const handleDeleteRequest = (id) => {
    setDeleteTarget(filtered.find(e => e.id === id))
  }

  const handleDeleteConfirm = () => {
    deleteExpense(deleteTarget.id)
    setDeleteTarget(null)
    toast.error('Expense deleted')
  }

  const now = new Date()
  const monthLabel = now.toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Spend<span>wise</span></div>
        <div className={styles.headerMeta}>
          <span className={styles.monthBadge}>📅 {monthLabel}</span>
        </div>
      </header>

      {/* Stats */}
      <StatsRow stats={stats} />

      {/* Main grid */}
      <div className={styles.grid}>

        {/* Left – Form */}
        <aside className={styles.formCol} id='form-panel'>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>
                {editData ? '✏️ Edit Expense' : '+ Add Expense'}
              </span>
              {editData && (
                <span className={styles.editBadge}>Editing</span>
              )}
            </div>
            <div className={styles.panelBody}>
              <ExpenseForm
                onSubmit={editData ? handleUpdate : handleAdd}
                editData={editData}
                onCancelEdit={() => setEditData(null)}
              />
            </div>
          </div>
        </aside>

        {/* Right – List + Charts */}
        <div className={styles.rightCol}>

          {/* Expenses list */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Expenses</span>
              <span className={styles.count}>
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <Filters filters={filters} onChange={setFilters} />
            <ExpenseList
              expenses={filtered}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />
          </div>

          {/* Charts */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Spending Summary</span>
            </div>
            <div className={styles.panelBody}>
              <Charts catTotals={stats.catTotals} monthlyTrend={monthlyTrend} />
            </div>
          </div>

        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          expense={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
