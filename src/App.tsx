
import React, { useMemo, useState } from 'react'
import data from './data/operators.json'
import { getDocUrl } from './lib/docs'
import { operatorDescriptions, furtherDescriptions } from './lib/descriptions'

type CategoryKey =
  | 'value-based-first-order'
  | 'time-based-first-order'
  | 'value-based-higher-order'
  | 'time-based-higher-order'

type Order = 'first-order' | 'higher-order'
type TimeValue = 'time' | 'value'

type Row = {
  Operator: string
  category_key: CategoryKey
  time_value_key: TimeValue
  further: string
}

const rows = data as Row[]

const ALL_ORDERS: Order[] = ['first-order', 'higher-order']
const ALL_TIMEVALUES: TimeValue[] = ['time', 'value']
const ALL_FURTHER = Array.from(new Set(rows.map(r => r.further))).sort()

const deriveCategoryKey = (order: Order, domain: TimeValue): CategoryKey => {
  return `${domain}-based-${order}` as CategoryKey
}

const operatorDesc = (op: string, further: string) => {
  return operatorDescriptions[op] ?? furtherDescriptions[further] ?? 'RxJS operator'
}

export default function App() {
  const [order, setOrder] = useState<Order | ''>('')
  const [timeValue, setTimeValue] = useState<TimeValue | ''>('')
  const [further, setFurther] = useState<string>('')

  const furtherOptions = useMemo(() => {
    if (!order || !timeValue) return ALL_FURTHER
    const key = deriveCategoryKey(order as Order, timeValue as TimeValue)
    const subset = rows
      .filter(r => r.category_key === key)
      .map(r => r.further)
    return Array.from(new Set(subset)).sort()
  }, [order, timeValue])

  const results = useMemo(() => {
    if (!order || !timeValue) return []
    const key = deriveCategoryKey(order as Order, timeValue as TimeValue)
    return rows
      .filter(r =>
        r.category_key === key &&
        (further ? r.further === further : true)
      )
      .sort((a, b) => a.Operator.localeCompare(b.Operator))
  }, [order, timeValue, further])

  const count = results.length

  const reset = () => {
    setOrder('')
    setTimeValue('')
    setFurther('')
  }

  return (
    <div className="wrap">
      <div className="title">RxJS Operator Finder</div>
      <div className="sub">
        Pick <span className="pill">order</span> and <span className="pill">time/value</span> (required). Optionally refine with <span className="pill">further</span>.
      </div>

      <div className="panel">
        <div className="grid">
          <div>
            <label>Order</label>
            <select value={order} onChange={e => setOrder(e.target.value as Order)}>
              <option value="">— select —</option>
              {ALL_ORDERS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="hint">Allowed: first-order, higher-order</div>
          </div>
          <div>
            <label>Time / Value</label>
            <select value={timeValue} onChange={e => setTimeValue(e.target.value as TimeValue)}>
              <option value="">— select —</option>
              {ALL_TIMEVALUES.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="hint">Allowed: time, value</div>
          </div>
          <div>
            <label>Further (optional)</label>
            <select value={further} onChange={e => setFurther(e.target.value)}>
              <option value="">— any —</option>
              {furtherOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="hint">Values mirror the table's <em>further</em> column.</div>
          </div>
        </div>

        <div className="row" style={{marginTop:12}}>
          <button className="btn" onClick={reset}>Reset</button>
          {order && timeValue ? (
            <span className="hint">Showing results for <span className="pill">{order}</span> + <span className="pill">{timeValue}</span>{further ? <> + <span className="pill">{further}</span></> : null}</span>
          ) : (
            <span className="hint">Select at least <strong>order</strong> and <strong>time/value</strong> to see matching operators.</span>
          )}
        </div>
      </div>

      <div className="result">
        <h2>Matching operators <span className="pill">{count}</span></h2>
        <ul className="list">
          {results.map(r => {
            const url = getDocUrl(r.Operator)
            const desc = operatorDesc(r.Operator, r.further)
            return (
              <li key={r.Operator + r.further} className="item">
                <div style={{display:'flex', flexDirection:'column', gap:2}}>
                  <a className="op" href={url} target="_blank" rel="noreferrer">{r.Operator}</a>
                  <span className="meta">{desc}</span>
                </div>
                <span className="meta">{r.further}</span>
              </li>
            )
          })}
          {!order || !timeValue ? (
            <li className="item"><span className="meta">Pick order and time/value to populate results.</span></li>
          ) : null}
          {order && timeValue && count === 0 ? (
            <li className="item"><span className="meta">No operators match this combination.</span></li>
          ) : null}
        </ul>
      </div>

      <footer>
        Links open the official RxJS API (rxjs.dev). Some legacy names may redirect to modern equivalents.
      </footer>
    </div>
  )
}
