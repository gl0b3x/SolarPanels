import "./App.css";
import AppRouter from "./Components/AppRouter";
import { DataProvider } from "./Context";

function App() {
  return (
    <DataProvider>
      <AppRouter />
    </DataProvider>
  );
}

export default App;
