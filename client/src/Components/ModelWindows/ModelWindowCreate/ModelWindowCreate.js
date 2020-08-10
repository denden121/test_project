import React from 'react';
import './ModelWindowCreate.css'

const ModelWindowCreate= (props) =>{
    return <div className={'model-create'}>
        <div className={'model-title'}>Создание сотрудника</div>
        <a href={''}>Назад к списку</a>
        <div className={'modal-form'}>
            <input id={'name-create'} type="text"   placeholder={'Введите имя сотрудника'}/>
            <input id={'surname-create'} type="text" placeholder={'Введите фамилию сотрудника'}/>
            <button onClick={props.onClickCreateWorker}>Сохранить</button>
        </div>
    </div>
}

export default ModelWindowCreate;