import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';
import { StoreState } from '../../../../state/interfaces/storeState';

function RadialChart() {
  const theme = useTheme();
  const { streamSize } = useSelector((state: StoreState) => state.dataStream.sensor);
  const { records } = useSelector((state: StoreState) => state.dataStream);

  const displayingPercentage = ((records.length / streamSize) * 100).toFixed(5);

  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false,
        },
        zoom: false,
      },
      colors: [theme.palette.secondary.main],
      labels: ['Stream Size'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            name: {
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary,
            },
            value: {
              color: theme.palette.text.secondary,
            },
          },
          track: {
            background: '#1c2025',
          },
        },
      },
      theme: {
        mode: theme.palette.type,
      },
    },
    series: [displayingPercentage],
  };

  return (
    <Card>
      <CardContent>
        <Chart options={data.options} series={data.series} type="radialBar" height="300" />
        <Typography align="center" color="textSecondary" variant="caption" component="p">
          You are displaying {displayingPercentage}% of the data
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RadialChart;
