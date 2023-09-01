import { Translations } from './common';

export const germanTranslations: Translations = {
  description: {
    mounting: 'Rüsten',
    preparing: 'Vorbereiten',
    production: 'Produktion',
    unmounting: 'Abrüsten',
    cleaning: 'Reinigen ',
    NA: 'N/A',
  },

  buttons: {
    scanBarCode: 'Barcode scannen ',
    confirmDetails: 'Details bestätigen ',
    scanAgain: 'Erneut scannen ',
    startPreparation: 'Vorbereitung starten ',
    production: 'Produktion',
    downTime: 'Stillstand ',
    endProduction: 'Produktion beenden ',
    endUnmounting: 'Abrüsten beenden ',
    endCleaning: 'Reinigen beenden',
    editOrderDetails: 'Auftragsdetails bearbeiten ',
    startNewOrder: 'Neuen Auftrag starten ',
    edit: ' Bearbeiten ',
    pocStation: 'Ovalläufer 3',
    mockStation: 'Simulierte Maschine',
    endMounting: 'Rüsten beenden',
    startUnmounting: 'Abrüsten starten',
  },

  text: {
    station: 'Anlage',
    machineStatus: {
      on: 'An ',
      off: 'Aus ',
    },
    today: 'Heute',
    orderNumber: 'Auftragsnummer',
    orderQuantity: 'Auftragsmenge',
    startTime: 'Startzeit',
    endTime: 'Endezeit',
    numberOfWorkers: 'Anzahl Mitarbeiter ',
    employeesOnOrder: 'Wie viele Mitarbeiter arbeiten an dem Auftrag ',
    pauseAt: 'Stopp um',
    resumeAt: 'Start um ',
    downtimeAt: 'Stillstand um ',
    members: 'Mitarbeiter',
    enterOrderQuantity: 'Auftragsdetails bearbeiten ',
    orderDetails: 'Auftragsdetails ',
    phaseDetails: 'Details Phase',
    hrs: 'h',
    machine: 'Maschine ',
    ppm: 'Stück/Minute',
    machineSpeed: 'Takt',
    min: 'Min',
    notStarted: 'Nicht gestartet',
    startedAt: 'Start um',
    plannedDowntime: 'Geplanter Stillstand',
    incident: 'Störung',
    planned: 'Geplant',
    production: 'Produktion',
    downTime: 'Stillstand ',
    stationId: 'Bitte eine Maschine auswählen',
    time: 'Zeit',
  },

  reason: {
    mechanicalIncident: 'Mechanische Störung ',
    electricalIncident: 'Elektrische Störung ',
    misuse: 'Fehlbedienung',
    defectiveFillingMaterial: 'Fehlerhaftes Füllgut',
    otherIncident: 'Sonstige Störung',
    incidentLabelMachine: 'Störung Etiketten-Maschine',
    changingBarrel: 'Fasswechsel',
    changingLabels: 'Etikettenwechsel',
    break: 'Pause',
    rework: 'Nacharbeit',
  },
};

export default germanTranslations;
