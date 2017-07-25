import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebBrowser } from 'expo';
import { Colors, Fonts, Images, Layout } from '../constants';

const Sponsor = props => {
  const imageStyle = props.isLow ? styles.lowTier : {};

  return (
    <TouchableOpacity
      style={styles.sponsor}
      onPress={() => WebBrowser.openBrowserAsync(props.url)}>
      <Image style={imageStyle} source={props.image} />
    </TouchableOpacity>
  );
};

const Sponsors = () => {
  return (
    <View style={styles.sponsors}>
      <Text style={styles.heading}>Our Sponsors</Text>
      <Text style={styles.description}>
        We love the sponsors for this Ignus. They make all of this fun
        stuff possible, and we couldn’t have done it without them.
      </Text>

      <Text style={styles.sponsorTierTitle}>Platinum Sponsors</Text>
      <View style={styles.sponsorTier}>
        <Sponsor
          url={'https://www.facebook.com/esaksham/'}
          image={Images.rao}
        />
      </View>


    </View>
  );
};

export default Sponsors;

const styles = StyleSheet.create({
  sponsors: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 30,
    backgroundColor: Colors.transparent,
  },
  heading: {
    marginTop: 14,
    fontFamily: Fonts.type.bold,
    fontSize: 31,
    letterSpacing: 0.2,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#FDE5FF',
    letterSpacing: 0.47,
    lineHeight: 23,
  },
  sponsorTierTitle: {
    marginTop: 60,
    marginBottom: Layout.baseMargin,
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    color: Colors.snow,
    opacity: 0.6,
    letterSpacing: 0.5,
    lineHeight: 23,
  },
  sponsorTier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.screenWidth,
    flexWrap: 'wrap',
  },
  sponsor: {
    margin: 15,
    flexShrink: 0,
    alignItems: 'center',
  },
  lowTier: {
    marginHorizontal: 25,
  },
});
