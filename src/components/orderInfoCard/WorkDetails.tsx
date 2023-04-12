import XCard from "../common/Header/XCard";
import { IonRow } from "@ionic/react";
import styles from "../common/Header/XCard.module.scss";

const WorkDetails = () => {
  const data = [
    {
      title: "Order details",
      btnText: "Scan bar-code",
      btnLink: "/OrderDetails",
      content: ["Order number: -- --", "Order quantity: -- --"],
    },
    {
      title: "Phase details",
      btnText: "End mounting",
      content: ["Start time: -- --", "End time: -- --"],
    },
  ];
  return (
    <IonRow>
      {data.map((data) => {
        return (
          <XCard
            className={styles.start}
            title={data.title}
            content={data.content}
            btnText={data.btnText}
            btnLink={data.btnLink}
          />
        );
      })}
    </IonRow>
  );
};

export default WorkDetails;
