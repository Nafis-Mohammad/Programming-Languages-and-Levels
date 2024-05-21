import React from 'react'
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'

import Row from '../components/Row';

export async function loader() {
    // const data = await axios.get("http://localhost:4000/api/langlevel")
    //     .then((response) => {
    //         return response.data // ???
    //     })
    //     .catch((error) => {
    //         console.log(error.response.data.error); // ???
    //     })
    // return data
    return null
}

const MainPage = () => {
    // const data = useLoaderData()
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        axios.get("http://localhost:4000/api/langlevel")
        .then((response) => {
            setData(response.data) // ???
        })
        .catch((error) => {
            console.log(error.response.data.error); // ???
        })
    }, [])
    // console.log(data);
    const fullData = data.map(eachData => {
        return <Row {...eachData} />
    })
    return (
        <div className='body'>
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