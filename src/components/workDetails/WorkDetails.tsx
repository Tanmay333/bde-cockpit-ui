import XCard from '../common/XCard/XCard';
import { IonRow } from '@ionic/react';
import styles from '../common/XCard/XCard.module.scss';

const WorkDetails: React.FC = () => {
  const data = [
    {
      title: 'Order details',
      btnText: 'Scan bar-code',
      btnLink: '/OrderDetails',
      content: ['Order number: -- --', 'Order quantity: -- --'],
    },
    {
      title: 'Phase details',
      btnText: 'End mounting',
      content: ['Start time: -- --', 'End time: -- --'],
    },
  ];
  return (
    <IonRow>
      {data.map((data, index) => {
        return (
          <XCard
            key={index}
            className={styles.start}
            title={data.title}
            content={data.content}
            btnText={data.btnText}
            btnLink={data.btnLink}
          />
        );
      })}
    </IonRow>
  );
};

export default WorkDetails;
