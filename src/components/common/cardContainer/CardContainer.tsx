import React, { CSSProperties, ReactNode } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonGrid } from '@ionic/react';
import styles from '../cardContainer/CardContainer.module.scss';
import { PositionProp, getPosition } from './utils/getPosition';

interface Props {
  title: string;
  children: ReactNode;
  position: PositionProp;
  style?: { [key: string]: any };
}

const CardContainer: React.FC<Props> = ({
  title,
  children,
  position,
  style,
}) => {
  return (
    <IonGrid>
      <IonCard
        style={style}
        className={getPosition(position) ? styles.start : styles.center}
      >
        {title && (
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
        )}
        {children}
      </IonCard>
    </IonGrid>
  );
};

export default CardContainer;
