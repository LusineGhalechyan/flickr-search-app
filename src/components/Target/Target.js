import styles from "./Target.module.css";
import { DropTarget } from "react-dnd";
import { useEffect, useState } from "react";
import { fetchDropImages } from "../../redux/actions";
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
        draggedItem.push(item);
        dispatch(fetchDropImages(draggedItem));
      }
    }
  });

  console.log(`draggedItem`, draggedItem);

  return connectDropTarget(
    <div
      className={styles.targetBox}
      onClick={props.customClickEvent}
      style={{ background: backgroundColor }}
    >
      {props.children}
    </div>
  );
};

export default DropTarget("img", {}, collect)(Target);
