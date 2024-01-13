// NewMenu.js
import React, { useState } from "react";
import './SubMenu.css'; // Import the corresponding CSS file

const NewMenu = ({ onClose, updateGridData  }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskUrgency, setNewTaskUrgency] = useState(1); // Default urgency value

    const handleTitleChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    const handleUrgencyChange = (event) => {
        setNewTaskUrgency(parseInt(event.target.value, 10));
    };

    const handleSubmit = async () => {

        if (newTaskTitle.length>0) {
            console.log("starting new task");
            try {
                const response = await fetch('http://localhost:3001/new-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: newTaskTitle,
                        urgency: newTaskUrgency,
                    }),
                });
                console.log(response.ok);

                if (response.ok) {
                    // Handle success, maybe update state or perform additional actions
                    console.log('Task added successfully');
                    updateGridData();
                    onClose();
                } else {
                    // Handle errors
                    console.error('Error adding task:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding task 2:', error);
            }

        }
    };

    return (
        <div className="sub-menu-overlay">
            <div className="sub-menu">
                <div className="sub-menu-header">
                    <span className="sub-menu-title">{"New Task"}</span>
                    <button className="sub-menu-close" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="sub-menu-content">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={newTaskTitle}
                        onChange={handleTitleChange}
                    />

                    <label htmlFor="urgency">Urgency:</label>
                    <input
                        type="range"
                        id="urgency"
                        min="1"
                        max="5"
                        value={newTaskUrgency}
                        onChange={handleUrgencyChange}
                    />
                    <span>{newTaskUrgency}</span>

                    <button onClick={handleSubmit}>Submit Task</button>
                </div>
            </div>
        </div>
    );
};

export default NewMenu;
