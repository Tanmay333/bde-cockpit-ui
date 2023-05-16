export  type PositionProp = 'start' | 'middle';
export const getPosition = (value: PositionProp) => {
    if (value === 'start') {
      return true;
    } else if (value === 'middle') {
      return false;
    }
  };
  