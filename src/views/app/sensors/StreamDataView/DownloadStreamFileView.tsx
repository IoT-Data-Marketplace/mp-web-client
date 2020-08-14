import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Card, CardContent, createStyles, Theme, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getMessagesForSensor} from '../../../../state/actions/dataStream';
import { asyncForEach } from '../../../../state/helpers/asyncForEach';
import {downloadFile} from "../../../../state/helpers/downloadFile";
import {StoreState} from "../../../../state/interfaces/storeState";
import {toggleIsLoading} from "../../../../state/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

interface Props {
  sensorContractAddress: string;
}

const DownloadStreamFileView = (props: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { records } = useSelector((state: StoreState) => state.dataStream);
  const { sensorContractAddress } = props;
  const [numberOfMessages, setNumberOfMessages] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfMessages(parseInt(event.target.value, 10));
  };


  const handleOnDownload = async () => {
    dispatch(toggleIsLoading(true));
    await dispatch(getMessagesForSensor(sensorContractAddress, numberOfMessages));
    downloadFile(`last-${numberOfMessages}-msg-for-sensor-${sensorContractAddress}.json`, JSON.stringify(records));
    dispatch(toggleIsLoading(false));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Download Stream Messages
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Paper component="form" className={classes.root}>
              <Typography variant="h4" color="textPrimary">
                Download last
              </Typography>
              <TextField
                style={{
                  padding: theme.spacing(2),
                  width: '100px',
                }}
                id="standard-number"
                defaultValue={numberOfMessages}
                type="number"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Typography variant="h4" color="textPrimary">
                messages.
              </Typography>
              {/* <Divider className={classes.divider} orientation="vertical" /> */}
              <Button
                style={{
                  margin: theme.spacing(1),
                }}
                onClick={() => {
                  handleOnDownload();
                }}
                variant="contained"
                color="primary"
              >
                Download
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DownloadStreamFileView;
