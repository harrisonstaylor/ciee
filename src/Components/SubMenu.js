


// SubMenu.js
import React from 'react';
import './SubMenu.css'; // Import the corresponding CSS file

const SubMenu = ({ onClose, buttonData }) => {
    return (
        <div className="sub-menu-overlay" onClick={onClose}>
            <div className="sub-menu">
                <div className="sub-menu-header">
                    <span className="sub-menu-title">{buttonData.title}</span>
                    <button className="sub-menu-close" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="sub-menu-content">
                    <p>Date Created: {new Date(buttonData.dateCreated).toLocaleString()}</p>
                    <p>Status: {buttonData.status}</p>
                    <p>Urgency: {buttonData.urgency} stars</p>
                </div>
            </div>
        </div>
    );
};

export default SubMenu;

