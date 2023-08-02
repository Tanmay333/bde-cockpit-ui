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
    toggle: 'Umschalten',
    scanBarCode: 'Barcode scannen ',
    confirmDetails: 'Details bestätigen ',
    scanAgain: 'Erneut scannen ',
    startPreparation: 'Vorbereitung starten ',
    production: 'Produktion',
    downTime: 'Stillstand ',
    endProduction: 'Produktion beenden ',
    endUnmounting: 'Abrüsten beenden ',
    endCleaning: 'Reinigen beenden ',
    editOrderDetails: 'Auftragsdetails bearbeiten ',
    startNewOrder: 'Neuen Auftrag starten ',
    editMemberDetails: 'Anzahl Mitarbeiter bearbeiten ',
  },

  text: {
    order: 'Auftrag',
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
    hrs: 'Stunden',
    machine: 'Maschine ',
    ppm: 'Stück/Minute',
    machineSpeed: 'Takt',
    min: 'Min',
    notStarted: 'Nicht gestartet',
    startedAt: 'Start um',
    plannedDowntime: 'Geplante Ausfallzeit',
    forcedDowntime: 'Erzwungene Ausfallzeit',
    production: 'Produktion',
    downTime: 'Stillstand ',
  },

  reason: {
    mechanicalIncident: 'Mechanische Störung ',
    electricalIncident: 'Elektrische Störung ',
    misuse: 'Fehlbedienung',
    defectiveFillingMaterial: 'Fehlerhaftes Füllgut',
    otherIncident: 'Sonstige Störung',
    changingBarrel: 'Fasswechsel',
    changingLabels: 'Etikettenwechsel',
    break: 'Pause',
  },
};

export default germanTranslations;
