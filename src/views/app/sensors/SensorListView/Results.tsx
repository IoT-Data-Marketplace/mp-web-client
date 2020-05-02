import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import uuid from 'react-uuid';
import { StoreState } from '../../../../state/interfaces/storeState';
import sensor from '../../../../blockchain/sensor';
import { SensorType } from '../../../../state/interfaces';

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
                <TableCell>Stream Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensors.map((ioTSensor) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell>{ioTSensor.sensorContractAddress}</TableCell>
                    <TableCell>{SensorType[ioTSensor.sensorType]}</TableCell>
                    <TableCell>{`${ioTSensor.geolocation.latitude}° N, ${ioTSensor.geolocation.longitude}° E`}</TableCell>
                    <TableCell>TODO</TableCell>
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
