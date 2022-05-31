import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TodolistType} from './App';
import style from './Todolist.module.css';
import {Checkboks} from "./components/Checkboks";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID:string,taskId: string) => void
    changeFilter: (todoListID:string,value: FilterValuesType) => void
    addTask: (todoListID:string,title: string) => void
    changeIsDone: (todoListID:string,id: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todoListID:string)=>void
}


export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError]= useState(false)

    const addTask = () => {
        if (title.trim() !== ''){
            props.addTask(props.todolistID,title.trim());
            setTitle("");
        } else {
            setError(true)
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");
    const changeIsDoneHandler = (tId: string, e: boolean) => {
        props.changeIsDone(props.todolistID,tId, e)
    }
    return <div>
        <h3>{props.title}
            <button onClick={()=>props.removeTodolist(props.todolistID)}>X</button>
        </h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error ? style.error : ''  }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>Title is req</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.todolistID,t.id)

                    return <li key={t.id} className={t.isDone ? style.isDone : ''}>

                        <Checkboks isDone={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? style.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? style.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? style.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
