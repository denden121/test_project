import React from 'react';
import './Table.css';
import profile from '../../img/profile.svg'

const Table=(props)=>{
    console.log(props)
    return(
        <table border-bottom={'1px'}>
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody >
            {props.persons.map((person,index)=>{
                return (<tr>
                    <td><img src= {profile} width={'30px'}  alt={'profile'}/></td>
                    <td>{person.name}</td>
                    <td>{person.surname}</td>
                    <td><button onClick={()=>{props.onClickDeleteWorker(index,person.id)}} className='btn-del'>del</button></td>
                    <td><button onClick={()=>{props.onClickButtonEdit(index,person.id)}} className='btn-edit'>edit</button></td>
                </tr>)
            })}
            </tbody>
        </table>
    )
}

export default Table;