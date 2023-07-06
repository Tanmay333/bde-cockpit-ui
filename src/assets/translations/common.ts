import english from './english';
import german from './german';

export enum SupportedLanguage {
  ENGLISH = 'en',
  GERMAN = 'de',
}

export const supportedLanguages: Record<SupportedLanguage, Translations> = {
  [SupportedLanguage.ENGLISH]: english,
  [SupportedLanguage.GERMAN]: german,
};

interface MachineStatus {
  on: string;
  off: string;
}

interface Buttons {
  toggle: string;
  scanBarCode: string;
  confirmDetails: string;
  scanAgain: string;
  startPreparation: string;
  production: string;
  downTime: string;
  endProduction: string;
  endUnmounting: string;
  endCleaning: string;
  editOrderDetails: string;
  startNewOrder: string;
  editMemberDetails: string;
}

interface Text {
  order: string;
  machineStatus: MachineStatus;
  today: string;
  orderNumber: string;
  orderQuantity: string;
  startTime: string;
  endTime: string;
  numberOfWorkers: string;
  employeesOnOrder: string;
  pauseAt: string;
  resumeAt: string;
  downtimeAt: string;
  members: string;
  enterOrderQuantity: string;
  orderDetails: string;
  phaseDetails: string;
  hrs: string;
  machine: string;
  ppm: string;
  machineSpeed: string;
}

interface Reasons {
  mechanicalIncident: string;
  electricalIncident: string;
  misuse: string;
  defectiveFillingMaterial: string;
  otherIncident: string;
}

export interface Translations {
  description: { [key: string]: string };
  buttons: Buttons;
  text: Text;
  reason: Reasons;
}
