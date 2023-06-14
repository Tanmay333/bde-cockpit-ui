import React, { useCallback, useState } from 'react';
import SelectWorkersIcon from '../../static/assets/images/SelectWorkersIcon';
import { IonRow } from '@ionic/react';
import { useAppSelector } from '../../store/utils/hooks';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import useWebSocket from '../../store/hooks/useWebSocket';

const EditTeamSize: React.FC = () => {
  const { sendMessage } = useWebSocket();

  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );

  const data = {
    teamsize: state?.assignedJobDetails.productionTeamSize ?? '--:--',
  };

  const [counter, setCounter] = useState(+data.teamsize);
  const maxIcons = 8;

  // Function to increment the counter
  const handleIncrement = useCallback(() => {
    if (counter < maxIcons) {
      setCounter((prevCounter) => prevCounter + 1);
    }
    const message = {
      action: 'setTeamSize',
      jobId: state?.assignedJobDetails.jobId,
      productionTeamSize: counter + 1,
    };
    sendMessage(message);
  }, [counter]);

  // Function to decrement the counter
  const handleDecrement = useCallback(() => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    }
    const message = {
      action: 'setTeamSize',
      jobId: state?.assignedJobDetails.jobId,
      productionTeamSize: counter - 1,
    };
    sendMessage(message);
  }, [counter]);

  // Generate the man icons based on the counter value
  const generateManIcons = () => {
    const icons = [];
    if (state == null || state.assignedJobDetails.productionTeamSize === null) {
      return null;
    }
    for (let i = 0; i < counter; i++) {
      icons.push(
        <IonRow
          key={i}
          style={{
            position: 'relative',
            textAlign: 'center',
            width: '10px',
            margin: '4px',
          }}
        >
          <SelectWorkersIcon isSelected />
        </IonRow>,
      );
    }
    return icons;
  };

  return (
    <>
      <IonRow
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#333333',
        }}
      >
        Members: {generateManIcons()}
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </IonRow>
    </>
  );
};

export default EditTeamSize;
