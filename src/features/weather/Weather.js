import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  FETCH_FORECAST,
} from './constants';

// import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';

class Weather extends Component {
  componentDidMount() {
    this.props.dispatch({ type: FETCH_FORECAST });
  }

  render() {
    const {
      weather: {
        placename,
        items,
      },
    } = this.props;
    let markup;

    if (items) {
      markup = Object.keys(items).map((index) => {
        const itemsMarkup = items[index].map((i) =>
          <tr>
            <td><img src={`//openweathermap.org/img/w/${i.icon}.png`} alt="" /></td>
            <td>{`${i.main}:${i.description}`}</td>
            <td>{i.time}</td>
          </tr>
        );

        return (
          <Panel header={index}>
            <Table responsive>
              <thead>
                <tr>
                  <td></td>
                  <td>Weather</td>
                  <td>Time</td>
                </tr>
              </thead>
              <tbody>
                {itemsMarkup}
              </tbody>
            </Table>
          </Panel>
        );
      });
    } else {
      markup = 'Loading...';
    }

    return (
      <div>
        <h1>{placename}</h1>
        {markup}
      </div>
    );
  }
}

Weather.propTypes = {
  dispatch: PropTypes.func.isRequired,
  weather: PropTypes.object,
};

export default connect(state => state)(Weather);
