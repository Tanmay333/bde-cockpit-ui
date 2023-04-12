import { IonHeader, IonToolbar } from "@ionic/react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <IonHeader>
      <IonToolbar className={styles.toolbar}>Header</IonToolbar>
    </IonHeader>
  );
};

export default Header;
