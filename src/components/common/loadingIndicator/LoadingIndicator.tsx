import { IonSpinner } from '@ionic/react';
import style from './LoadingIndicator.module.scss';

const LoadingIndicator = () => {
  return (
    <div className={style.overlay}>
      <IonSpinner name="lines" />
    </div>
  );
};

export default LoadingIndicator;
