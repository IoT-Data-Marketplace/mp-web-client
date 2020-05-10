import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';

function LineChart() {
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
        categories: [
          // '01 Jan',
          // '02 Jan',
          // '03 Jan',
          // '04 Jan',
          // '05 Jan',
          // '06 Jan',
          // '07 Jan',
          // '08 Jan',
          // '09 Jan',
          // '10 Jan',
          // '11 Jan',
          // '12 Jan',
          // '02 Jan',
          // '03 Jan',
          // '04 Jan',
          // '05 Jan',
          // '06 Jan',
          // '07 Jan',
          // '08 Jan',
          // '09 Jan',
          // '10 Jan',
          // '11 Jan',
          // '12 Jan',
          // '02 Jan',
          // '03 Jan',
          // '04 Jan',
          // '05 Jan',
          // '06 Jan',
          // '07 Jan',
          // '08 Jan',
          // '09 Jan',
          // '10 Jan',
          // '11 Jan',
          // '12 Jan',
          // '02 Jan',
          // '03 Jan',
          // '04 Jan',
          // '05 Jan',
          // '06 Jan',
          // '07 Jan',
          // '08 Jan',
          // '09 Jan',
          // '10 Jan',
        ],
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
        data: [
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
          // 41,
          // 62,
          // 42,
          // 13,
          // 18,
          // 29,
          // 37,
          // 36,
          // 51,
          // 32,
          // 35,
        ],
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
