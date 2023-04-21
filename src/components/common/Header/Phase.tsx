import { IonGrid, IonInput, IonRow, IonCard, IonCol } from "@ionic/react";
import aaa from "../Phase.module.scss";

// interface Props {
//   isSelected: boolean;
// }
// function clickablediv() {
//   ".aaa".click(function () {
//     this.addClass("selected");
//   });
// };
// function clickablediv() {
//   document.getElementById("aaa")?.style.background = "green";

// }
const Phase = () => {
  return (
    <IonGrid>
      <IonCol>
        <IonGrid>
          <IonRow>
            <div
              //id="aaa"
              //onClick={clickablediv}

              style={{
                height: "39px",
                width: "105px",
                background: "#E0E0E0",
                borderRadius: "5px",
                margin: "3px",
              }}
            ></div>
            <a href="/SelectWorkers">
              <div
                style={{
                  height: "39px",
                  width: "101px",
                  background: "#E0E0E0",
                  borderRadius: "5px",
                  margin: "3px",
                }}
              ></div>
            </a>
            <div
              style={{
                height: "39px",
                width: "316px",
                background: "#2AD127",
                borderRadius: "5px",
                margin: "3px",
              }}
            ></div>
            <div
              style={{
                height: "39px",
                width: "100px",
                background: "#E0E0E0",
                borderRadius: "5px",
                margin: "3px",
              }}
            ></div>
            <div
              style={{
                height: "39px",
                width: "101px",
                background: "#E0E0E0",
                borderRadius: "5px",
                margin: "3px",
              }}
            ></div>
          </IonRow>
        </IonGrid>
      </IonCol>
    </IonGrid>
  );
};

export default Phase;
