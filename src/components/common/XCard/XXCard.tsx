import React, { ReactNode } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonGrid } from '@ionic/react';
import '../XCard/XCard.module.scss';

interface Props {
  title: string;
  className: string;
  children: ReactNode;
}

const XXCard: React.FC<Props> = ({ title, className, children }) => {
  return (
    <IonGrid>
      {className && (
        <IonCard className={className}>
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
      )}
    </IonGrid>
  );
};

export default XXCard;
