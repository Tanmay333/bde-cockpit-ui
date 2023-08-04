import { IonRow, IonImg } from '@ionic/react';
import image from '../../../static/assets/images/ScanBarcode.svg';
import styles from './Scan.module.scss';
import React from 'react';

const Scan: React.FC = () => {
  return (
    <IonRow>
      <div className={styles.ocrloader}>
        <p>Scan Barcode</p>
        <em></em>
        <IonImg
          src={image}
          style={{
            width: '370px',
            height: '380px',
            align: 'centre',
            paddingBottom: '30px',
            marginTop: '-60px',
          }}
        ></IonImg>
        <span></span>
      </div>
    </IonRow>
  );
};
export default Scan;
