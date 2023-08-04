import { useEffect, useState } from 'react';
import styles from '../confirmOrderDetails/ConfirmOrderDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getquantityDetails } from '../../store/slices/orderQuantitySlice';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import { ORDER_Number, getnumberDetails } from '../../store/slices/orderNumber';
import { useTranslations } from '../../store/slices/translation.slice';

const EditOrderDetails: React.FC = () => {
  // Use translation hook to access translations
  const translation = useTranslations();
  const dispatch = useAppDispatch();

  // Get machine details from state
  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );

  // Extract orderId and quantity from machine details or use default values
  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  // State variables for orderNumber and orderQuantity
  const [orderNumber, setOrderNumber] = useState(data.orderId);
  const [orderQuantity, setOrderQuantity] = useState(data.quantity);

  // Event handler for orderNumber input change
  const handleOrderNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrderNumber = event.target.value;
    setOrderNumber(newOrderNumber);
  };

  // Event handler for orderQuantity input change
  const handleOrderQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrderQuantity = parseFloat(event.target.value);
    setOrderQuantity(newOrderQuantity);
  };

  // Dispatch actions to update order quantity and order number
  useEffect(() => {
    dispatch(getquantityDetails(orderQuantity));
    dispatch(getnumberDetails(orderNumber));
  }, [dispatch, orderQuantity, orderNumber]);

  // Event handler for key press on input fields
  const handleKeyPress = (event: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any;
    key: string;
    preventDefault: () => void;
  }) => {
    const invalidChars = ['+', '-', 'e', 'E'];
    if (invalidChars.includes(event.key) || event.target.value.length >= 20) {
      event.preventDefault();
    }
  };

  return (
    <>
      <p>
        {translation.text.orderNumber}:
        <input
          className={styles.focus}
          type="number"
          value={orderNumber}
          onKeyDown={handleKeyPress}
          onChange={handleOrderNumberChange}
          required
        />
      </p>
      <p>
        {translation.text.orderQuantity}:
        <input
          placeholder={translation.text.enterOrderQuantity}
          className={styles.focus}
          type="number"
          value={orderQuantity}
          onKeyDown={handleKeyPress}
          onChange={handleOrderQuantityChange}
          required
          disabled={!orderNumber} // Disable the input field for order quantity if the order number is not entered.
        />
      </p>
    </>
  );
};

export default EditOrderDetails;
