// Grid.js
import React, { useState, useEffect } from "react";
import HintButton from "./HintButton";
import SubMenu from "./SubMenu";
import NewMenu from "./NewMenu";
import { format } from 'date-fns';
import newButton from '../img/add.png';
import '../App.css';

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

        if (event && event.target) {
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
            const isAddButtonClick = event.target.classList.contains('add-button');

            if (isOverlayClick || isCloseButtonClick || submitButtonClick || isNewButtonClick || isAddButtonClick){
                setNewMenuOpen(!isNewMenuOpen);
            }

        }
    };




    const updateGridData = async () => {
        await fetchData();
    };



    const [sortOrderTitlePend, setSortOrderTitlePend] = useState(null);
    const [sortOrderDatePend, setSortOrderDatePend] = useState(null);
    const [sortOrderUrgPend, setSortOrderUrgPend] = useState(null);
    const [lastSelectedColumn, setLastSelectedColumn] = useState(null);

    const toggleSortOrderTitlePend = () => {
        setSortOrderTitlePend(sortOrderTitlePend === 'asc' ? 'desc' : 'asc');
        setSortOrderDatePend(null); // Reset date sort order
        setSortOrderUrgPend(null); // Reset urgency sort order
        setLastSelectedColumn('title');
    };

    const toggleSortOrderDatePend = () => {
        setSortOrderDatePend(sortOrderDatePend === 'asc' ? 'desc' : 'asc');
        setSortOrderTitlePend(null); // Reset title sort order
        setSortOrderUrgPend(null); // Reset urgency sort order
        setLastSelectedColumn('date');
    };

    const toggleSortOrderPend = () => {
        setSortOrderUrgPend(sortOrderUrgPend === 'asc' ? 'desc' : 'asc');
        setSortOrderTitlePend(null); // Reset title sort order
        setSortOrderDatePend(null); // Reset date sort order
        setLastSelectedColumn('urgency');
    };





    // Function to sort buttons based on urgency
    const sortButtonsUrgPend = (buttons) => {
        if (sortOrderUrgPend!=null) {
            return buttons.slice().sort((a, b) => {
                const urgencyA = a.urgency;
                const urgencyB = b.urgency;

                if (sortOrderUrgPend === 'asc') {
                    return urgencyA - urgencyB;
                } else {
                    return urgencyB - urgencyA;
                }
            });
        } else {
            return buttons;
        }

    };


    const sortButtonsTitlePend = (buttons) => {
        if (sortOrderTitlePend!=null) {
            return buttons.slice().sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                return sortOrderTitlePend === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
            });
        } else {
            return buttons;
        }
    };

    const sortButtonsDatePend = (buttons) => {
        if (sortOrderDatePend!=null) {
            return buttons.slice().sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                return sortOrderDatePend === 'asc' ? dateA - dateB : dateB - dateA;
            });
        } else {
            return buttons;
        }
    };




    const renderArrowPend = (columnName) => {
        let sortOrder;
        if (columnName === 'title') {
            sortOrder = sortOrderTitlePend;
        } else if (columnName === 'date') {
            sortOrder = sortOrderDatePend;
        } else {
            sortOrder = sortOrderUrgPend;
        }

        if (lastSelectedColumn === columnName) {
            return sortOrder === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    };






    const [sortOrderTitleResolved, setSortOrderTitleResolved] = useState(null);
    const [sortOrderDateResolved, setSortOrderDateResolved] = useState(null);
    const [sortOrderUrgResolved, setSortOrderUrgResolved] = useState(null);
    const [lastSelectedColumnResolved, setLastSelectedColumnResolved] = useState(null);

    const toggleSortOrderTitleResolved = () => {
        setSortOrderTitleResolved(sortOrderTitleResolved === 'asc' ? 'desc' : 'asc');
        setSortOrderDateResolved(null);
        setSortOrderUrgResolved(null);
        setLastSelectedColumnResolved('title');
    };

    const toggleSortOrderDateResolved = () => {
        setSortOrderDateResolved(sortOrderDateResolved === 'asc' ? 'desc' : 'asc');
        setSortOrderTitleResolved(null);
        setSortOrderUrgResolved(null);
        setLastSelectedColumnResolved('date');
    };

    const toggleSortOrderResolved = () => {
        setSortOrderUrgResolved(sortOrderUrgResolved === 'asc' ? 'desc' : 'asc');
        setSortOrderTitleResolved(null);
        setSortOrderDateResolved(null);
        setLastSelectedColumnResolved('urgency');
    };

    const renderArrowResolved = (columnName) => {
        let sortOrder;
        if (columnName === 'title') {
            sortOrder = sortOrderTitleResolved;
        } else if (columnName === 'date') {
            sortOrder = sortOrderDateResolved;
        } else {
            sortOrder = sortOrderUrgResolved;
        }

        if (lastSelectedColumnResolved === columnName) {
            return sortOrder === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    };


    const sortButtonsTitleResolved = (buttons) => {
        if (sortOrderTitleResolved!=null) {
            if (sortOrderTitleResolved === 'asc') {
                return buttons.slice().sort((a, b) => a.title.localeCompare(b.title));
            } else {
                return buttons.slice().sort((a, b) => b.title.localeCompare(a.title));
            }
        } else {
            return buttons;
        }
    };

    const sortButtonsDateResolved = (buttons) => {
        if (sortOrderDateResolved!=null) {
            if (sortOrderDateResolved === 'asc') {
                return buttons.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
            } else {
                return buttons.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        } else {
            return buttons;
        }
    };

    const sortButtonsUrgResolved = (buttons) => {
        if (sortOrderUrgResolved!=null) {
            return buttons.slice().sort((a, b) => {
                const urgencyA = a.urgency;
                const urgencyB = b.urgency;

                if (sortOrderUrgResolved === 'asc') {
                    return urgencyA - urgencyB;
                } else {
                    return urgencyB - urgencyA;
                }
            });
        } else {
            return buttons;
        }
    };












    return (
        <div style={{ display: "inline", justifyContent: "center"}}>
            <div style={{ position: "relative", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h2>Pending Tasks</h2>
                </div>
                <div className={"task-row header-row"}>
                    <div className={"task-title"} onClick={toggleSortOrderTitlePend}>Title{renderArrowPend('title')}</div>
                    <div className={"task-date"} onClick={toggleSortOrderDatePend}>Date{renderArrowPend('date')}</div>
                    <div className={"task-urgency"} onClick={toggleSortOrderPend}>Urgency{renderArrowPend('urgency')}</div>
                </div>
                {sortButtonsTitlePend(sortButtonsDatePend(sortButtonsUrgPend(pendingButtons))).map((button) => (
                    <HintButton
                        key={button.id}
                        id={button.id}
                        title={button.title}
                        date={button.date ? format(new Date(button.date), 'M/d/yyyy') : ''}
                        status={button.status}
                        urgency={button.urgency}
                        onClick={() => handleButtonClick(button)}
                    />
                ))}
            </div>

            <div style={{ position: "absolute", top: 30, left: "75%", height: "100%" }}>
                <button className="new-button" onClick={toggleNewTaskMenu}>
                    <img className="add-button" src={newButton} alt={"Add task"} />
                </button>
            </div>

            {isNewMenuOpen && (
                <NewMenu onClose={toggleNewTaskMenu} updateGridData={updateGridData} />
            )}

            <div style = {{marginTop: 50}}>
                <h2>Resolved Tasks</h2>
                <div className={"task-row header-row"}>
                    <div className={"task-title"} onClick={toggleSortOrderTitleResolved}>Title{renderArrowResolved('title')}</div>
                    <div className={"task-date"} onClick={toggleSortOrderDateResolved}>Date{renderArrowResolved('date')}</div>
                    <div className={"task-urgency"} onClick={toggleSortOrderResolved}>Urgency{renderArrowResolved('urgency')}</div>
                </div>
                {sortButtonsTitleResolved(sortButtonsDateResolved(sortButtonsUrgResolved(resolvedButtons))).map((button) => (
                    <HintButton
                        key={button.id}
                        id={button.id}
                        title={button.title}
                        date={button.date ? format(new Date(button.date), 'M/d/yyyy') : ''}
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

