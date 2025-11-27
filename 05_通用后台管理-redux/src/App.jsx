import router from './router'
import { RouterProvider } from 'react-router-dom'
import './index.css'



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
