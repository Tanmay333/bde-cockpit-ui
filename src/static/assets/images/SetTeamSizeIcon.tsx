import React from 'react';

interface Props {
  isSelected?: boolean;
}

// SetTeamSizeIcon component receives a prop "isSelected" to determine if it's selected or not
const SetTeamSizeIcon: React.FC<Props> = ({ isSelected }) => {
  return (
    <svg
      width="26"
      height="55"
      viewBox="0 0 26 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9296 0C9.56225 0 6.86835 2.6939 6.86835 6.06128C6.86835 9.42865 9.56225 12.1226 12.9296 12.1226C16.297 12.1226 18.9909 9.42865 18.9909 6.06128C18.9909 2.6939 16.297 0 12.9296 0Z"
        fill={isSelected ? '#2799D1' : '#DDDDDD'}
      />
      <path
        d="M25.7257 29.072L24.042 16.725C23.8175 15.0413 22.3583 13.6943 20.5623 13.6943H5.18467C3.38873 13.6943 1.92954 14.929 1.70505 16.725L0.0213577 29.072C-0.203134 31.2047 1.36831 33.0006 3.50098 33.0006H5.18467L8.55204 53.5416C8.66429 54.4396 9.45001 55.0008 10.2357 55.0008H15.5113C16.4093 55.0008 17.0827 54.3273 17.195 53.5416L20.5623 33.0006H22.246C24.3787 33.1129 26.0624 31.2047 25.7257 29.072Z"
        fill={isSelected ? '#2799D1' : '#DDDDDD'}
      />
    </svg>
  );
};

export default SetTeamSizeIcon;
