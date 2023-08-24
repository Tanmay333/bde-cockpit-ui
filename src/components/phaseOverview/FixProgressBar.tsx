import React, { useEffect, useState } from 'react';
import styles from './PhaseOverview.module.scss';
import { useAppSelector } from '../../store/utils/hooks';

const FixProgressBar: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  // State to hold the differences in progress and colors for the progress bar
  const [diff, setDiff] = useState<{ progress: number; value: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state === null) {
        return;
      }
      // Find the 'production' phase from previous phases
      const dts = state.data.process.previousPhases.find(
        (phase) => phase.phaseName === 'production',
      );

      // Check if there are at least 3 previous phases and downtime data is available
      if (
        state.data.process.previousPhases.length >= 3 &&
        dts !== undefined &&
        dts.downtimes !== null &&
        dts.downtimes.length !== 0
      ) {
        // Get the start time of 'production' phase
        const startTimeOfProd =
          state.data.process.currentPhaseDetails.phaseName === 'production'
            ? state.data.process.currentPhaseDetails.startTime
            : state.data.process.previousPhases.find(
                (phase) => phase.phaseName === 'production',
              )?.startTime;
        // Calculate the progress value for the first downtime
        const startTimeOfFirstDowntime = dts.downtimes[0].startTime;
        const stPr =
          startTimeOfProd !== undefined
            ? new Date(startTimeOfProd ?? '').getTime() / 1000
            : 0;
        const stDt =
          startTimeOfFirstDowntime === null
            ? 0
            : new Date(startTimeOfFirstDowntime).getTime() / 1000;
        const firstObjectOfArray = { progress: stDt - stPr, value: '#2AD127' };
        const downtimes = dts.downtimes;
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
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    //We can also use startneworder if we recive any bug related to progress bar getting empty.
    // Clear the progress bar if the stationId is null
    if (state.data.stationId === null) {
      setDiff([]);
    }
  }, [state]);

  const startorder = useAppSelector((state) => state.startneworderslice);

  useEffect(() => {
    if (startorder && startorder.data === true) {
      setDiff([]);
    }

    if (
      (state &&
        state.data.process.currentPhaseDetails.phaseName === 'mounting') ||
      (state &&
        state.data.process.currentPhaseDetails.phaseName === 'preparing')
    ) {
      setDiff([]);
    }
  }, [startorder, state]);

  return (
    // Render the progress bar with colored segments representing downtimes and durations
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
