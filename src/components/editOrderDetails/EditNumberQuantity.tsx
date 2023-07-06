import { useEffect, useState } from 'react';
import styles from '../confirmOrderDetails/ConfirmOrderDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getquantityDetails } from '../../store/slices/orderQuantitySlice';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import { getnumberDetails } from '../../store/slices/orderNumber';
import { useTranslations } from '../../store/slices/translation.slice';

const EditOrderDetails: React.FC = () => {
  const translation = useTranslations();

  const dispatch = useAppDispatch();

  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );
  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  const [orderNumber, setOrderNumber] = useState(data.orderId);
  const [orderQuantity, setOrderQuantity] = useState(data.quantity);

  const handleOrderNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrderNumber = event.target.value;
    setOrderNumber(newOrderNumber);
  };

  const handleOrderQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrderQuantity = parseFloat(event.target.value);
    setOrderQuantity(newOrderQuantity);
  };

  useEffect(() => {
    dispatch(getquantityDetails(orderQuantity));
    dispatch(getnumberDetails(orderNumber));
  }, [dispatch, orderQuantity, orderNumber]);

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
          className={styles.focus}
          type="number"
          value={orderQuantity}
          onKeyDown={handleKeyPress}
          onChange={handleOrderQuantityChange}
          required
        />
      </p>
    </>
  );
};

export default EditOrderDetails;
