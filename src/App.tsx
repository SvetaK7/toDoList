import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}
type TasksStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {
    //
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const [todoLists, settodoLists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Ice cream", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Butter", isDone: false},
            {id: v1(), title: "Cake", isDone: false},
            {id: v1(), title: "solt", isDone: false},
        ],
    })

    //

    function removeTask(todoListID: string, id: string) {
        const currentTodolistTasks = tasks[todoListID]  // получаем массив
        const updatedTasks = currentTodolistTasks.filter(t => t.id != id);
        tasks[todoListID] = updatedTasks

        setTasks({...tasks});
        // setTasks({...tasks,[todoListID]: tasks[todoListID].filter(t => t.id != id) });

    }

    const changeIsDone = (todoListID: string, id: string, isDone: boolean) => {
        const currentTodolistTasks = tasks[todoListID];
        const updatedTasks = currentTodolistTasks.map(el => el.id === id ? {...el, isDone: isDone} : el);
        tasks[todoListID] = updatedTasks;
        setTasks({...tasks})
        // setTasks({...tasks, [todoListID] : task[todoListID].map(el => el.id === id ? {...el, isDone: isDone} : el)})
    }

    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        const currentTodolistTasks = tasks[todoListID];
        const updatedTasks = [task, ...currentTodolistTasks];

        setTasks({...tasks, [todoListID]: updatedTasks});
        //setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]});
    }


    function changeFilter(todoListID: string, value: FilterValuesType) {
        settodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
    }

    const removeTodolist = (todoListID: string) => {
        settodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const getTaskForRender = (todolist: TodolistType) => {
        let tasksForRender = tasks[todolist.id];
        if (todolist.filter === "active"){
            tasksForRender = tasks[todolist.id].filter(t => t.isDone === false);
        }
        if (todolist.filter === "completed") {
            tasksForRender = tasks[todolist.id].filter(t => t.isDone === true);
        }
        return tasksForRender
    }

    const todolistComponents = todoLists.length
        ? todoLists.map(tl => {
        return (

                <Todolist
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.title}
                    tasks={getTaskForRender(tl)}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeIsDone={changeIsDone}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
        )
    })
        : <span>Create todolist</span>

    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;
