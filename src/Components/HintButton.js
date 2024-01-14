import React from 'react';
import "../App.css";
import starImage1 from "../img/star1.png";
import starImage2 from "../img/star2.png";
import starImage3 from "../img/star3.png";
import starImage4 from "../img/star4.png";
import starImage5 from "../img/star5.png";

function HintButton({ id, title, onClick, date, status, urgency }) {
    const buttonData = {
        id,
        title,
        date,
        status,
        urgency,
    };

    const selectStarImage = (urgency) => {
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


    const handleClick = () => {
        onClick(buttonData);
    };

    return (
        <div onClick={handleClick} className={"task-row"}>
            <div className={"task-title"}>{title}</div>
            <div className={"task-date"}>{date}</div>
            <div className={"task-urgency"}>{renderStars()}</div>
        </div>
    );
}

export default HintButton;
