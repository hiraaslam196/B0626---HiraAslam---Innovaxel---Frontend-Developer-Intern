export const CATEGORIES = [
  'Food', 'Transport', 'Utilities', 'Health',
  'Shopping', 'Entertainment', 'Education', 'Other',
]

export const CATEGORY_COLORS = {
  Food:          '#fb923c',
  Transport:     '#5ea8f5',
  Utilities:     '#a78bfa',
  Health:        '#4ecb8d',
  Shopping:      '#f472b6',
  Entertainment: '#f0c040',
  Education:     '#22d3ee',
  Other:         '#9ca3af',
}

export const CATEGORY_BG = {
  Food:          'rgba(251,146,60,0.15)',
  Transport:     'rgba(94,168,245,0.15)',
  Utilities:     'rgba(167,139,250,0.15)',
  Health:        'rgba(78,203,141,0.15)',
  Shopping:      'rgba(244,114,182,0.15)',
  Entertainment: 'rgba(240,192,64,0.15)',
  Education:     'rgba(34,211,238,0.15)',
  Other:         'rgba(156,163,175,0.15)',
}

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

export const todayStr = () => new Date().toISOString().slice(0, 10)

export const fmtCurrency = (n) =>
  'PKR ' + Number(n).toLocaleString('en-PK', { maximumFractionDigits: 0 })

export const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

export const SEED_DATA = () => {
  const titles = ['Grocery run', 'Uber to office', 'New shoes', 'Lunch at Lazeez', 'Electricity bill', 'Cinema tickets', 'Pharmacy']
  const cats   = ['Food', 'Transport', 'Shopping', 'Food', 'Utilities', 'Entertainment', 'Health']
  const amounts= [3400, 450, 6500, 1200, 4800, 1400, 890]
  const notes  = ['Weekly groceries', '', 'Bata sale', 'With team', '', 'Avengers re-run', 'Cold meds']
  const today  = new Date()
  return titles.map((title, i) => {
    const dt = new Date(today)
    dt.setDate(dt.getDate() - i * 3)
    return { id: uid(), title, amount: amounts[i], category: cats[i], date: dt.toISOString().slice(0,10), notes: notes[i] }
  })
}
