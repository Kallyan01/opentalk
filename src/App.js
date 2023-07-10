import MainRoute from "./route/mainRoute";
import Loader from "./components/site/loader"
import "./css/Theme.css"
import "./App.css"
import Qnoti from "./components/site/Qnoti"
import { useSelector } from "react-redux";
function App() {
  const Theme = useSelector((state)=>state.userdet.theme)
  return (
    <div className={`App light themebag relative`}>
      <Qnoti/>
      <Loader/>
      <MainRoute/>
    </div>
  );
}

export default App;
