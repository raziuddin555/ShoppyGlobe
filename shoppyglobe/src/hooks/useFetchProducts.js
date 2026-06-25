import { useState, useEffect } from 'react'

// Custom hook for fetching product list from the API
// I made this a separate hook so I can reuse it if needed
function useFetchProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
            // Using async function inside useEffect
            async function fetchProducts() {
                try {
                    setLoading(true)
                    setError(null)
                    const response = await fetch('https://dummyjson.com/products?limit=0')

                    // Check if response is ok, otherwise throw error
                    if (!response.ok) {
                        throw new Error(`Failed to fetch: ${response.status}`)
                    }

                    const data = await response.json()
                    setProducts(data.products)
                } catch (err) {
                    // Setting error message so we can show it in the UI
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }

            fetchProducts()
        }, []) // empty dependency array = runs only once when component mounts

    return { products, loading, error }
}

export default useFetchProducts