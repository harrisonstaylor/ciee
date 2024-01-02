// import React, { useState, useEffect } from "react";
// import HintButton from "./HintButton";
// import SubMenu from "./SubMenu";
//
// function Grid() {
//     const [buttons, setButtons] = useState([
//         { id: 1, text: 'Button 1', visible: true, long: 0, lat: 0, status: 'pending', dateCreated: new Date(), urgency: 3 },
//         { id: 2, text: 'Button 2', visible: true, long: 0, lat: 0, status: 'resolved', dateCreated: new Date(), urgency: 5 },
//         // ... other buttons
//     ]);
//
//     const [resolvedButtons, setResolvedButtons] = useState([]);
//     const [pendingButtons, setPendingButtons] = useState([]);
//
//     const [clickedButton, setClickedButton] = useState(null);
//     const [isSubMenuOpen, setSubMenuOpen] = useState(false);
//
//     useEffect(() => {
//         const resolved = buttons.filter(button => button.status === "resolved");
//         const pending = buttons.filter(button => button.status === "pending");
//
//         setResolvedButtons(resolved);
//         setPendingButtons(pending);
//     }, [buttons]);
//
//     const handleButtonClick = (button) => {
//         setClickedButton(button);
//         setSubMenuOpen(true);
//     };
//
//     const closeSubMenu = () => {
//         setSubMenuOpen(false);
//         setClickedButton(null);
//     };
//
//     return (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//             <div>
//                 <h2>Resolved Tasks</h2>
//                 {resolvedButtons.map((button) => (
//                     button.visible && (
//                         <HintButton
//                             key={button.id}
//                             text={button.text}
//                             dateCreated={button.dateCreated}
//                             status={button.status}
//                             urgency={button.urgency}
//                             onClick={() => handleButtonClick(button)}
//                         />
//                     )
//                 ))}
//             </div>
//             <div>
//                 <h2>Pending Tasks</h2>
//                 {pendingButtons.map((button) => (
//                     button.visible && (
//                         <HintButton
//                             key={button.id}
//                             text={button.text}
//                             dateCreated={button.dateCreated}
//                             status={button.status}
//                             urgency={button.urgency}
//                             onClick={() => handleButtonClick(button)}
//                         />
//                     )
//                 ))}
//             </div>
//             {isSubMenuOpen && clickedButton && (
//                 <SubMenu onClose={closeSubMenu} buttonData={clickedButton} />
//             )}
//         </div>
//     );
// }
//
// export default Grid;



// Grid.js
import React, { useState, useEffect } from "react";
import HintButton from "./HintButton";
import SubMenu from "./SubMenu";

function Grid() {
    const [buttons, setButtons] = useState([]);
    const [resolvedButtons, setResolvedButtons] = useState([]);
    const [pendingButtons, setPendingButtons] = useState([]);
    const [clickedButton, setClickedButton] = useState(null);
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("http://localhost:3001/buttons", {
                    method: "GET"
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

        fetchData();
    }, []);

    const handleButtonClick = (button) => {
        setClickedButton(button);
        setSubMenuOpen(true);
    };

    const closeSubMenu = () => {
        setSubMenuOpen(false);
        setClickedButton(null);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
            {isSubMenuOpen && clickedButton && (
                <SubMenu onClose={closeSubMenu} buttonData={clickedButton} />
            )}
        </div>
    );
}

export default Grid;

