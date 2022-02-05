import styles from "./App.module.css";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "./constants/baseURL";
import { apiKey, photosMethod } from "./constants/apiDetails";
import SearchBox from "./components/SearchBox/SearchBox";
import Card from "./components/Card/Card";
import Target from "./components/Target/Target";

const App = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  let [inputValue, setInputValue] = useState([]);

  const handleChange = (e) => setSearch(e.target.value);
  const handleOnKeyDown = (e) => {
    if (search && e.key === `Enter`) {
      e.preventDefault();
      fetchImages();
      const splittedInputValue = [...search.split(" ").filter((e) => e !== "")];
      setInputValue(splittedInputValue);
    }
  };

  const fetchImages = async () => {
    try {
      const result = await axios.get(
        `${baseURL}method=${photosMethod}&tags=${search.replace(
          " ",
          ","
        )}&api_key=${apiKey}&per_page=5&page=1`
      );

      var parser = new DOMParser();
      var doc = parser.parseFromString(result.data.toString(), "text/xml");
      Array.from(doc.getElementsByTagName("photo")).forEach((e) => {
        if (list.length === 5) {
          list.shift();
        }

        list.push({
          id: e.attributes["id"].value,
          serverId: e.attributes["server"].value,
          secretId: e.attributes["secret"].value,
        });
      });
      setSearch("");
      setList(list);
    } catch (e) {
      console.log(`error`, e);
    }
  };

  const removeDraggedImg = (id) => {
    const filteredList = list.filter((item) => item.id != id);
    setList(filteredList);
  };

  return (
    <div>
      <SearchBox
        value={search}
        onChange={handleChange}
        onKeyDown={handleOnKeyDown}
        onSubmit={fetchImages}
      />
      {list.map((image, index) => (
        <Card
          key={index}
          imgSrc={`https://live.staticflickr.com/${image.serverId}/${image.id}_${image.secretId}_s.jpg
          `}
          handleDrop={() => removeDraggedImg(image.id)}
          image={image}
        />
      ))}
      <div className={styles.targetContainer}>
        {inputValue.map((target, index) => (
          <Target key={index}>{target}</Target>
        ))}
      </div>
    </div>
  );
};

export default App;
