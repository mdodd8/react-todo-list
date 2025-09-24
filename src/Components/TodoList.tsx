import { Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import '../App.css';



function TaskList() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const newItems = items;
        const nextId = newItems.length ? Math.max(...newItems.map(x => x.id)) + 1 : 1;
        newItems.push({ id: nextId, name: inputValue, isComplete: false, isReadOnly: false });
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
            item.id === id ? { ...item, isComplete: !item.isComplete } : item
        );
        setItems(updatedItems);
        console.log(updatedItems, 'items array');
    };

    const toggleIsReadOnly = (id: number) => {
        console.log('edit was hit');
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, isReadOnly: !item.isReadOnly } : item
        );
        setItems(updatedItems);
        console.log(items, 'items array now');
    }

    const saveCurrentItem = (i: number) => {
        console.log(items, 'trying to save')
        setItems(prev =>
            prev.map(item =>
                item.id === i
                    ? { ...item, text: editText, isReadOnly: true }
                    : item
            )
        );
        setEditText('');
    }

    const [items, setItems] = useState([
        { id: 1, name: 'Dishes', isComplete: true, isReadOnly: true },
        { id: 2, name: 'Laundry', isComplete: true, isReadOnly: false },
        { id: 3, name: 'Sweeping', isComplete: false, isReadOnly: false },
    ]);

    const [appState, changeState] = useState({ items });
    const [inputValue, setInputValue] = useState('');
    const [editText, setEditText] = useState('');

    return (
        <Fragment>
            <div className="main-container">
                <div>
                    <h1>Tasks To Complete</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="padding-ten">
                            <label className="pb-10">New Task</label>
                            <input type="text" className="form-control" placeholder="Enter task name" required value={inputValue} onChange={(e => setInputValue(e.target.value))} />
                            <p className="text-danger">*Required</p>
                            <div>
                                <button type="submit" className="btn btn-primary global-btn-width">Submit</button>
                            </div>
                        </div>
                    </form>
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
                            <tr key={item.id}>
                                <td>
                                    {item.isReadOnly ? (
                                        <p>{item.name}</p>
                                    ) : (
                                        <input type="text" value={item.name} onChange={e => setItems(prev => prev.map(x => x.id === item.id ? { ...x, name: e.target.value } : x)
    )
  }/>
                                    )}
                                </td>
                                <td>
                                    <input type="checkbox" disabled={item.isReadOnly} checked={item.isComplete} onChange={() => handleChange(item.id)} />
                                </td>
                                <td>
                                    {item.isReadOnly ? (
                                        <button className="btn btn-info global-btn-width" onClick={() => toggleIsReadOnly(item.id)}>
                                            Edit
                                        </button>
                                    ) : (
                                        <button className="btn btn-success global-btn-width" onClick={() => saveCurrentItem(item.id)}>
                                            Save
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-danger global-btn-width" onClick={() => setItems(prev => prev.filter(x => x.id !== item.id))}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>Task Count: {items.length}</div>
            </div>


        </Fragment>

    );
}

export default TaskList