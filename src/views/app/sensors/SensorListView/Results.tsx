import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import SvgIcon from '@material-ui/core/SvgIcon';
import uuid from 'react-uuid';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { ArrowRightCircle as ArrowRightIcon } from 'react-feather';
import { StoreState } from '../../../../state/interfaces/storeState';
import { SensorStatus, SensorType } from '../../../../state/interfaces';
import Label from '../../../../components/Label';
import { ROUTES } from '../../../../constants';

enum SensorStatusColor {
  warning,
  success,
  error,
}

const Results = () => {
  const { sensors } = useSelector((state: StoreState) => state.sensor);
  return (
    <Card>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Geolocation</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Stream Size</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensors.map((sensor) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell>{sensor.sensorContractAddress}</TableCell>
                    <TableCell>{SensorType[sensor.sensorType]}</TableCell>
                    <TableCell>{`${sensor.geolocation.latitude}° N, ${sensor.geolocation.longitude}° E`}</TableCell>
                    <TableCell>
                      <Label color={SensorStatusColor[sensor.sensorStatus]}>{SensorStatus[sensor.sensorStatus]}</Label>
                    </TableCell>
                    <TableCell>{sensor.streamSize}</TableCell>
                    <TableCell align="center">
                      <IconButton component={RouterLink} to={`${ROUTES.SENSORS}/${sensor.sensorContractAddress}`}>
                        <SvgIcon fontSize="default">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default Results;
