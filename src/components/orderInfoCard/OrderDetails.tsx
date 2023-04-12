import { IonContent, IonPage } from "@ionic/react";
import XCard from "../common/Header/XCard";
import styles from "../common/Header/XCard.module.scss";

const OrderDetails = () => {
  const data = [
    {
      title: "Order details",
      content: ["Order number: 382993844", "Order quantity: 3,000"],
      btnText: "Confirm details",
      btnLink: "/SelectWorkers",
    },
  ];
  return (
    <IonPage>
      <IonContent>
        {data.map((data) => {
          return (
            <XCard
              className={styles.center}
              title={data.title}
              content={data.content}
              btnText={data.btnText}
              btnLink={data.btnLink}
            />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default OrderDetails;
