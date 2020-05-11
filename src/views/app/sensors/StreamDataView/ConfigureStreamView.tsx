import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, createStyles, Theme, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getMessagesForSensor } from '../../../../state/actions/dataStream';
import { asyncForEach } from '../../../../state/helpers/asyncForEach';

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

const ConfigureStreamView = (props: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sensorContractAddress } = props;
  const [numberOfMessages, setNumberOfMessages] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [isStreaming, setIsStreaming] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfMessages(parseInt(event.target.value, 10));
  };
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value, 10));
  };

  async function wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // async function asyncWhile(callback) {
  //   console.log('async while called: ', isStreaming);
  //   while (isStreaming) {
  //     console.log('async while called inside: ', isStreaming);
  //     await callback();
  //   }
  // }
  //
  // useEffect(() => {
  //   console.log('is streaming useeffect: ', isStreaming);
  //   async function stream() {
  //     await asyncWhile(async () => {
  //       await dispatch(getMessagesForSensor(sensorContractAddress, numberOfMessages));
  //       await wait(1000);
  //     });
  //   }
  //   const running = stream();
  //
  //   streamingFn.forEach((fn) => {
  //     console.log('resolving: ', fn);
  //     Promise.resolve(fn).then((result) => console.log('resolve result: ', result)).finally(() => console.log('finally'));
  //   });
  //   setStreamingFn([...streamingFn, running]);
  //   console.log('running: ', streamingFn);
  // }, [isStreaming]);

  const handleOnToggleStreaming = async () => {
    await asyncForEach(new Array(duration * 3), async () => {
      await dispatch(getMessagesForSensor(sensorContractAddress, numberOfMessages));
      await wait(300);
    });
    setIsStreaming(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Configure this Data Stream
        </Typography>

        <Grid container spacing={3}>
          {/* <Grid */}
          {/*  item */}
          {/*  xs={12} */}
          {/*  style={{ */}
          {/*    padding: theme.spacing(5), */}
          {/*  }} */}
          {/* > */}
          {/*  <Slider */}
          {/*    value={value} */}
          {/*    onChange={handleChange} */}
          {/*    valueLabelDisplay="auto" */}
          {/*    aria-labelledby="range-slider" */}
          {/*    getAriaValueText={valuetext} */}
          {/*    marks={marks} */}
          {/*  /> */}
          {/* </Grid> */}
          <Grid item xs={12} md={12}>
            <Paper component="form" className={classes.root}>
              <Typography variant="h4" color="textPrimary">
                Stream last
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
                messages
              </Typography>
              <TextField
                style={{
                  padding: theme.spacing(2),
                  width: '100px',
                }}
                id="streamDuration"
                defaultValue={duration}
                type="number"
                onChange={handleDurationChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Typography variant="h4" color="textPrimary">
                seconds.
              </Typography>
              {/* <Divider className={classes.divider} orientation="vertical" /> */}
              <Button
                style={{
                  margin: theme.spacing(1),
                }}
                disabled={isStreaming}
                onClick={() => {
                  handleOnToggleStreaming();
                  setIsStreaming(true);
                }}
                variant="contained"
                color="primary"
              >
                Start
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfigureStreamView;
