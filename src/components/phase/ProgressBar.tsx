import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../store/utils/hooks';
import styles from './Phase.module.scss';

const ProgressBar: React.FC = () => {
  const [phaseThree, setPhaseThree] = useState('#E0E0E0');
  const [progressProduction, setProgressProduction] = useState(0);
  const [progressDowntime, setProgressDowntime] = useState(0);
  const [mode, setMode] = useState('production');
  const [items, setItems] = useState<
    { index: number; value: string; progress: number }[]
  >([]);
  const [index, setIndex] = useState(1);

  const progressRef = useRef<HTMLDivElement | null>(null);
  const timerRefProduction = useRef<number | null>(null);
  const timerRefDowntime = useRef<number | null>(null);

  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  useEffect(() => {
    if (state === null || state === undefined) {
      return setProgressProduction(0);
    }
    if (state === null || state === undefined) {
      return setProgressDowntime(0);
    }

    if (
      state.process &&
      state.process.currentPhaseDetails &&
      state.process.currentPhaseDetails.phaseName === 'production' &&
      state.process.currentPhaseDetails.state === 'RUNNING'
    ) {
      if (mode === 'DOWNTIME') {
        setMode('production');
      }
      const newItem = { index: index, value: '#2AD127', progress: 0 }; // Initialize progress to 0
      setItems((prevItems) => [...prevItems, newItem]);
      setIndex((prevIndex) => prevIndex + 1);
      setProgressProduction(0); // Reset progress to 0
      timerRefProduction.current = window.setInterval(() => {
        setProgressProduction((prevProgress) => {
          const newProgress = prevProgress + 1;
          newItem.progress = newProgress; // Update the progress in newItem
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.index === newItem.index ? newItem : item,
            ),
          );
          return newProgress;
        });
      }, 100);
    } else if (
      (state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.phaseName === 'production' &&
        state.process.currentPhaseDetails.state !== 'RUNNING') ||
      (state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.phaseName !== 'production' &&
        state.process.currentPhaseDetails.state === 'RUNNING')
    ) {
      if (timerRefProduction.current) {
        clearInterval(timerRefProduction.current);
        timerRefProduction.current = null;
      }
      const newItem = { index: index, value: '#2AD127', progress: 0 }; // Initialize progress to 0

      const newItemWithZeroProgress = { ...newItem, progress: 0 }; // Create a new object with progress set to 0
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.index === newItemWithZeroProgress.index
            ? newItemWithZeroProgress
            : item,
        ),
      );
      setMode('DOWNTIME');
    }
    {
      if (
        state &&
        state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.downtimes
      ) {
        const unknownEvent = state.process.currentPhaseDetails.downtimes.find(
          (event) => event.reason === 'unknown',
        );

        if (
          state.process &&
          state.process.currentPhaseDetails &&
          state.process.currentPhaseDetails.phaseName === 'production' &&
          state.process.currentPhaseDetails.state === 'DOWNTIME' &&
          unknownEvent
        ) {
          {
            if (mode === 'production') {
              setMode('DOWNTIME');
            }
            const newItem = { index: index, value: '#E20031', progress: 0 };
            setItems((prevItems) => [...prevItems, newItem]);
            setIndex((prevIndex) => prevIndex + 1);
            setProgressDowntime(0); // Reset progressB to 0
            timerRefDowntime.current = window.setInterval(() => {
              setProgressDowntime((prevProgress) => {
                const newProgress = prevProgress + 1;
                newItem.progress = newProgress;
                setItems((prevItems) =>
                  prevItems.map((item) =>
                    item.index === newItem.index ? newItem : item,
                  ),
                );
                return newProgress;
              });
            }, 100);
          }
        } else if (
          (state.process &&
            state.process.currentPhaseDetails &&
            state.process.currentPhaseDetails.phaseName === 'production' &&
            state.process.currentPhaseDetails.state !== 'DOWNTIME') ||
          (state.process &&
            state.process.currentPhaseDetails &&
            state.process.currentPhaseDetails.phaseName !== 'production')
          //state.process.currentPhaseDetails.state !== 'DOWNTIME'
        ) {
          if (timerRefDowntime.current) {
            clearInterval(timerRefDowntime.current);
            timerRefDowntime.current = null;
          }
          setMode('production');
        }
      }
    }
    if (
      state.process &&
      state.process.currentPhaseDetails &&
      state.process.currentPhaseDetails.state === null
    ) {
      setItems([]);
    }
  }, [state]);

  return (
    <div
      ref={progressRef}
      className={styles.boxworking}
      style={{
        backgroundColor: phaseThree,
        position: 'relative',
        display: 'flex',
      }}
    >
      {items.map((data) => (
        <div
          className={styles.progressBar}
          key={data.index}
          style={{
            width: data.progress / 20 + '%',
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

export default ProgressBar;
