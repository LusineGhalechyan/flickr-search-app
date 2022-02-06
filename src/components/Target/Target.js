import styles from "./Target.module.css";
import { DropTarget } from "react-dnd";
import { useEffect, useState } from "react";
import { clickedTarget, fetchDropImages } from "../../redux/actions";
import { useDispatch } from "react-redux";

function collect(connect, monitor) {
  let item = monitor.getItem();

  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item,
    isDragging: !!item,
  };
}

const Target = (props) => {
  const dispatch = useDispatch();

  const [draggedItem, setDraggedItem] = useState([]);
  const { connectDropTarget, hovered, item, isDragging } = props;

  const backgroundColor = hovered ? "#ccffff" : "#66ccff";

  useEffect(() => {
    if (isDragging) {
      const itemContains = draggedItem.find(
        (i) => i.image.id === item.image.id
      );
      if (!itemContains) {
        item.image.category = props.target;
        draggedItem.push(item);
        dispatch(fetchDropImages(draggedItem));
      }
    }
  });
  const handleClick = () => {
    dispatch(clickedTarget(props.target));
    props.customClickEvent();
  };

  useEffect(() => {
    if (props.isFormSubmitted) setDraggedItem([]);
  }, [props.isFormSubmitted]);

  return connectDropTarget(
    <div
      className={styles.targetBox}
      onClick={handleClick}
      style={{ background: backgroundColor }}
    >
      {props.children}
    </div>
  );
};

export default DropTarget("img", {}, collect)(Target);
