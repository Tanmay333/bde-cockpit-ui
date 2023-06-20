import {
  IonCardContent,
  IonContent,
  IonGrid,
  IonImg,
  IonList,
  IonPage,
  IonRow,
} from '@ionic/react';
import lohnpack from '../../static/assets/lohnpack.svg';
import SelectTeamSizeIcon from '../../static/assets/images/SelectTeamSizeIcon';
import { useCallback, useEffect, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import styles from '../selectWorkers/SelectTeamSize.module.scss';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getworkersDetails } from '../../store/slices/selectTeamSizeSlice';
import useWebSocket from '../../store/hooks/useWebSocket';
import { useTranslations } from '../../store/slices/translation.slice';

const EditTeamSize = () => {
  const translation = useTranslations();

  const Workers = [
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
    {
      id: 8,
    },
  ];

  const history = useHistory();

  const routeToHomePage = () => {
    return history.push('/');
  };

  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const dispatch = useAppDispatch();
  const { sendMessage } = useWebSocket();

  const data = {
    teamsize: state?.assignedJobDetails.productionTeamSize ?? '--:--',
  };
  const [selectedIndex, setSelectedIndex] = useState(+data.teamsize - 1);

  const selectteamsize = useCallback((index: number) => {
    setSelectedIndex(index);
    setTimeout(routeToHomePage, 1000);
    const message = {
      action: 'setTeamSize',
      jobId: state?.assignedJobDetails.jobId,
      productionTeamSize: index + 1,
    };
    sendMessage(message);
  }, []);

  useEffect(() => {
    dispatch(getworkersDetails(selectedIndex));
  }, [dispatch, selectedIndex]);

  return (
    <IonPage>
      <IonContent>
        <div className={styles.img}>
          <IonImg src={lohnpack} />
        </div>
        <CardContainer
          title={translation.text.numberOfWorkers}
          position={'middle'}
          style={{ paddingTop: '36px' }}
        >
          <IonGrid
            style={{
              fontSize: '16px',
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            <IonList>
              <IonCardContent>
                <div className={styles.statement}>
                  <p>{translation.text.employeesOnOrder}</p>
                </div>
              </IonCardContent>
            </IonList>
          </IonGrid>
          <IonGrid>
            <IonRow
              style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
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
                  onClick={() => selectteamsize(index)}
                >
                  <IonRow style={{ textAlign: 'center' }}>
                    <SelectTeamSizeIcon
                      isSelected={selectedIndex >= index ? true : false}
                    />
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

export default EditTeamSize;
