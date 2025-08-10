import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useNavigation } from './NavigationProvider';

interface CustomLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, className, ...props }) => {
  const { navigateWithLoading } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateWithLoading(to);
  };

  return (
    <RouterLink
      to={to}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default CustomLink;
