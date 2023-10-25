import logo from './logo.svg';
import './App.css';
import GPS from "./Components/GPS";
import Map from "./Components/Map";
let lat;
let long;
function App() {


    // eslint-disable-next-line no-undef
    // const [data, setData] = React.useState(null);
    //
    // // eslint-disable-next-line no-undef
    // React.useEffect(() => {
    //     fetch("/api")
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message));
    // }, []);


  return (
    <div className="body">

        <GPS />
        <Map />

      <div className="topnav">
        <a href="#abt">Map</a>
        <a href="#exp">People</a>
        <a href="#edu">Leaderboard</a>
      </div>






    </div>
  );
}
export default App;
