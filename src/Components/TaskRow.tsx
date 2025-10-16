import React from "react";
import type {Task} from "../Interfaces/Task.interface.ts";

interface TaskRowProps {
    task: Task;
    toggleIsReadOnly: (id: number) => void;
    saveCurrentItem: (id: number) => void;
    handleChange: (id: number) => void;
    onEditName: (id: number, value: string) => void;
    onDelete: (id: number) => void;
}

const TaskRow = (props: TaskRowProps) => {
    const { task, toggleIsReadOnly, saveCurrentItem, handleChange, onEditName, onDelete } = props;
    return(
        <tr key={task.id}>
            <td>
                {task.isReadOnly ? (
                    <p>{task.name}</p>
                ) : (
                    <input className="form-control width-30" type="text" value={task.name} onChange={e => onEditName(task.id, e.target.value)} />
                )}
            </td>
            <td>
                <input type="checkbox" disabled={task.isReadOnly} checked={task.isComplete} onChange={() => handleChange(task.id)} />
            </td>
            <td>
                {task.isReadOnly ? (
                    <button className="btn btn-info global-btn-width" onClick={() => toggleIsReadOnly(task.id)}>
                        Edit
                    </button>
                ) : (
                    <button className="btn btn-success global-btn-width" onClick={() => saveCurrentItem(task.id)}>
                        Save
                    </button>
                )}
            </td>
            <td>
                <button className="btn btn-danger global-btn-width" onClick={() => onDelete(task.id)}>Delete</button>
            </td>
        </tr>
    );
}

export default TaskRow;