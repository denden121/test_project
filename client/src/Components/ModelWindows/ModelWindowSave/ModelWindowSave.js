import React from 'react';
import './ModelWindowSave.css'

const ModelWindowSave = (props) =>{
    return(
        <div className={'model-create'}>
            <div className={'model-title'}>Редактирование сотрудника</div>
            <a id={'save'} onClick={props.onClickBack}>Назад к списку</a>
            <div className={'modal-form'}>
                <input id={'name-save'} type="text" placeholder={'Введите имя сотрудника'}/>
                <input id={'surname-save'} type="text" placeholder={'Введите фамилию сотрудника'}/>
                <button onClick={props.onClickButtonEdit}>Сохранить</button>
            </div>
        </div>
    )
}

export default ModelWindowSave;