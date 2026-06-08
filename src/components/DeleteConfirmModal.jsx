import styles from './Modal.module.css'

export default function DeleteConfirmModal({ expense, onConfirm, onCancel }) {
  if (!expense) return null
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.icon}>🗑️</div>
        <div className={styles.title}>Delete Expense?</div>
        <p className={styles.body}>
          Are you sure you want to delete <strong>"{expense.title}"</strong>? This cannot be undone.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
