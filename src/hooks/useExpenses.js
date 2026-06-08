import { useState, useEffect, useMemo } from 'react'
import { uid, SEED_DATA } from '../utils/helpers'

const KEY = 'spendwise_expenses'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  const seed = SEED_DATA()
  localStorage.setItem(KEY, JSON.stringify(seed))
  return seed
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(load)
  const [filters, setFilters] = useState({ search: '', category: '', from: '', to: '' })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (data) => {
    setExpenses(prev => [{ ...data, id: uid() }, ...prev])
  }

  const updateExpense = (id, data) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...data } : e))
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const filtered = useMemo(() => {
    const { search, category, from, to } = filters
    return expenses
      .filter(e => {
        if (search) {
          const q = search.toLowerCase()
          if (!e.title.toLowerCase().includes(q) && !(e.notes || '').toLowerCase().includes(q)) return false
        }
        if (category && e.category !== category) return false
        if (from && e.date < from) return false
        if (to && e.date > to) return false
        return true
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [expenses, filters])

  const stats = useMemo(() => {
    const total = filtered.reduce((s, e) => s + e.amount, 0)
    const avg   = filtered.length ? total / filtered.length : 0
    const catTotals = {}
    filtered.forEach(e => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount })
    const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    return { total, avg, count: filtered.length, topCat, catTotals }
  }, [filtered])

  const monthlyTrend = useMemo(() => {
    const now = new Date()
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const key = d.toISOString().slice(0, 7)
      const label = d.toLocaleString('default', { month: 'short' })
      const total = expenses.filter(e => e.date.startsWith(key)).reduce((s, e) => s + e.amount, 0)
      return { key, label, total }
    })
  }, [expenses])

  return {
    expenses,
    filtered,
    filters,
    setFilters,
    addExpense,
    updateExpense,
    deleteExpense,
    stats,
    monthlyTrend,
  }
}
