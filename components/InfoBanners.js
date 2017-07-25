import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient, WebBrowser } from 'expo';

import { Colors, Fonts, Images } from '../constants';
import RoundedButton from './RoundedButton';

export class SlackBanner extends React.PureComponent {
  render() {
    return (
      <LinearGradient
        colors={['#136EB5', 'rgba(1,192,182,0.88)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={slackStyles.container}>
        <Image style={slackStyles.icon} source={Images.slack} />
        <Text style={slackStyles.heading}>Join Us On Facebook</Text>
        <RoundedButton
          text="Join the Ignus Community"
          onPress={() => {
            WebBrowser.openBrowserAsync('http://facebook.com/ignus.iitj');
          }}
          style={slackStyles.button}
        />
      </LinearGradient>
    );
  }
}

export class TwitterBanner extends React.PureComponent {
  render() {
    return (
      <View style={twitterStyles.container}>
        <Image style={twitterStyles.blowhorn} source={Images.blowhorn} />
        <TouchableOpacity onPress={this._tweetWithHashtag}>
          <Text style={twitterStyles.heading}>#Ignus2018</Text>
        </TouchableOpacity>
        <Text style={twitterStyles.description}>
          Make your friends jealous by tweeting, posting, or whatever it is you
          do with the hashtag&nbsp;
          <Text style={twitterStyles.hashtag} onPress={this._tweetWithHashtag}>
            #Ignus2018
          </Text>.
        </Text>
      </View>
    );
  }

  _tweetWithHashtag = async () => {
    const appURL = 'twitter://post?hashtags=Ignus2018';
    const webURL = 'https://twitter.com/intent/tweet?hashtags=Ignus2018';
    try {
      await Linking.openURL(appURL);
    } catch (err) {
      WebBrowser.openBrowserAsync(webURL);
    }
  };
}

const slackStyles = StyleSheet.create({
  heading: {
    marginTop: 14,
    fontFamily: Fonts.type.bold,
    fontSize: 31,
    letterSpacing: 0.2,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 55,
    paddingBottom: 35,
  },
  button: {
    marginTop: 25,
  },
});

const twitterStyles = StyleSheet.create({
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
  hashtag: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.snow,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: Colors.transparent,
  },
});
