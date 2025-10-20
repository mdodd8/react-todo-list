import React, {useState} from "react";
import DefaultImg from "./DefaultImg.tsx";
import type {Task} from "../Interfaces/Task.interface.ts";
import { useLocation } from 'react-router-dom';



function TaskCards  ()  {


    const location = useLocation();
    const { items } = location.state || {};

    return (

        <div>
            <div className="row-container">
                <h1 className="title">Tasks Library</h1>
                <button className="right-button">
                    Add New Task
                </button>
            </div>

            <div className="card-container">
            {items.map((item: Task, index: number) =>
                   <div className="card" key={index}>
                    <DefaultImg></DefaultImg>
                    <h2 className="card-title">{item.name}</h2>
                    <p className="card-text">This is the tag to add a description if necessary for the task.</p>
                   </div>
            )}
               </div>
        </div>

    );
}

export default TaskCards;