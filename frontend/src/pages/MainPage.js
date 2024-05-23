import React from 'react'
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'

import Row from '../components/Row';

export async function loader() {
    // get data from the backend api and return it
    const data = await axios.get("http://localhost:4000/api/langlevel")
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error.response.data.error);
        })
    return data
}

const MainPage = () => {
    // get data from the loader function
    const data = useLoaderData()
    const fullData = data.map(eachData => {
        return <Row key={eachData.language} {...eachData} />
    })
    return (
        <div className='body'>
            <h1>Programming Languages and Levels</h1>
            <table className='table'>
                <tbody>
                    <tr>
                        <td className='table-language'>
                            <h3>Language</h3>
                        </td>
                        <td className='table-level'>
                            <h3>Level</h3>
                        </td>
                        <td className='table-sspfp'>
                            <h3>SSPFP</h3>
                        </td>
                    </tr>
                    {fullData}
                </tbody>
            </table>
        </div>
    )
}

export default MainPage