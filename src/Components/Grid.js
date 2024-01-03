// Grid.js
import React, { useState, useEffect } from "react";
import HintButton from "./HintButton";
import SubMenu from "./SubMenu";
import NewMenu from "./NewMenu";

function Grid() {
    const [buttons, setButtons] = useState([]);
    const [resolvedButtons, setResolvedButtons] = useState([]);
    const [pendingButtons, setPendingButtons] = useState([]);
    const [clickedButton, setClickedButton] = useState(null);
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [isNewMenuOpen, setNewMenuOpen] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch("http://localhost:3001/buttons", {
                method: "GET",
            }).then((res) => res.json());

            console.log(data);
            setButtons(data);

            const resolved = data.filter(button => button.status === "resolved");
            const pending = data.filter(button => button.status === "pending");

            setResolvedButtons(resolved);
            setPendingButtons(pending);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleButtonClick = (button) => {
        setClickedButton(button);
        setSubMenuOpen(true);
    };

    const closeSubMenu = (event) => {
        // Check if the click target is the overlay or the close button
        const isOverlayClick = event.target.classList.contains('sub-menu-overlay');
        const isCloseButtonClick = event.target.classList.contains('sub-menu-close');

        if (isOverlayClick || isCloseButtonClick) {
            setSubMenuOpen(false);
            setClickedButton(null);
        }
    };




    const toggleNewTaskMenu = () => {
        setNewMenuOpen(!isNewMenuOpen);
    };




    const updateGridData = async () => {
        await fetchData();
    };






    return (
        <div style={{ display: "inline-grid", justifyContent: "center"}}>
            <div>
                <h2>Pending Tasks</h2>
                {pendingButtons.map((button) => (
                    <HintButton
                        key={button._id.toString()} // Convert ObjectId to string
                        text={button.title}
                        dateCreated={button.dateCreated}
                        status={button.status}
                        urgency={button.urgency}
                        onClick={() => handleButtonClick(button)}
                    />
                ))}
            </div>

            <div>
                <button onClick={toggleNewTaskMenu}>New task</button>
            </div>


            {isNewMenuOpen &&(
                <NewMenu onClose={toggleNewTaskMenu} updateGridData={updateGridData} />
            )}

            <div>
                <h2>Resolved Tasks</h2>
                {resolvedButtons.map((button) => (
                    <HintButton
                        key={button._id.toString()} // Convert ObjectId to string
                        text={button.title}
                        dateCreated={button.dateCreated}
                        status={button.status}
                        urgency={button.urgency}
                        onClick={() => handleButtonClick(button)}
                    />
                ))}
            </div>
            {isSubMenuOpen && clickedButton && (
                <SubMenu onClose={(event) => closeSubMenu(event)} buttonData={clickedButton} />
            )}
        </div>
    );
}

export default Grid;

