import React, { ReactNode } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonGrid } from '@ionic/react';
import styles from '../cardContainer/CardContainer.module.scss';
import { PositionProp, getPosition } from './utils/getPosition';

// Interface for Props
interface Props {
  title: string;
  children: ReactNode;
  position: PositionProp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: { [key: string]: any };
  right?: string | React.ReactElement;
}

// CardContainer component
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
        <div className={styles.border}></div>
        {/* Render the card header with the title */}
        {title && (
          <IonCardHeader>
            <IonCardTitle
              style={{
                fontSize: '28px',
                fontWeight: '700',
                top: '0',
              }}
            >
              {title}
            </IonCardTitle>
            {/* Render the content on the right side of the title */}
            {right && (
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  marginLeft: '440px',
                  verticalAlign: 'super',
                  position: 'absolute',
                  top: '2px',
                  justifyContent: 'center',
                }}
              >
                {right}
              </div>
            )}
          </IonCardHeader>
        )}
        {/* Render the children components */}
        {children}
      </IonCard>
    </IonGrid>
  );
};

export default CardContainer;
