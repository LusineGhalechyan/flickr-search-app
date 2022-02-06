import styles from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import Card from "./components/Card/Card";
import Target from "./components/Target/Target";
import { dropImages, fetchImages, formSubmitted } from "./redux/actions";
import { useSelector, useDispatch } from "react-redux";
import DroppedImgContainer from "./components/DroppedImgContainer/DroppedImgContainer";

const App = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  let [inputValue, setInputValue] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const imgList = useSelector((state) => state.image.list);

  const handleChange = (e) => setSearch(e.target.value);
  const handleOnKeyDown = (e) => {
    if (search && e.key === `Enter`) {
      e.preventDefault();
      dispatch(fetchImages(search));
      const splittedInputValue = [...search.split(" ").filter((e) => e !== "")];
      setInputValue(splittedInputValue);
      setIsFormSubmitted(true);
    }
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
          handleDrop={() => dispatch(dropImages(image.id))}
          image={image}
        />
      ))}
      <div className={styles.targetContainer}>
        {inputValue.map((target, index) => (
          <Target
            key={index}
            id={index}
            customClickEvent={() => setIsFormSubmitted(false)}
          >
            {target}
          </Target>
        ))}
      </div>
      <DroppedImgContainer isFormSubmitted={isFormSubmitted} />
    </div>
  );
};

export default App;
