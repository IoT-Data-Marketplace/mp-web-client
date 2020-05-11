import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';
import { StoreState } from '../../../../state/interfaces/storeState';

function LineChart() {
  const { records } = useSelector((state: StoreState) => state.dataStream);
  const theme = useTheme();
  const chart = {
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
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: theme.palette.text.secondary,
        },
      },
      markers: {
        size: 4,
        strokeColors: ['#27c6db'],
        strokeWidth: 0,
        shape: 'circle',
        radius: 2,
        hover: {
          size: undefined,
          sizeOffset: 2,
        },
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'butt',
        dashArray: [1],
      },
      theme: {
        mode: theme.palette.type,
      },
      tooltip: {
        theme: theme.palette.type,
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider,
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider,
        },
        categories: records.map((record) => record.key),
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: [
        {
          axisBorder: {
            show: true,
            color: theme.palette.divider,
          },
          axisTicks: {
            show: true,
            color: theme.palette.divider,
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary,
            },
          },
        },
      ],
    },
    series: [
      {
        name: 'Temperature',
        data: records.map((record) => record.value),
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Sensor Type
        </Typography>
        <Chart type="line" height="300" {...chart} />
      </CardContent>
    </Card>
  );
}

export default LineChart;
