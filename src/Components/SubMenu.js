// SubMenu.js
import React, { useState } from 'react';
import './SubMenu.css'; // Import the corresponding CSS file

const SubMenu = ({ onClose, buttonData }) => {
    const [isResolved, setIsResolved] = useState(buttonData.status === "resolved");

    const resolve = () => {
        const taskId = buttonData.id; // Use the id property
        console.log(taskId);
        // Make a POST request to your server to resolve the task
        fetch('http://localhost:3001/resolve-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId }),
        })
            .then(response => {
                if (response.ok) {
                    setIsResolved(true);
                    onClose();
                } else {
                    console.error('Failed to resolve task');
                }
            })
            .catch(error => console.error('Error resolving task:', error));
    };



    console.log("Button Data:", buttonData);
    console.log("Is Resolved:", isResolved);

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
                    <p>Date Created: {new Date(buttonData.dateCreated).toLocaleString()}</p>
                    <p>Status: {buttonData.status}</p>
                    <p>Urgency: {buttonData.urgency} stars</p>
                </div>
                <div>
                    {buttonData.status === "pending" && (
                        <button onClick={resolve}>
                            {isResolved ? 'Resolved' : 'Resolve'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubMenu;
