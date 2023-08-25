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
import SetTeamSizeIcon from '../../static/assets/images/SetTeamSizeIcon';
import { useCallback, useEffect, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import styles from '../setTeamSize/SetTeamSize.module.scss';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getworkersDetails } from '../../store/slices/selectTeamSizeSlice';
import useWebSocket from '../../store/hooks/useWebSocket';
import { useTranslations } from '../../store/slices/translation.slice';
import LoadingIndicator from '../common/loadingIndicator/LoadingIndicator';

const SetTeamSize = () => {
  // Get translations from the translation slice
  const translation = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  //List of workers
  const Workers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  // State to keep track of the selected index
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const history = useHistory();

  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const dispatch = useAppDispatch();
  const { sendMessage } = useWebSocket();

  const selectteamsize = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsLoading(true);

    const message = {
      action: 'setTeamSize',
      jobId: state?.data.assignedJobDetails.jobId,
      productionTeamSize: index + 1,
    };
    sendMessage(message);
  }, []);

  useEffect(() => {
    if (state.data.process.currentPhaseDetails.phaseName === 'preparing') {
      setIsLoading(false);
      history.push('/');
    }
  }, [history, state]);

  // Fetch worker details from Redux store when the selectedIndex changes
  useEffect(() => {
    dispatch(getworkersDetails(selectedIndex));
  }, [dispatch, selectedIndex]);

  return (
    <IonPage>
      <IonContent>
        {/* Loading spinner */}
        {isLoading && <LoadingIndicator />}
        <div className={styles.img}>
          <IonImg src={lohnpack} />
        </div>
        <CardContainer
          title={translation.text.numberOfWorkers}
          position={'middle'}
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
                    <SetTeamSizeIcon
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

export default SetTeamSize;
