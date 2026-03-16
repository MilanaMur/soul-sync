import { useCallback, useEffect, useMemo, useState } from 'react'

export type CoupleProfile = {
  personAName: string
  personBName: string
  relationshipStartDate: string // YYYY-MM-DD (from <input type="date" />)
}

const STORAGE_KEY = '_c'

type StoredShape = {
  a?: unknown
  b?: unknown
  c?: unknown
}

export function getCoupleProfile(): CoupleProfile | null {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as StoredShape

    const personAName = typeof parsed.a === 'string' ? parsed.a.trim() : ''
    const personBName = typeof parsed.b === 'string' ? parsed.b.trim() : ''
    const relationshipStartDate = typeof parsed.c === 'string' ? parsed.c : ''

    if (!personAName || !personBName || !relationshipStartDate) return null

    return { personAName, personBName, relationshipStartDate }
  } catch {
    return null
  }
}

export function setCoupleProfile(profile: CoupleProfile) {
  const payload = JSON.stringify({
    a: profile.personAName,
    b: profile.personBName,
    c: profile.relationshipStartDate,
  })
  window.localStorage.setItem(STORAGE_KEY, payload)
}

export function clearCoupleProfile() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function useCoupleProfile() {
  const [profile, setProfile] = useState<CoupleProfile | null>(() =>
    getCoupleProfile(),
  )

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      setProfile(getCoupleProfile())
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const save = useCallback((next: CoupleProfile) => {
    setCoupleProfile(next)
    setProfile(next)
  }, [])

  const clear = useCallback(() => {
    clearCoupleProfile()
    setProfile(null)
  }, [])

  return useMemo(
    () => ({
      profile,
      save,
      clear,
    }),
    [profile, save, clear],
  )
}

