import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [collectionData, setColledctionData] = useState([]);
  const [name, setName] = useState("");
  const collection = async () => {
    const getData = await axios.get("https://randomuser.me/api/?results=20");
    setColledctionData(
      await getData.data.results.map((e) => {
        return {
          gender: e.gender,
          name: e.name.first + " " + e.name.last,
          pic: e.picture.thumbnail
        };
      })
    );
  };
  useEffect(() => {
    collection();
  }, []);
  return (
    <div className="App">
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div>
        {collectionData
          .filter((f) => {
            return f.name.includes(name);
          })
          .map((e) => (
            <>
              <p>{e.gender}</p>
              <p>{e.name}</p>
              <img src={e.pic} />
            </>
          ))}
      </div>
    </div>
  );
}
