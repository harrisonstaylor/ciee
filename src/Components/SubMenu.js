// SubMenu.js
import './SubMenu.css';
import trashImg from '../img/trash.png';
import { format } from 'date-fns';
import starImage1 from "../img/star1.png";
import starImage2 from "../img/star2.png";
import starImage3 from "../img/star3.png";
import starImage4 from "../img/star4.png";
import starImage5 from "../img/star5.png";
import res from "../img/resolve.png";

const SubMenu = ({ onClose, buttonData, updateGridData }) => {

    const urgency = buttonData.urgency;

    const selectStarImage = () => {
        switch (urgency) {
            case 1:
                return starImage1;
            case 2:
                return starImage2;
            case 3:
                return starImage3;
            case 4:
                return starImage4;
            case 5:
                return starImage5;
            default:
                return starImage1;
        }
    };

    const getStarWidth = (urgency) => {
        const baseWidth = 20;
        const additionalWidthPerUrgency = 20;
        return baseWidth + (urgency - 1) * additionalWidthPerUrgency;
    };

    const renderStars = () => {
        const starImage = selectStarImage(urgency);
        const starWidth = getStarWidth(urgency);

        return <img src={starImage} alt={`${urgency} stars`} style={{ width: `${starWidth}px` }} />;
    };







    const formattedDate = buttonData.date ? format(new Date(buttonData.date), 'M/d/yyyy') : '';









    const resolve = async () => {
        const taskId = buttonData.id;

        await fetch('http://localhost:3001/resolve-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId }),
        })
            .then(response => {
            if (response.ok) {
                updateGridData();
                onClose();
            } else {
                console.error('Failed to resolve task');
        }})
            .catch(error => console.error('Error resolving task:', error));



    };





    const deleteTask = async () => {
        const taskId = buttonData.id;
        await fetch(`http://localhost:3001/delete-task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    updateGridData();
                    onClose();
                } else {
                    console.error('Failed to delete task');
                }
            })
            .catch(error => console.error('Error deleting task:', error));


    };





    return (
        <div className="sub-menu-overlay" onClick={onClose}>
            <div className="sub-menu">
                <div className="sub-menu-header">
                    <span className="sub-menu-title">{}</span>
                    <button className="sub-menu-close" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="sub-menu-content">
                    <h1>{buttonData.title}</h1>
                    <p>Date Created: {formattedDate}</p>
                    <p>Status: {buttonData.status}</p>
                    <p>{renderStars()}</p>
                </div>
                <div>
                {buttonData.status === "pending" && (
                    <button className="delete-button" onClick={(event) => resolve()}>
                        <img className = "trash-pic" src={res} alt = "Resolve task"/>
                    </button>
                )}
                <button className="delete-button" onClick={deleteTask}>
                    <img className="trash-pic" src={trashImg} alt="Delete" />
                </button>
                </div>
            </div>
        </div>
    );
};

export default SubMenu;
