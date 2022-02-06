import styles from "./DroppedImgContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { formSubmitted } from "../../redux/actions";

const DroppedImgContainer = ({ isFormSubmitted }) => {
  const dispatch = useDispatch();
  let droppedImgList = useSelector((state) => state.image.droppedImgList);
  console.log(`droppedImgList***********`, droppedImgList);

  useEffect(() => {
    if (isFormSubmitted) dispatch(formSubmitted(isFormSubmitted));
  }, [isFormSubmitted]);

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
