import XCard from "../common/Header/XCard";
import { IonContent, IonPage, IonRow } from "@ionic/react";
import styles from "../common/Header/XCard.module.scss";
import style from "./OrderInforCard.module.scss";
import OrderInfoCard from "./OrderInfoCard";
import Header from "../common/Header/Header";
import Phase from "../common/Header/Phase";
import index from "../orderInfoCard/SelectWorkers";

const MembersDetails = () => {
  const data = [
    {
      title: "Order details",
      btnText: "Scan bar-code",
      btnLink: "/OrderDetails",
      content: [
        "Order number: 382993844",
        "Order quantity: 3,000",
        "Members: {index}",
      ],
    },
    {
      title: "Phase details",
      btnText: "End mounting",
      content: ["Start time: -- --", "End time: -- --"],
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

export default MembersDetails;
