import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { maybeOpenURL } from 'react-native-app-link';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Images, Layout } from '../constants';
import openExternalMapApp from '../utilities/openExternalMapApp';
const VENUE_LATITUDE = 26.475491;
const VENUE_LONGITUDE = 73.1154897;
const UBER_CLIENT_ID = 'abc123';

export default class VenueMapActions extends React.PureComponent {
  state = {
    showRideOptions: false,
  };

  render() {
    return (
      <View>
        <View style={styles.mapActions}>
          <DirectionsButton />
          <View style={styles.mapActionsSeparator} />
          {this._renderRideShareButton()}
        </View>

        {this._maybeRenderRideOptions()}
      </View>
    );
  }

  maybeClose = () => {
    if (this.state.showRideOptions) {
      this._toggleRides();
      return true;
    } else {
      return false;
    }
  };

  _renderRideShareButton() {
    return (
      <View>
        <Touchable
          background={Touchable.Ripple('#ccc')}
          onPress={this._toggleRides}>
          <View style={styles.getRide}>
            <Text style={styles.getRideLabel}>Taking an Uber or Ola?</Text>
            <Ionicons
              name="ios-arrow-down"
              size={35}
              style={[
                styles.getRideIcon,
                this.state.showRideOptions && styles.flip,
              ]}
            />
          </View>
        </Touchable>
      </View>
    );
  }

  _maybeRenderRideOptions() {
    return (
      <View
        style={[
          styles.rideOptions,
          this.state.showRideOptions && { height: 170 },
        ]}>
        <Touchable
          foreground={Touchable.Ripple('#ccc', false)}
          onPress={this._openLyftAsync}>
          <Image style={styles.rideButton} source={Images.lyftButton} />
        </Touchable>
        <Touchable
          foreground={Touchable.Ripple('#ccc', false)}
          onPress={this._openUberAsync}>
          <Image style={styles.rideButton} source={Images.uberButton} />
        </Touchable>
      </View>
    );
  }

  _openLyftAsync = () => {
    const drop_lat = `drop_lat=${VENUE_LATITUDE}`;
    const drop_lng = `drop_lng=${VENUE_LONGITUDE}`;
    const lyft = `olacabs://app/launch?landing_page=bk&drop_lat=<drop_lat>&drop_lng=<drop_lng>`;

    maybeOpenURL(lyft, {
      appName: 'Ola',
      appStoreId: 'id529379082',
      playStoreId: 'com.olacabs',
    });
  };

  _openUberAsync = () => {
    const pickup = 'action=setPickup&pickup=my_location';
    const client = `client_id=${UBER_CLIENT_ID}`;
    const lat = `dropoff[latitude]=${VENUE_LATITUDE}`;
    const lng = `dropoff[longitude]=${VENUE_LONGITUDE}`;
    const nick = `dropoff[nickname]=IIT%20Jodhpur`;
    const daddr = `dropoff[formatted_address]=NH%2076%20Karwad`;
    const uber = `uber://?${pickup}&${client}&${lat}&${lng}&${nick}&${daddr}`;

    maybeOpenURL(uber, {
      appName: 'Uber',
      appStoreId: 'id368677368',
      playStoreId: 'com.ubercab',
    });
  };

  _toggleRides = () => {
    this.setState({ showRideOptions: !this.state.showRideOptions }, () => {
      if (this.state.showRideOptions) {
        this.props.onFocus && this.props.onFocus();
      }
    });
  };
}

class DirectionsButton extends React.PureComponent {
  render() {
    return (
      <Touchable
        background={Touchable.Ripple('#ccc', false)}
        onPress={this._handlePress}>
        <View style={styles.getDirections}>
          <View style={styles.addressContainer}>
            <Text style={styles.venueName}>IIT, Jodhpur</Text>
            <Text style={styles.venueAddress}>
              NH76.{'\n'}Karwad
            </Text>
          </View>
          <View style={styles.directionsIcon}>
            <Image source={Images.directionsIcon} />
            <Text style={styles.directionsLabel}>Directions</Text>
          </View>
        </View>
      </Touchable>
    );
  }

  _handlePress = () => {
    openExternalMapApp('128+NW+Eleventh+Ave+Portland,+OR+97209');
  };
}

const styles = StyleSheet.create({
  mapActions: {
    backgroundColor: Colors.snow,
    borderTopWidth: 1,
    borderTopColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOffset: {
      x: 10,
      y: 10,
    },
    shadowOpacity: 0.3,
    zIndex: 1,
  },
  mapActionsSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  getDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  venueName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
  venueAddress: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: Colors.lightText,
  },
  addressContainer: {
    flex: 4,
  },
  directionsIcon: {
    alignItems: 'center',
  },
  directionsLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
  getRide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  getRideLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.5,
    color: Colors.darkPurple,
  },
  getRideIcon: {
    marginRight: 15,
  },
  rideButton: {
    margin: 1.2 * Layout.smallMargin,
  },
  rideOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#EDEDED',
  },
  flip: {
    transform: [
      {
        rotate: '180 deg',
      },
    ],
  },
});
