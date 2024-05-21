import React from 'react'

const Row = (props) => {
  return (
    <tr>
        <td className='table-language'>
            {props.language}
        </td>
        <td className='table-level'>
            {props.level}
        </td>
        <td className='table-sspfp'>
            {props.sspfp}
        </td>
    </tr>
  )
}

export default Row