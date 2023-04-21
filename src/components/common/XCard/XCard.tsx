import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonList,
  IonRow,
} from '@ionic/react';
import '../XCard/XCard.module.scss';

interface Props {
  title: string;
  content?: string[];
  btnText?: string;
  btnLink?: string;
  className: string;
}

const XCard: React.FC<Props> = ({
  title,
  content,
  btnText,
  btnLink,
  className,
}) => {
  return (
    <IonGrid>
      {className && (
        <IonCard className={className}>
          {title && (
            <IonGrid>
              <IonCardHeader>
                <IonCardTitle
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
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
                      fontSize: '16px',
                      fontWeight: '400',
                      padding: '10px',
                    }}
                    key={i}
                  >
                    <IonRow>
                      <IonList className="list">{content}</IonList>
                    </IonRow>
                  </IonCardContent>
                );
              })}
            </IonGrid>
          )}
          {btnText && btnLink && (
            <IonGrid
              style={{
                // marginTop: "10%",
                textAlign: 'center',
                width: '100%',
                //bottom: "10%",
              }}
            >
              <IonCol size="12">
                <IonButton
                  href={btnLink}
                  type="submit"
                  //onClick={() => btnLink}
                  fill="solid"
                  style={{
                    width: '210px',
                    height: '50px',
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
