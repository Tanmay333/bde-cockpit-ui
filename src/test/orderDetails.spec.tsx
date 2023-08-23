import { render, screen } from './test.utils';
import OrderDetails from '../components/orderDetails/OrderDetails';

describe('OrderDetails', () => {
  beforeEach(() => {
    render(<OrderDetails />);
  });

  it('should show title text', async () => {
    expect(await screen.findByText(/Order details/i)).toBeInTheDocument;
  });

  it('should show subtitle text', async () => {
    expect(await screen.getByTestId('test-order-details').textContent).toEqual(
      'Order number: --:-- Order quantity: --:--',
    );
  });
});
