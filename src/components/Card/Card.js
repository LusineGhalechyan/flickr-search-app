import styles from "./Card.module.css";
import { DragSource } from "react-dnd";

const imgSource = {
  beginDrag(props) {
    console.log("_BEGIN_DRAG_props", props);
    // return props;
    return { id: props.image.id };
  },
  endDrag(props, monitor, component) {
    console.log(`end_Drag_props`, props.image.id);
    // console.log(`monitor.getDropResult()`, monitor.getDropResult());
    // console.log(`props.handleDrop`, props.handleDrop(props.image.id));
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(props.image.id);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

const Card = (props) => {
  const { isDragging, connectDragSource } = props;
  const opacity = isDragging ? 0.5 : 1;

  return connectDragSource(
    <img src={props.imgSrc} className={styles.cardImg} style={{ opacity }} />
  );
};

export default DragSource("img", imgSource, collect)(Card);
