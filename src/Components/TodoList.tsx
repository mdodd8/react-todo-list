import {Fragment} from "react/jsx-runtime";
import React, {type FormEvent, useState} from 'react';
import '../App.css';
import type {Task} from "../Interfaces/Task.interface.ts";
import TaskRow from "./TaskRow.tsx";
import NewTaskInput from "./NewTaskInput.tsx";
import TaskCards from "./TaskCards.tsx";
import { Link, useNavigate } from 'react-router-dom';


function TaskList() {

    const navigate = useNavigate();

    const [items, setItems] = useState<Task[]>([
        {id: 1, name: 'Dishes', isComplete: true, isReadOnly: true},
        {id: 2, name: 'Laundry', isComplete: true, isReadOnly: false},
        {id: 3, name: 'Sweeping', isComplete: false, isReadOnly: false},
    ]);

    const [appState, changeState] = useState({items});
    const [inputValue, setInputValue] = useState<string>('');
    const [editText, setEditText] = useState<string>('');


    const handleSubmit = (event: FormEvent) => {
       console.log(event.target, 'target hit');
        event.preventDefault();
        const newItems = items;
        const nextId = newItems.length ? Math.max(...newItems.map(x => x.id)) + 1 : 1;
        newItems.push({id: nextId, name: inputValue, isComplete: false, isReadOnly: false});
        changeState({
            ...appState,
            items: newItems
        })
        setInputValue('');
        console.log('Form submitted with value:', event);
        console.log(inputValue);
    };
    const handleChange = (id: number) => {
        console.log(id, 'items id');
        const updatedItems = items.map(item =>
            item.id === id ? {...item, isComplete: !item.isComplete} : item
        );
        setItems(updatedItems);
        console.log(updatedItems, 'items array');
    };

    const toggleIsReadOnly = (id: number) => {
        console.log('edit was hit');
        const updatedItems = items.map(item =>
            item.id === id ? {...item, isReadOnly: !item.isReadOnly} : item
        );
        setItems(updatedItems);
        console.log(items, 'items array now');
    }

    const navToNewPage = () => {
        const dataToPass = {
            items: items,
        };
        navigate('/cards', { state: dataToPass });
    }

    const handleDelete = (id:number) => {
        setItems(prev => prev.filter(x => x.id !== id));
    }

    const handleEditName = (id: number, value: string) => {
        setItems(prev =>
            prev.map(x => x.id === id ? {...x, name: value} : x)
        )
    }

    const saveCurrentItem = (i: number) => {
        console.log(items, 'trying to save')
        setItems(prev =>
            prev.map(item =>
                item.id === i
                    ? {...item, text: editText, isReadOnly: true}
                    : item
            )
        );
        setEditText('');
    }


    return (
        <Fragment>
            <button className="btn btn-info" onClick={navToNewPage}> Go To new page</button>
            <div className="main-container">
                <div>
                    <h1>Tasks To Complete</h1>
                </div>
                <div>
                    <NewTaskInput handleSubmit={handleSubmit} onSetInputValue={setInputValue} inputValue={inputValue}></NewTaskInput>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Task Name</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) =>
                        <TaskRow task={item} saveCurrentItem={saveCurrentItem} toggleIsReadOnly={toggleIsReadOnly}
                                 handleChange={handleChange} onEditName={handleEditName} onDelete={handleDelete}></TaskRow>
                    )}
                    </tbody>
                </table>
                <div>Task Count: {items.length}</div>
            </div>


        </Fragment>

    );
}

export default TaskList