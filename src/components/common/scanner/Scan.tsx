// Importing necessary dependencies and styles
import { IonRow, IonImg } from '@ionic/react';
import image from '../../../static/assets/images/ScanBarcode.svg';
import styles from './Scan.module.scss';
import React from 'react';

// Scan component
const Scan: React.FC = () => {
  return (
    <IonRow>
      {/* Loading animation container */}
      <div className={styles.ocrloader}>
        <p>Scan Barcode</p>
        {/* Elements for the loading animation */}
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
