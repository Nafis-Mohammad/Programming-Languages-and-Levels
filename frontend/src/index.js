import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from "./App"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import MainPage, {loader as mainpageLoader} from './pages/MainPage'



const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={<MainPage />} loader={mainpageLoader} />
    </Route>
))


function App() {
    return (
        <RouterProvider router={router} />
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)