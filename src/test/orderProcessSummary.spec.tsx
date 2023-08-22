import { render, screen } from './test.utils';
import OrderProcessSummary from '../components/orderProcessSummary/OrderProcessSummary';

describe('OrderProcessSummary', () => {
  beforeEach(() => {
    render(<OrderProcessSummary />);
  });

  it('should show title', async () => {
    expect(await screen.findByText(/Station/i)).toBeInTheDocument();
  });

  it('should show subtitle', async () => {
    expect(await screen.findByText(/Machine speed/i)).toBeInTheDocument();
  });

  it('should show right title', async () => {
    expect(await screen.findByText(/Phase/i)).toBeInTheDocument();
  });

  it('should show bottom left title', async () => {
    expect(await screen.findByText(/Not Started/i)).toBeInTheDocument();
  });

  it('should show bottom left timer', async () => {
    expect(await screen.findByText('N/A')).toBeInTheDocument();
  });

  it('should show right title subtitle', async () => {
    expect(await screen.findByText(/00:00/i)).toBeInTheDocument();
  });
});
