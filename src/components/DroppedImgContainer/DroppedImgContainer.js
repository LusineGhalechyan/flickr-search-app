import styles from "./DroppedImgContainer.module.css";
import { useSelector } from "react-redux";

const DroppedImgContainer = ({ isFormSubmitted }) => {
  let target = useSelector((state) => state.image.target);
  let droppedImgList = useSelector(
    (state) => state.image.droppedImgList
  ).filter((e) => e.image.category === target);

  return (
    <div className={styles.droppedImgContainer}>
      {!isFormSubmitted &&
        droppedImgList.map((item, index) => (
          <img key={index} src={item.imgSrc} />
        ))}
    </div>
  );
};

export default DroppedImgContainer;
