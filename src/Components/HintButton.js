
import "../App.css";
function HintButton({ text, onClick, long, lat }) {
    return (
        <button onClick={onClick} className={"tile"}>
            {text}
        </button>
    );
}


export default HintButton;