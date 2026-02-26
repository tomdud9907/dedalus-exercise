import { useCallback, useState } from 'react'

function useAsyncState(initialData) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const run = useCallback(async (request, { onSuccess, onError, onFinally } = {}) => {
    try {
      setLoading(true)
      setError('')

      const result = await request()
      setData(result)
      onSuccess?.(result)

      return result
    } catch (err) {
      const message = err?.message || 'Something went wrong.'
      setError(message)
      onError?.(err)
      throw err
    } finally {
      setLoading(false)
      onFinally?.()
    }
  }, [])

  return {
    data,
    setData,
    loading,
    error,
    setError,
    run,
  }
}

export default useAsyncState