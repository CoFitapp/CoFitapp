import { NativeModules, StyleSheet, Text, View, useWindowDimensions, Image, PixelRatio, Linking } from 'react-native';
import React, { useRef, useState } from 'react'
import Swiper from 'react-native-swiper';
import images from '../../constants/images';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useEffect } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import notifee from '@notifee/react-native';
import Sound from 'react-native-sound';
import { ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;

const OnBoardingScreen = () => {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    const swiperRef = useRef(null)
    const [index, setIndex] = useState(0)


    useEffect(()=> {
        // /var/mobile/Containers/Data/Application/21465186-7B51-4439-BD62-B6B02424BBE8/Documents/tickle.mp3
        const downloadFile = async() => {
            // const soundFilePath = `${Platform.select({
            //     ios: RNFS.DocumentDirectoryPath,
            //     android: 'file://' + RNFS.DocumentDirectoryPath,
            //   })}/testAudio.mp3`;

            //   const sound = new Sound('/var/mobile/Containers/Data/Application/21465186-7B51-4439-BD62-B6B02424BBE8/Documents/tickle.mp3', 'mp3', (error) => {
            //     if (error) {
            //       console.log('failed to load the sound', error);
            //       return;
            //     }
            //     // loaded successfully
            //     console.log('duration in seconds: ' + sound.getDuration() + ' - number of channels: ' + sound.getNumberOfChannels());
            //   });

            // return
            await notifee.requestPermission()
            await notifee.displayNotification({
                title: 'Notification Title',
                body: 'Main body content of the notification',
                ios:{
                  sound: 'bell.mp3',
                //   critical: 'true',
                //   criticalVolume: 0.9,

                }
              });
            return
            const url = 'https://api.cofitapp.com/uploads/tickle.mp3';
            const destinationPath = `${RNFetchBlob.fs.dirs.DocumentDir}/tickle.mp3`; // Set the destination path
          let a =   RNFetchBlob.fs.dirs.DocumentDir
          console.log('dsaddsdsdsdsasadsa', a);
            RNFetchBlob.config({
              fileCache: true,
              path: destinationPath,
            })
            .fetch('GET', url)
            .then(res => {
              // File was downloaded successfully
              console.log('File downloaded to:', res.path());
            })
            .catch(error => {
              // Error handling
              console.error('Error downloading file:', error);
            });
          };
    //   downloadFile()
    },[])

    return (
        <View style={styles.mainView}>
            <View style={styles.view1}>
                <View style={styles.swiperView}>
                    <Swiper
                        ref={swiperRef}
                        horizontal={true}
                        loop={false}
                        onIndexChanged={(ind) => setIndex(ind)}
                        dot={<View style={styles.dot}/>}
                        activeDot={<View style={styles.activeDot}/>}
                        dotStyle={styles.dotStyle}
                        paginationStyle={{marginBottom: 80}}
                    >

                            <FastImage source={images.walkthrough1} style={styles.img}>
                              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={styles.browse}>Uncover Fitness Near You</Text>
                                <Text style={styles.mission}>Explore a World of Fitness Events! Discover local yoga classes, outdoor adventures, and more right in your city.</Text>
                                <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.startedBtn}>
                                <Text style={styles.startedText}>Get Started</Text>
                                <Image source={images.next} style={styles.nextImg} />
                            </TouchableOpacity>
                            </View>
                              </View>
                            </FastImage>

                            <FastImage source={images.walkthrough2} style={styles.img}>
                              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={styles.browse}>Connect & Thrive Together</Text>
                                <Text style={styles.mission}>Join Our Fitness Family! Connect with like-minded individuals, share experiences, and build lasting friendships.</Text>
                                <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.startedBtn}>
                                <Text style={styles.startedText}>Get Started</Text>
                                <Image source={images.next} style={styles.nextImg} />
                            </TouchableOpacity>
                            </View>
                              </View>
                            </FastImage>

                            <FastImage source={images.walkthrough3} style={styles.img}>
                              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={styles.browse}>Achieve Your Fitness Goals</Text>
                                <Text style={styles.mission}>Chart your progress and hit every fitness target with CoFit. Your goals are within reach – let's achieve them together.</Text>
                                <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.startedBtn}>
                                <Text style={styles.startedText}>Get Started</Text>
                                <Image source={images.next} style={styles.nextImg} />
                            </TouchableOpacity>
                            </View>
                              </View>
                            </FastImage>

                    </Swiper>
                </View>

            </View>
        </View>
    )
}

export default OnBoardingScreen

