import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
} from "@ionic/react";

const XCard = (props: {
  title: string;
  content?: string[];
  btnText?: string;
  btnLink?: string;
  className: any;
}) => {
  const { title, content, btnText, btnLink, className } = props;
  return (
    <IonGrid>
      {className && (
        <IonCard className={className}>
          {title && (
            <IonGrid>
              <IonCardHeader>
                <IonCardTitle
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                  }}
                >
                  {title}
                </IonCardTitle>
              </IonCardHeader>
            </IonGrid>
          )}
          {content && (
            <IonGrid>
              {content.map((content, i) => {
                return (
                  <IonCardContent
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                    key={i}
                  >
                    {content}
                  </IonCardContent>
                );
              })}
            </IonGrid>
          )}
          {btnText && btnLink && (
            <IonGrid
              style={{
                marginTop: "10%",
                textAlign: "center",
                width: "100%",
                bottom: "10%",
              }}
            >
              <IonCol size="12">
                <IonButton
                  href={btnLink}
                  type="submit"
                  //onClick={() => btnLink}
                  fill="solid"
                  style={{
                    width: "210px",
                    height: "50px",
                  }}
                >
                  {btnText}
                </IonButton>
              </IonCol>
            </IonGrid>
          )}
        </IonCard>
      )}
    </IonGrid>
  );
};

export default XCard;
