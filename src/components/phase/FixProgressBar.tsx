import React, { useEffect, useState } from 'react';
import styles from './Phase.module.scss';
import { useAppSelector } from '../../store/utils/hooks';

const FixProgressBar: React.FC = () => {
  const startorder = useAppSelector((state) => state.startneworderslice);
  const toggleMock = useAppSelector((state) => state.mockData.data);
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

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

  useEffect(() => {
    if (startorder && startorder.data === true) {
      setDiff([]);
    }

    if (
      (state && state.process.currentPhaseDetails.phaseName !== 'production') ||
      (state && state.process.currentPhaseDetails.phaseName !== 'unmounting') ||
      (state && state.process.currentPhaseDetails.phaseName !== 'cleaning')
    ) {
      setDiff([]);
    }
  }, [startorder, state]);

  return (
    <div
      className={styles.boxworking}
      style={{
        backgroundColor: '#E0E0E0',
        position: 'relative',
        display: 'flex',
      }}
    >
      {diff &&
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

export default FixProgressBar;
