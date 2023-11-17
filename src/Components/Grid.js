// Grid.js
import React, { useState, useEffect } from "react";
import HintButton from "./HintButton";
import SubMenu from "./SubMenu";

function Grid() {
    const [buttons, setButtons] = useState([
        { id: 1, text: 'Button 1', visible: true, long: 0, lat: 0 },
        { id: 2, text: 'Button 2', visible: true, long: 0, lat: 0 },
        { id: 3, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 4, text: 'Button 4', visible: true, long: 0, lat: 0 },
        { id: 5, text: 'Button 5', visible: true, long: 0, lat: 0 },
        { id: 6, text: 'Button 6', visible: true, long: 0, lat: 0 },
        { id: 7, text: 'Button 7', visible: true, long: 0, lat: 0 },
        { id: 8, text: 'Button 8', visible: true, long: 0, lat: 0 },
        { id: 9, text: 'Button 9', visible: true, long: 0, lat: 0 },
    ]);

    const [clickedButton, setClickedButton] = useState(null);
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [geolocation, setGeolocation] = useState({ long: 0, lat: 0 });

    useEffect(() => {
        const fetchGeolocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                setGeolocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
            } catch (error) {
                console.error("Geolocation error:", error);
            }
        };

        if ("geolocation" in navigator) {
            fetchGeolocation();
        } else {
            console.error("Geolocation is not available in this browser.");
        }
    }, []);

    const handleButtonClick = (button) => {
        setClickedButton(button);
        setSubMenuOpen(true);
    };

    const closeSubMenu = () => {
        setSubMenuOpen(false);
        setClickedButton(null);
    };

    const updateButtonVisibility = () => {
        if (clickedButton) {
            setButtons((prevButtons) =>
                prevButtons.map((b) =>
                    b.id === clickedButton.id &&
                    b.long === geolocation.long &&
                    b.lat === geolocation.lat
                        ? { ...b, visible: false }
                        : b
                )
            );
        }
    };

    return (
        <div style={{ display: "block", justifyContent: "center" }}>
            {buttons.map((button) => (
                button.visible && (
                    <HintButton
                        key={button.id}
                        text={button.text}
                        long={button.long}
                        lat={button.lat}
                        onClick={() => handleButtonClick(button)}
                    />
                )
            ))}
            {isSubMenuOpen && clickedButton && (
                <SubMenu onClose={closeSubMenu} buttonData={clickedButton} />
            )}
        </div>
    );
}

export default Grid;
