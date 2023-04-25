import React, { ReactNode } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonGrid } from '@ionic/react';
import styles from '../cardContainer/CardContainer.module.scss';

interface Props {
  title: string;
  children: ReactNode;
}

const CardContainer: React.FC<Props> = ({ title, children }) => {
  return (
    <IonGrid>
      <IonCard className={styles.start}>
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
