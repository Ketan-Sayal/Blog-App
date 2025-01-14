import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container w-full min-h-screen bg-gray-400'>
      <div>{/**Header */}</div>
      <main>{/**Outlet */}</main>
      <div>{/**Footer */}</div>
    </div>
  )
}

export default App
