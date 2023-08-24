import { IonCardSubtitle } from '@ionic/react';
import Red1 from '../../static/assets/images/Red1.svg';
import Green1 from '../../static/assets/images/Green1.svg';
import styles from './OrderProcessSummary.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';

const ProductionVsDowntime: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const translation = useTranslations();
  const Productionsincetime =
    state.data.process.currentPhaseDetails.runningSince;
  const downtimesincetime =
    state.data.process.currentPhaseDetails.downtimeSince;

  const currentTime = new Date().getTime();
  const Currentproductiontime = Productionsincetime
    ? (currentTime - new Date(Productionsincetime).getTime()) / 1000
    : 0;
  const Currentdowntime = downtimesincetime
    ? (currentTime - new Date(downtimesincetime).getTime()) / 1000
    : 0;

  const Totalproduction = state.data.process.currentPhaseDetails.totalUptime;
  const Totaldowntime = state.data.process.currentPhaseDetails.totalDowntime;

  const formattotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const totalProductionMinutes = Totalproduction ? Number(Totalproduction) : 0;
  const totalDowntimeMinutes = Totaldowntime ? Number(Totaldowntime) : 0;

  const sumofProdTime = Currentproductiontime + totalProductionMinutes;
  const sumofDowntime = Currentdowntime + totalDowntimeMinutes;

  const TotalProdTime = formattotalTime(sumofProdTime);
  const TotalDowntime = formattotalTime(sumofDowntime);

  return (
    <IonCardSubtitle className={styles.ionRightTop}>
      <div>
        {' '}
        <img src={Green1} alt={'status'} /> {TotalProdTime}{' '}
        {translation.text.production} <br />
        <img src={Red1} alt={'status'} /> {TotalDowntime}{' '}
        {translation.text.downTime}
      </div>
    </IonCardSubtitle>
  );
};
export default ProductionVsDowntime;
