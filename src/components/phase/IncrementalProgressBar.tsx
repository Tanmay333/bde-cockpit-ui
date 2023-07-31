import React, { useEffect, useMemo, useState } from 'react';
import styles from '../phase/Phase.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { isDefined } from '../../utils/isDefined';
import useTimeout from '../../hooks/useTimeout';

const IncrementalProgressBar: React.FC = () => {
  const { process, assignedJobDetails } = useAppSelector(
    (state) => state.machineDetailsSlice.data,
  );
  const timeout = useTimeout();
  const currentTime = new Date().getTime();
  const startTimeOfProduction = process.currentPhaseDetails.startTime;
  const downTimes = process.currentPhaseDetails.downtimes;

  // ... (rest of the code)

  const data = useMemo(() => {
    if (!isDefined(startTimeOfProduction)) return [];

    const differences = [];
    let lastEndTime = new Date(startTimeOfProduction).getTime();

    // Check if there are downtimes or not
    if (isDefined(downTimes)) {
      for (let i = 0; i < downTimes.length; i++) {
        const downtime = downTimes[i];
        const st =
          downtime.startTime === null
            ? 0
            : new Date(downtime.startTime).getTime();
        const et =
          downtime.endTime === null
            ? currentTime
            : new Date(downtime.endTime).getTime();
        const duration = (et - st) / 1000;

        const progress2AD127 = (st - lastEndTime) / 1000;
        differences.push({ progress: progress2AD127, value: '#2AD127' });

        const progressE20031 = duration;
        differences.push({ progress: progressE20031, value: '#E20031' });

        lastEndTime = et;
      }
    }

    // Calculate the progress for the current time after the last downtime (or production start if no downtimes)
    const currentTimeProgress = (currentTime - lastEndTime) / 1000;
    differences.push({ progress: currentTimeProgress, value: '#2AD127' });

    return differences;
  }, [startTimeOfProduction, downTimes, currentTime]);

  // ... (rest of the code)

  // console.log(new Date(), 'line 66');

  return (
    <div
      className={styles.boxworking}
      style={{
        backgroundColor: '#E0E0E0',
        position: 'relative',
        display: 'flex',
      }}
    >
      {data &&
        data.map((data, index) => (
          <div
            key={index}
            className={styles.progressBar}
            style={{
              width: `${data.progress}%`,
              height: '100%',
              backgroundColor: data.value,
              transition: 'width 0.2s',
              position: 'relative',
              display: 'flex',
            }}
          ></div>
        ))}
    </div>
  );
};

export default IncrementalProgressBar;
