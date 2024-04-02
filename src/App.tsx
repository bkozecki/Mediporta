import { baseUrl } from "./api/api";

function App() {
  const fetchFn = async () => {
    fetch(
      "https://api.stackexchange.com/docs/tags#order=desc&sort=popular&filter=default&site=stackoverflow"
    )
      .then((data) => data.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <label>Total amount of tags</label>
      <input />
      <button onClick={fetchFn}>FETCH</button>
    </div>
  );
}

export default App;
