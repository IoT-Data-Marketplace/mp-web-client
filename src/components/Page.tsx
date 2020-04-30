import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex 1 1 auto',
    alignItems: 'center',
    padding: theme.spacing(3),
    paddingTop: 80,
    paddingBottom: 80,
  },
}));

interface Props {
  children?: React.ReactElement;
  title: string;
  className: string;
}

const Page = forwardRef((props: Props) => {
  const classes = useStyles();
  const { children, title, className } = props;

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
