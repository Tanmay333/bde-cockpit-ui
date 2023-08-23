import { render, screen } from './test.utils';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';

describe('PhaseDetails', () => {
  beforeEach(() => {
    render(<PhaseDetails />);
  });

  it('should show title text', async () => {
    expect(await screen.findByText(/Phase Details/i)).toBeInTheDocument;
  });

  it('should show start time text', async () => {
    expect(await screen.findByText(/Start time/i)).toBeInTheDocument;
  });

  it('should show end time text', async () => {
    expect(await screen.findByText(/End time/i)).toBeInTheDocument;
  });
});
