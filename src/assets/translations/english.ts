import { Translations } from './common';

export const englishTranslations: Translations = {
  description: {
    mounting: 'Mounting',
    preparing: 'Preparing',
    production: 'Production',
    unmounting: 'Unmounting',
    cleaning: 'Clean-Up',
    NA: 'N/A',
  },

  buttons: {
    scanBarCode: 'Scan bar-code',
    confirmDetails: 'Confirm details',
    scanAgain: 'Scan again',
    startPreparation: 'Start preparation',
    production: 'Production',
    downTime: 'DownTime',
    endProduction: 'End production',
    endUnmounting: 'End unmounting',
    endCleaning: 'End Cleaning',
    editOrderDetails: 'Edit order details',
    startNewOrder: 'Start new order ',
    edit: 'Edit',
    pocStation: 'Poc Station',
    mockStation: 'Mock Station',
  },

  text: {
    station: 'Station',
    machineStatus: {
      on: 'on',
      off: 'off',
    },
    today: 'Today',
    orderNumber: 'Order number',
    orderQuantity: 'Order quantity',
    startTime: 'Start time',
    endTime: 'End time',
    numberOfWorkers: 'Number of workers',
    employeesOnOrder: 'How many of employees is working on the order?',
    pauseAt: 'Pause at',
    resumeAt: 'Resume at',
    downtimeAt: 'Downtime at',
    members: 'Members',
    enterOrderQuantity: 'Enter order quantity',
    orderDetails: 'Order details',
    phaseDetails: 'Phase details',
    hrs: 'h',
    machine: 'Machine',
    ppm: 'ppm',
    machineSpeed: 'Machine speed',
    min: 'min',
    notStarted: 'Not Started',
    startedAt: 'Started at',
    plannedDowntime: 'Planned Downtime',
    incident: 'Incident ',
    planned: 'Planned',
    production: 'Production',
    downTime: 'DownTime',
    stationId: 'Please select the Station ID',
    time: 'time',
  },

  reason: {
    mechanicalIncident: 'Mechanical Incident',
    electricalIncident: 'Electrical Incident',
    misuse: 'Misuse',
    defectiveFillingMaterial: 'Defective Filling Material',
    otherIncident: 'Other Incident',
    incidentLabelMachine: 'Incident Label Machine',
    changingBarrel: 'Changing Barrel',
    changingLabels: 'Changing Labels',
    break: 'Break',
    rework: 'Rework',
  },
};

export default englishTranslations;
