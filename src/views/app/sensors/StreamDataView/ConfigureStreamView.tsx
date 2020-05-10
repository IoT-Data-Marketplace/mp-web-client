import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

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

const ConfigureStreamView = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Configure this Data Stream
        </Typography>

        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{
              padding: theme.spacing(5),
            }}
          >
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              marks={marks}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <div>something</div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div>apply</div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfigureStreamView;
