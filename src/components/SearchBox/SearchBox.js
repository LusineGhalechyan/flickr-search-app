import styles from "./SearchBox.module.css";
import { Form } from "react-bootstrap";
import MyButton from "../MyButton/MyButton";

const SearchBox = ({ value, onChange, onKeyDown, onSubmit }) => {
  return (
    <div className={styles.searchBoxContainer}>
      <Form>
        <input
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <MyButton variant="light" onClick={onSubmit}>
          Search
        </MyButton>
      </Form>
    </div>
  );
};

export default SearchBox;
