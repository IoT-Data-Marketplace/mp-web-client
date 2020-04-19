import React, { forwardRef } from 'react';

interface Props {
  children?: React.ReactElement;
  title: string;
  className: string;
}

const Page = forwardRef((props: Props) => {
  const { children, title, className } = props;

  return (
    <div className={className}>
      <title>{title}</title>
      {children}
    </div>
  );
});

export default Page;
