import React, { useEffect, useMemo, useState } from 'react';
import styles from './Phase.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { isDefined } from '../../utils/isDefined';

const ProgressBar: React.FC = () => {
  const { process, assignedJobDetails } = useAppSelector(
    (state) => state.machineDetailsSlice.data,
  );

  const toggleMock = useAppSelector((state) => state.mockData.data);
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const currentTime = new Date().getTime();
  const startTimeOfProduction = process.currentPhaseDetails.startTime;
  const downTimes = process.currentPhaseDetails.downtimes;

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

    {
      // Calculate the progress for the current time after the last downtime (or production start if no downtimes)
      const currentTimeProgress = (currentTime - lastEndTime) / 1000;
      differences.push({ progress: currentTimeProgress, value: '#2AD127' });
    }
    return differences;
  }, [
    startTimeOfProduction,
    downTimes,
    currentTime,
    process.currentPhaseDetails.phaseName,
  ]);

  const [diff, setDiff] = useState<{ progress: number; value: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state === null) {
        return;
      }
      if (
        state.process.previousPhases.length >= 3 &&
        state.process.previousPhases[2].downtimes
      ) {
        //const startTimeOfProd = state.process.currentPhaseDetails.startTime;
        const startTimeOfProd =
          state.process.currentPhaseDetails.phaseName === 'production'
            ? state.process.currentPhaseDetails.startTime
            : state.process.previousPhases.find(
                (phase) => phase.phaseName === 'production',
              )?.startTime;

        const startTimeOfFirstDowntime =
          state.process.previousPhases[2].downtimes[0].startTime;
        const stPr = //startTimeOfProd === null;
          startTimeOfProd !== undefined
            ? new Date(startTimeOfProd ?? '').getTime() / 1000
            : 0;
        const stDt =
          startTimeOfFirstDowntime === null
            ? 0
            : new Date(startTimeOfFirstDowntime).getTime() / 1000;
        const firstObjectOfArray = { progress: stDt - stPr, value: '#2AD127' };
        const downtimes = state.process.previousPhases[2].downtimes;
        const differences = [];

        for (let i = 0; i < downtimes.length; i++) {
          const downtime = downtimes[i];
          const st = downtime.startTime === null ? 0 : downtime.startTime;
          const et = downtime.endTime === null ? 0 : downtime.endTime;
          const duration =
            new Date(et).getTime() / 1000 - new Date(st).getTime() / 1000;

          if (i > 0) {
            const previousDowntime = downtimes[i - 1];
            const st = downtime.startTime === null ? 0 : downtime.startTime;
            const prevT =
              previousDowntime.endTime === null ? 0 : previousDowntime.endTime;
            const progress =
              new Date(st).getTime() / 1000 - new Date(prevT).getTime() / 1000;
            const timeGapObj = { progress, value: '#2AD127' };
            differences.push(timeGapObj);
          }

          const durationObj = { progress: duration, value: '#E20031' };
          differences.push(durationObj);
        }
        differences.unshift(firstObjectOfArray);
        differences.pop();
        setDiff(differences);
      } else if (state.process.currentPhaseDetails.downtimes.length !== 0) {
        const startTimeOfProd = state.process.currentPhaseDetails.startTime;
        const startTimeOfFirstDowntime =
          state.process.currentPhaseDetails.downtimes[0].startTime;

        const stPr =
          startTimeOfProd === null
            ? new Date().getTime() / 1000
            : new Date(startTimeOfProd).getTime() / 1000;
        const stDt =
          startTimeOfFirstDowntime === null
            ? new Date().getTime() / 1000
            : new Date(startTimeOfFirstDowntime).getTime() / 1000;
        const firstObjectOfArray = { progress: stDt - stPr, value: '#2AD127' };
        const downtimes = state.process.currentPhaseDetails.downtimes;
        const differences = [];

        for (let i = 0; i < downtimes.length; i++) {
          const downtime = downtimes[i];
          const st = downtime.startTime === null ? 0 : downtime.startTime;
          const et = downtime.endTime === null ? 0 : downtime.endTime;
          const duration =
            new Date(et).getTime() / 1000 - new Date(st).getTime() / 1000;

          if (i > 0) {
            const previousDowntime = downtimes[i - 1];
            const st = downtime.startTime === null ? 0 : downtime.startTime;
            const prevT =
              previousDowntime.endTime === null ? 0 : previousDowntime.endTime;
            const progress =
              new Date(st).getTime() / 1000 - new Date(prevT).getTime() / 1000;
            const timeGapObj = { progress, value: '#2AD127' };
            differences.push(timeGapObj);
          }

          const durationObj = { progress: duration, value: '#E20031' };
          differences.push(durationObj);
        }
        differences.unshift(firstObjectOfArray);
        differences.pop();
        setDiff(differences);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state, toggleMock]);
  const test =
    process.currentPhaseDetails.phaseName === 'production' ? data : [];

  return (
    <div
      className={styles.boxworking}
      style={{
        backgroundColor: '#E0E0E0',
        position: 'relative',
        display: 'flex',
      }}
    >
      {test &&
        test.map((data, index) => (
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
      {test.length < 1 &&
        diff &&
        diff.map((data, index: number) => {
          return (
            <div
              key={index}
              className={styles.progressBar}
              style={{
                width: data.progress + '%',
                height: '100%',
                backgroundColor: data.value,
                transition: 'width 0.2s',
                position: 'relative',
                display: 'flex',
              }}
            ></div>
          );
        })}
    </div>
  );
};

export default ProgressBar;
