import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import styles from "./CartLink.module.css";
import { getMemoizedNumItemsSelector } from "./cartSlice";

export function CartLink() {
  const numItems = useAppSelector(getMemoizedNumItemsSelector);
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>
        🛒&nbsp;&nbsp;{numItems ? numItems : "Cart"}
      </span>
    </Link>
  );
}
