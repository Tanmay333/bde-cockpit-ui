import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonList,
  IonPage,
} from "@ionic/react";
import lohnpack from "../../static/assets/lohnpack.svg";
import workers from "../../static/assets/selectworker.svg";

const SelectWorkers = () => {
  const Workers = [
    {
      id: 1,
      icon: workers,
    },
    {
      id: 2,
      icon: workers,
    },
    {
      id: 3,
      icon: workers,
    },
    {
      id: 4,
      icon: workers,
    },
    {
      id: 5,
      icon: workers,
    },
    {
      id: 6,
      icon: workers,
    },
    {
      id: 7,
      icon: workers,
    },
  ];
  const handler = function () {};

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
                <IonCol size="12">
                  {Workers.map((Icon, index) => (
                    <IonIcon
                      onClick={() => handler()}
                      key={index}
                      style={{
                        height: "55px",
                        width: "26px",
                        margin: "10px",
                      }}
                      src={Icon.icon}
                    />
                  ))}
                </IonCol>
              </IonGrid>
            </IonCard>
          </IonGrid>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectWorkers;
