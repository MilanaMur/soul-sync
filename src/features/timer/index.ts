import { useEffect, useMemo, useState } from 'react'

export type RelationshipDuration = {
  days: number
  hours: number
  minutes: number
}

function parseDateInputAsLocalMidnight(dateValue: string): Date | null {
  // `YYYY-MM-DD` from <input type="date" /> should be treated as a local date,
  // not UTC (which can shift the day depending on timezone).
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue)
  if (!m) return null
  const year = Number(m[1])
  const monthIndex = Number(m[2]) - 1
  const day = Number(m[3])
  if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || !Number.isFinite(day)) {
    return null
  }
  const d = new Date(year, monthIndex, day, 0, 0, 0, 0)
  if (Number.isNaN(d.getTime())) return null
  return d
}

export function getRelationshipDuration(
  relationshipStartDate: string,
  now: Date = new Date(),
): RelationshipDuration | null {
  const start = parseDateInputAsLocalMidnight(relationshipStartDate)
  if (!start) return null

  const diffMs = now.getTime() - start.getTime()
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000))

  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  return { days, hours, minutes }
}

export function useRelationshipTimer(relationshipStartDate: string | null) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // update once a minute (matches "minutes" precision)
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return useMemo(() => {
    if (!relationshipStartDate) return null
    return getRelationshipDuration(relationshipStartDate, now)
  }, [relationshipStartDate, now])
}

