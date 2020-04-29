import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  children?: React.ReactElement;
  title: string;
  className: string;
}

const Page = forwardRef((props: Props) => {
  const { children, title, className } = props;

  return (
    <div className={className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
