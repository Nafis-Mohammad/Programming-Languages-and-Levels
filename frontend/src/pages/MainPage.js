import React from 'react'
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'

export async function loader() {
    const data = await axios.get("http://localhost:4000/api/langlevel")
        .then((response) => {
            return response.data.allLangLevels // ???
        })
        .catch((error) => {
            console.log(error.response.data.error); // ???
        })
    return data
}

const MainPage = () => {
    const data = useLoaderData()
    console.log(data);
    
    return (
        <div>
            MainPage
            {data}
        </div>
    )
}

export default MainPage