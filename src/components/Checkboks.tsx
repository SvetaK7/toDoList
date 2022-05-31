import React from 'react';
import {ChangeEvent} from "react";

type PropsType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

export const Checkboks = (props: PropsType) => {
    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={props.isDone} onChange={changeIsDoneHandler}/>
    )
}