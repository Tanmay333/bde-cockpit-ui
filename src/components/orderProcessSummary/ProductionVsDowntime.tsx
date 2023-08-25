import { IonCardSubtitle } from '@ionic/react';
import Red1 from '../../static/assets/images/Red1.svg';
import Green1 from '../../static/assets/images/Green1.svg';
import styles from './OrderProcessSummary.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';

const ProductionVsDowntime: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const translation = useTranslations();
  const productionSinceTime =
    state.data.process.currentPhaseDetails.runningSince;
  const downtimesincetime =
    state.data.process.currentPhaseDetails.downtimeSince;

  const currentTime = new Date().getTime();
  const currentProductionTime = productionSinceTime
    ? (currentTime - new Date(productionSinceTime).getTime()) / 1000
    : 0;
  const currentDowntime = downtimesincetime
    ? (currentTime - new Date(downtimesincetime).getTime()) / 1000
    : 0;

  const totalProduction = state.data.process.currentPhaseDetails.totalUptime;
  const totalDowntime = state.data.process.currentPhaseDetails.totalDowntime;

  const formattotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const totalProductionMinutes = totalProduction ? Number(totalProduction) : 0;
  const totalDowntimeMinutes = totalDowntime ? Number(totalDowntime) : 0;

  const sumofProdTime = currentProductionTime + totalProductionMinutes;
  const sumofDowntime = currentDowntime + totalDowntimeMinutes;

  const totalProdTime = formattotalTime(sumofProdTime);
  const totalDownTime = formattotalTime(sumofDowntime);

  return (
    <IonCardSubtitle className={styles.ionRightTop}>
      <div>
        {' '}
        <img src={Green1} alt={'status'} /> {totalProdTime}{' '}
        {translation.text.production} <br />
        <img src={Red1} alt={'status'} /> {totalDownTime}{' '}
        {translation.text.downTime}
      </div>
    </IonCardSubtitle>
  );
};
export default ProductionVsDowntime;
