
import Sendmsg from "./components/sendmsg";
import User from "./components/user";
import { useDispatch, useSelector } from "react-redux/es/exports";
import MainRoute from "./route/mainRoute";
import { setNav } from "./store/features/siteControll";
function App() {
  return (
    <div className="App">
      <MainRoute/>
    </div>
  );
}

export default App;
