import React, { CSSProperties, ReactNode } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
} from '@ionic/react';
import styles from '../cardContainer/CardContainer.module.scss';
import { PositionProp, getPosition } from './utils/getPosition';

interface Props {
  title: string;
  children: ReactNode;
  position: PositionProp;
  style?: { [key: string]: any };
  right?: string | React.ReactElement;
}

const CardContainer: React.FC<Props> = ({
  title,
  children,
  position,
  style,
  right = '',
}) => {
  return (
    <IonGrid>
      <IonCard
        style={style}
        className={getPosition(position) ? styles.start : styles.center}
      >
        {title && (
          <IonCardHeader>
            {right && (
              <IonCol
                size="8.3"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'end',
                  alignItems: 'end',
                  fontSize: '10px',
                }}
              >
                {right}
              </IonCol>
            )}
            <IonCardTitle
              style={{
                fontSize: '28px',
                fontWeight: '700',
              }}
            >
              {title}
            </IonCardTitle>
          </IonCardHeader>
        )}
        {children}
      </IonCard>
    </IonGrid>
  );
};

export default CardContainer;
