import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Container, Divider } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Page from '../../../../components/Page';
import Sensor from '../../../../blockchain/sensor';
import { toggleIsLoading } from '../../../../state/actions';
import SensorDetails from './SensorDetails';
import { fetchSensorSummary } from '../../../../state/actions/sensor/fn';
import Header from './Header';

type PathParamsType = {
  sensorContractAddress: string;
};

type PropsType = RouteComponentProps<PathParamsType> & {
  toggleIsLoading: typeof toggleIsLoading;
};

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class _SensorDetailsView extends React.Component<PropsType> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    errors: null,
    fetchedSensor: {
      dataStreamEntityContractAddress: '',
      sensorContractAddress: '',
      sensorType: 0,
      geolocation: {
        latitude: '',
        longitude: '',
      },
      sensorStatus: 0,
      streamSize: 0,
      subscribed: false,
    },
  };

  fetchCurrentSensor = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { props } = this;
    const { sensorContractAddress } = props.match.params;
    try {
      props.toggleIsLoading(true);
      const result = await Sensor(sensorContractAddress).methods.describeSensor().call();
      const sensorSummary = await fetchSensorSummary(sensorContractAddress);
      this.setState({
        fetchedSensor: {
          sensorContractAddress,
          dataStreamEntityContractAddress: result[0],
          sensorType: result[1],
          geolocation: {
            latitude: result[2],
            longitude: result[3],
          },
          sensorStatus: result[4],
          streamSize: sensorSummary.streamSize,
          subscribed: false, // todo
        },
      });
    } catch (e) {
      this.setState({
        errors: e.message,
      });
      console.error('Error while fetching the Sensor for Address: ', sensorContractAddress, '\n', e);
    } finally {
      props.toggleIsLoading(false);
    }
  };

  componentDidMount = async () => {
    await this.fetchCurrentSensor();
  };

  render() {
    const { fetchedSensor, errors } = this.state;
    const sensorDetails = fetchedSensor.sensorContractAddress === '' ? null : <SensorDetails sensor={fetchedSensor} />;

    return (
      <Page title="Sensor Details">
        <Container maxWidth="lg">
          <Header sensorContractAddress={fetchedSensor.sensorContractAddress} />
          {errors}
          <Box mt={3}>{sensorDetails}</Box>
        </Container>
      </Page>
    );
  }
}

export default connect(null, { toggleIsLoading })(withRouter(_SensorDetailsView));
