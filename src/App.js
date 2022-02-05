import styles from "./App.module.css";
import { useState } from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import Card from "./components/Card/Card";
import Target from "./components/Target/Target";
import { fetchImages } from "./redux/actions";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const [search, setSearch] = useState("");
  let [inputValue, setInputValue] = useState([]);
  const dispatch = useDispatch();
  const imgList = useSelector((state) => state.image.list);
  const [_imgList, setList] = useState(imgList);

  const handleChange = (e) => setSearch(e.target.value);
  const handleOnKeyDown = (e) => {
    if (search && e.key === `Enter`) {
      e.preventDefault();
      dispatch(fetchImages(search));
      const splittedInputValue = [...search.split(" ").filter((e) => e !== "")];
      setInputValue(splittedInputValue);
    }
  };

  const removeDraggedImg = (id) => {
    const filteredList = imgList.filter((item) => item.id != id);
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
      {imgList.map((image, index) => (
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
