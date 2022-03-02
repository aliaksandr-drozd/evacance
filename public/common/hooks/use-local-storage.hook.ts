import { Dispatch, SetStateAction, useEffect, useState } from 'react'


type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue: SetValue<T> = value => {
    if (typeof window == 'undefined') {
      console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`,
      )
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value

      window.localStorage.setItem(key, JSON.stringify(newValue))

      setStoredValue(newValue)

      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  useEffect(() => {
    setStoredValue(readValue())
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [])

  return [storedValue, setValue]
}
