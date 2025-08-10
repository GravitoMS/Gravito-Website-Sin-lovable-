import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, className, ...props }) => {
  return (
    <RouterLink
      className={className}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default CustomLink;
