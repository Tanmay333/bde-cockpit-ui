import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonImg,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import lohnpack from "../../static/assets/lohnpack.svg";
import SelectWorkersIcon from "../../static/assets/SelectWorkse";
import { useState } from "react";

const SelectWorkers = () => {
  const Workers = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handler = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid
          style={{
            marginTop: "10%",
            textAlign: "center",
          }}
        >
          <IonImg style={{ height: "55px" }} src={lohnpack} />
          <IonGrid
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IonCard
              style={{
                borderTop: "16px  solid #E20031",
                position: "relative",
                height: "369px",
                width: "759px",
                background: "#FFFFFF",
                boxshadow: "0px 5px 15px rgba(114, 114, 114, 0.15)",
                borderRadius: "15px",
              }}
            >
              <IonGrid>
                <IonCardHeader>
                  <IonCardTitle
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Number of workers
                  </IonCardTitle>
                </IonCardHeader>
              </IonGrid>

              <IonGrid
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                <IonList>
                  <IonCardContent>
                    How many of employees is working on the order?
                  </IonCardContent>
                </IonList>
              </IonGrid>

              <IonGrid
                style={{
                  //marginTop: "10%",
                  textAlign: "center",
                  width: "100%",
                  //bottom: "10%",
                }}
              >
                <IonRow>
                  {Workers.map((data, index) => (
                    <div
                      key={data.id}
                      style={{
                        // display: "flex",
                        // flexDirection: "row",
                        textAlign: "center",
                        height: "55px",
                        width: "26px",
                        margin: "10px",
                      }}
                      onClick={() => handler(index)}
                    >
                      <SelectWorkersIcon
                        isSelected={selectedIndex >= index ? true : false}
                      />
                    </div>
                  ))}
                </IonRow>
              </IonGrid>
            </IonCard>
          </IonGrid>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectWorkers;
