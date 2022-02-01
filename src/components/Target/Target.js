import styles from "./Target.module.css";
import { DropTarget } from "react-dnd";

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  };
}

const Target = (props) => {
  const { connectDropTarget, hovered, item } = props;
  return (
    <div className={styles.targetContainer}>
      <div className={styles.targetBox}>{props.children}</div>
    </div>
  );
};

export default DropTarget("img", {}, collect)(Target);
