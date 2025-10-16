import React, {type FormEvent} from "react";

interface NewTaskProps {
    inputValue: string
    handleSubmit: (value: FormEvent) => void;
    onSetInputValue: (value: string) => void;
}


const NewTask = (props: NewTaskProps) => {
    const { handleSubmit, onSetInputValue, inputValue } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="padding-ten">
                <label className="pb-10">New Task</label>
                <input type="text" className="form-control" placeholder="Enter task name" required
                       value={inputValue} onChange={(e => onSetInputValue(e.target.value))}/>
                <p className="text-danger">*Required</p>
                <div>
                    <button type="submit" className="btn btn-primary global-btn-width">Submit</button>
                </div>
            </div>
        </form>
    );
}

export default NewTask;