// SubMenu.js
import React, { useState } from 'react';
import './SubMenu.css'; // Import the corresponding CSS file

const SubMenu = ({ onClose, buttonData, updateGridData }) => {
    const [isResolved, setIsResolved] = useState(buttonData.status === "resolved");

    const resolve = async () => {
        const taskId = buttonData.id;
        console.log(taskId);
        try {
            const response = await fetch('http://localhost:3001/resolve-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskId }),
            });

            if (response.ok) {
                setIsResolved(true);
                await updateGridData(); // Await the updateGridData function
                console.log("closing");
                onClose();
            } else {
                console.error('Failed to resolve task');
            }
        } catch (error) {
            console.error('Error resolving task:', error);
        }


        updateGridData();
    };





    const deleteTask = () => {
        const taskId = buttonData.id;
        fetch(`http://localhost:3001/delete-task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    updateGridData();
                    console.log("closing");
                    onClose();
                } else {
                    console.error('Failed to delete task');
                }
            })
            .catch(error => console.error('Error deleting task:', error));


        updateGridData();
    };





    return (
        <div className="sub-menu-overlay" onClick={onClose}>
            <div className="sub-menu">
                <div className="sub-menu-header">
                    <span className="sub-menu-title">{buttonData.text}</span>
                    <button className="sub-menu-close" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="sub-menu-content">
                    <h1>{buttonData.title}</h1>
                    <p>Date Created: {new Date(buttonData.dateCreated).toLocaleString()}</p>
                    <p>Status: {buttonData.status}</p>
                    <p>Urgency: {buttonData.urgency} stars</p>
                </div>
                <div>
                    {buttonData.status === "pending" && (
                        <button onClick={(event) => resolve()}>
                            {isResolved ? 'Resolved' : 'Resolve'}
                        </button>

                    )}
                </div>
                <button className="delete-button" onClick={deleteTask}>
                    <img src="../img/trash.png" alt="Delete" />
                </button>
            </div>
        </div>
    );
};

export default SubMenu;
