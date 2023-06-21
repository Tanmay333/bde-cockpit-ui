import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../store/utils/hooks';
import styles from './Phase.module.scss';

const ProgressBar: React.FC = () => {
  const [progressProduction, setProgressProduction] = useState(0);
  const [progressDowntime, setProgressDowntime] = useState(0);
  const [mode, setMode] = useState('production');
  const toggleMock = useAppSelector((state) => state.mockData.data);

  const [items, setItems] = useState<
    { index: number; value: string; progress: number }[]
  >(() => {
    const savedItems = localStorage.getItem('progressItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    const savedItems = localStorage.getItem('progressItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    // Save the items to localStorage
    localStorage.setItem('progressItems', JSON.stringify(items));
  }, [items]);

  //const [index, setIndex] = useState(1);

  const [index, setIndex] = useState(() => {
    const savedItems = localStorage.getItem('progressItems');
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];
    const lastItem = parsedItems[parsedItems.length - 1];
    return lastItem ? lastItem.index + 1 : 1;
  });

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

    const savedItems = localStorage.getItem('progressItems');
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);

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
      setIndex((prevIndex: number) => prevIndex + 1);
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
            setIndex((prevIndex: number) => prevIndex + 1);
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
        ) {
          if (timerRefDowntime.current) {
            clearInterval(timerRefDowntime.current);
            timerRefDowntime.current = null;
          }
          setMode('production');
        }
      }
    }
  }, [state]);

  const startorder = useAppSelector((state) => state.startneworderslice);

  useEffect(() => {
    const savedItems = localStorage.getItem('progressItems');
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);

    if (startorder && startorder.data === true) {
      setItems([]);
    }
  }, [startorder]);

  const [diff, setDiff] = useState<any>();
  useEffect(() => {
    const interval = setInterval(() => {
      if (state === null) {
        return;
      }
      if (
        state.process.previousPhases.length >= 3 &&
        state.process.previousPhases[2].downtimes
      ) {
        const startTimeOfProd = state.process.currentPhaseDetails.startTime;
        const startTimeOfFirstDowntime =
          state.process.previousPhases[2].downtimes[0].startTime;
        const stPr =
          startTimeOfProd === null
            ? 0
            : new Date(startTimeOfProd).getTime() / 1000;
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

  useEffect(() => {
    if (
      (state && state.process.currentPhaseDetails.phaseName !== 'production') ||
      (state && state.process.currentPhaseDetails.phaseName !== 'unmounting') ||
      (state && state.process.currentPhaseDetails.phaseName !== 'cleaning')
    ) {
      setDiff([]);
    } else return;
  }, [state && state.process.currentPhaseDetails.phaseName]);

  return (
    <div
      ref={progressRef}
      className={styles.boxworking}
      style={{
        backgroundColor: '#E0E0E0',
        position: 'relative',
        display: 'flex',
      }}
    >
      {diff &&
        diff.map((data: any, index: number) => (
          <div
            className={styles.progressBar}
            key={index}
            style={{
              width: data.progress / 30 + '%',
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
