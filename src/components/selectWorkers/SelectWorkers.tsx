import {
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonImg,
  IonList,
  IonPage,
  IonRow,
} from '@ionic/react';
import lohnpack from '../../static/assets/lohnpack.svg';
import SelectWorkersIcon from '../../static/assets/images/SelectWorkse';
import { useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import styles from './SelectWorkers.module.scss';

const SelectWorkers = () => {
  const Workers = [
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handler = (index: number) => {
    setSelectedIndex(index);
  };

  function selectworkers(index: number) {
    handler(index);
  }

  return (
    <IonPage>
      <IonContent>
        <IonImg className={styles.img} src={lohnpack} />
        <CardContainer title={'Select worker'} position={'middle'}>
          <IonGrid>
            <IonCardHeader>
              <IonCardTitle
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                Number of workers
              </IonCardTitle>
            </IonCardHeader>
          </IonGrid>

          <IonGrid
            style={{
              fontSize: '16px',
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            <IonList>
              <IonCardContent>
                How many of employees is working on the order?
              </IonCardContent>
            </IonList>
          </IonGrid>
          <IonGrid
            style={{
              //marginTop: "10%",
              textAlign: 'center',
              width: '100%',
              //bottom: "10%",
            }}
          >
            <IonRow
              style={{
                padding: '20px',
              }}
            >
              {Workers.map((data, index) => (
                <IonRow
                  style={{
                    position: 'relative',
                    textAlign: 'center',
                    height: '55px',
                    width: '26px',
                    margin: '10px',
                  }}
                  key={data.id}
                  onClick={() => selectworkers(index)}
                >
                  <IonRow style={{ textAlign: 'center' }}>
                    <a href="/">
                      <SelectWorkersIcon
                        isSelected={selectedIndex >= index ? true : false}
                      />
                    </a>
                  </IonRow>
                </IonRow>
              ))}
            </IonRow>
          </IonGrid>
        </CardContainer>
      </IonContent>
    </IonPage>
  );
};

export default SelectWorkers;
