import type { ButtonHTMLAttributes } from 'react';
import Spinner from 'components/Base/Spinner';

const ButtonVariants = {
  primary: 'btn-primary',
  white: 'btn-white',
  transparent: 'btn-transparent',
};

interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof ButtonVariants;
  isLoading?: boolean;
  elevated?: boolean;
}

const Button = ({
  variant,
  type = 'button',
  isLoading,
  elevated,
  children,
  ...props
}: IBaseButton) => {
  if (isLoading) {
    return (
      <button
        className={`btn ${ButtonVariants[variant]} ${elevated ? 'drop-shadow-sm' : ''}`}
        type={type}
        disabled
        {...props}
      >
        <Spinner /> Loading
      </button>
    );
  }

  return (
    <button
      className={`btn ${ButtonVariants[variant]} ${elevated ? 'drop-shadow-sm' : ''}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
