import {useState} from "react";
import HintButton from "./HintButton";

function Grid() {
    const [buttons, setButtons] = useState([
        { id: 1, text: 'Button 1', visible: true, long: 0, lat: 0 },
        { id: 2, text: 'Button 2', visible: true, long: 0, lat: 0 },
        { id: 3, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 4, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 5, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 6, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 7, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 8, text: 'Button 3', visible: true, long: 0, lat: 0 },
        { id: 9, text: 'Button 3', visible: true, long: 0, lat: 0 },
    ]);


    const handleButtonClick = (id) => {
        let long;
        let lat;
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(
                (position) => {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            console.error('Geolocation is not available in this browser.');
        }
        console.log(long, lat);

        setButtons((prevButtons) =>
            prevButtons.map((button) =>
                button.id === id && button.long === long && button.lat === lat ? { ...button, visible: false } : button
            )
        );
    };


    return (
        <div style={{ display: 'block', justifyContent: "center"}}>
            {buttons.map((button) => (
                button.visible && (
                    <HintButton
                        key={button.id}
                        text={button.text}
                        long={button.long}
                        lat={button.lat}
                        onClick={() => handleButtonClick(button.id)}
                    />
                )
            ))}
        </div>
    );
}

export default Grid;