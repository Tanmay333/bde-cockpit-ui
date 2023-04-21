import XCard from "../common/Header/XCard";
import { IonPage, IonRow, IonContent } from "@ionic/react";
import styles from "../common/Header/XCard.module.scss";
import OrderInfoCard from "./OrderInfoCard";
import Header from "../common/Header/Header";
import Phase from "../common/Header/Phase";

const ConfirmOrderdetails = () => {
  const data = [
    {
      title: "Order details",
      btnText: "Scan bar-code",
      btnLink: "/OrderDetails",
      content: ["Order number: 382993844", "Order quantity: 3,000"],
    },
    {
      title: "Phase details",
      //btnText: "End mounting",
      content: ["Start time: 8:00", "End time: -- --"],
    },
  ];
  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard
          title={"Name of order"}
          subtitle={"Machine off"}
          description={"Time details"}
        />
        <Phase />
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
      </IonContent>
    </IonPage>
  );
};

export default ConfirmOrderdetails;
