import React from 'react';
import './styles.css';

export const ButtonCustom = ({onClick, type, children, disabled}) => {
  return (
    <button disabled={disabled} className='button-custom' type={type} onClick={onClick}>
      {children}
    </button>
  )
}
