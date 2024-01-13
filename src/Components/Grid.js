// Grid.js
import React, { useState, useEffect } from "react";
import HintButton from "./HintButton";
import SubMenu from "./SubMenu";
import NewMenu from "./NewMenu";

function Grid() {
    // eslint-disable-next-line
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

        // Check if the event object exists
        if (event && event.target) {
            console.log(event.target)
            // Check if the click target is the overlay or the close button
            const isOverlayClick = event.target.classList.contains('sub-menu-overlay');
            const isCloseButtonClick = event.target.classList.contains('sub-menu-close');
            const isResolveButtonClick = event.target.classList.contains('resolve-button');
            const isDeleteButtonClick = event.target.classList.contains('delete-button');
            const isTrashClick = event.target.classList.contains('trash-pic');


            if (isOverlayClick || isCloseButtonClick || isResolveButtonClick || isDeleteButtonClick || isTrashClick) {

                setSubMenuOpen(false);
                setClickedButton(null);
            }
        }
    };





    const toggleNewTaskMenu = (event) => {
        if (event && event.target){
            const isOverlayClick = event.target.classList.contains('sub-menu-overlay');
            const isCloseButtonClick = event.target.classList.contains('sub-menu-close');
            const submitButtonClick = event.target.classList.contains('submit-button');
            const isNewButtonClick = event.target.classList.contains('new-button');

            if (isOverlayClick || isCloseButtonClick || submitButtonClick || isNewButtonClick){
                setNewMenuOpen(!isNewMenuOpen);
            }

        }
    };




    const updateGridData = async () => {
        console.log('Updating grid data...');
        await fetchData();
    };






    return (
        <div style={{ display: "inline-grid", justifyContent: "center"}}>
            <div>
                <h2>Pending Tasks</h2>
                {pendingButtons.map((button) => (
                    <HintButton
                        key={button.id}
                        id={button.id}
                        text={button.title}
                        dateCreated={button.dateCreated}
                        status={button.status}
                        urgency={button.urgency}
                        onClick={() => handleButtonClick(button)}
                    />
                ))}

            </div>

            <div>
                <button className = "new-button" onClick={toggleNewTaskMenu}>New task</button>
            </div>


            {isNewMenuOpen &&(
                <NewMenu onClose={toggleNewTaskMenu} updateGridData={updateGridData} />
            )}

            <div>
                <h2>Resolved Tasks</h2>
                {resolvedButtons.map((button) => (
                    <HintButton
                        key={button.id}
                        id = {button._id}
                        text={button.title}
                        dateCreated={button.dateCreated}
                        status={button.status}
                        urgency={button.urgency}
                        onClick={() => handleButtonClick(button)}
                    />
                ))}
            </div>
            {isSubMenuOpen && clickedButton && (
                <SubMenu onClose={closeSubMenu} buttonData={clickedButton} updateGridData={updateGridData}/>
            )}
        </div>
    );
}

export default Grid;

