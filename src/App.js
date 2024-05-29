import "./App.css";
import Currency_converter from "./components/currency_converter/currency_converter";
function App() {
  return (
    <>
      <div className="h-screen px-5 bg-gray-100 flex flex-col items-center justify-center">
        <Currency_converter />
      </div>
    </>
  );
}

export default App;
