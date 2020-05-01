import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Container, Divider } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Page from '../../../../components/Page';
import Sensor from '../../../../blockchain/sensor';
import { toggleIsLoading } from '../../../../state/actions';
import SensorDetails from './SensorDetails';

type PathParamsType = {
  sensorContractAddress: string;
};

type PropsType = RouteComponentProps<PathParamsType> & {
  toggleIsLoading: typeof toggleIsLoading;
};

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class _InvoiceDetailsView extends React.Component<PropsType> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    errors: null,
    fetchedSensor: {
      sensorContractAddress: '',
      sensorType: 0,
      geolocation: {
        latitude: '',
        longitude: '',
      },
    },
  };

  componentDidMount = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { props } = this;
    const { sensorContractAddress } = props.match.params;
    try {
      props.toggleIsLoading(true);
      const result = await Sensor(sensorContractAddress).methods.describeSensor().call();
      this.setState({
        fetchedSensor: {
          sensorContractAddress,
          sensorType: result[1],
          geolocation: {
            latitude: result[2],
            longitude: result[3],
          },
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

  render() {
    const { fetchedSensor, errors } = this.state;
    const sensorDetails = fetchedSensor.sensorContractAddress === '' ? null : <SensorDetails sensor={fetchedSensor} />;

    return (
      <Page title="Sensor Details">
        <Container maxWidth="lg">
          {errors}
          {/* <Header invoice={invoice} /> */}
          <Box my={2}>
            <Divider />
          </Box>
          {sensorDetails}
        </Container>
      </Page>
    );
  }
}

export default connect(null, { toggleIsLoading })(withRouter(_InvoiceDetailsView));
