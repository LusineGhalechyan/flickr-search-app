import styles from "./Card.module.css";

const Card = ({ imgSrc }) => {
  return <img src={imgSrc} className={styles.cardImg} />;
};

export default Card;
