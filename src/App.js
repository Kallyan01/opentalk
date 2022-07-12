import MainRoute from "./route/mainRoute";
import Loader from "./components/site/loader"
import "./css/Theme.css"
import "./App.css"
import Qnoti from "./components/site/Qnoti"
function App() {
  return (
    <div className="App relative">
      <Qnoti/>
      <Loader/>
      <MainRoute/>
    </div>
  );
}

export default App;
