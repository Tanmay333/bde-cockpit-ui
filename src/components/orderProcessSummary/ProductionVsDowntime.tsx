import { IonCardSubtitle, IonIcon } from '@ionic/react';
import styles from './OrderProcessSummary.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';
import PlannedVsIncident from './PlannedVsIncident';
import { ellipse } from 'ionicons/icons';

const ProductionVsDownTimes: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const translation = useTranslations();
  const productionSinceTime =
    state.data.process.currentPhaseDetails.runningSince;

  const currentTime = new Date().getTime();
  const currentProductionTime = productionSinceTime
    ? (currentTime - new Date(productionSinceTime).getTime()) / 1000
    : 0;

  const totalProduction = state.data.process.currentPhaseDetails.totalUptime;

  const formattotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const totalProductionMinutes = totalProduction ? Number(totalProduction) : 0;

  const sumofProductionTime = currentProductionTime + totalProductionMinutes;

  const totalProductionTime = formattotalTime(sumofProductionTime);

  return (
    <IonCardSubtitle className={styles.ionRightTop}>
      <div>
        <IonIcon icon={ellipse} className={styles.production} />
        {totalProductionTime} h {translation.text.production} {'  '}
        <PlannedVsIncident />
      </div>
    </IonCardSubtitle>
  );
};
export default ProductionVsDownTimes;
