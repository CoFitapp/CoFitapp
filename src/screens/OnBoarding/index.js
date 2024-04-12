import { NativeModules, StyleSheet, Text, View, useWindowDimensions, Image, PixelRatio, Linking } from 'react-native';
import React, { useRef, useState } from 'react'
import Swiper from 'react-native-swiper';
import images from '../../constants/images';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useEffect } from 'react';

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;

const OnBoardingScreen = () => {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    const swiperRef = useRef(null)
    const [index, setIndex] = useState(0)


    return (
        <View style={styles.mainView}>
            <View style={styles.view1}>
                <View style={styles.swiperView}>
                    <Swiper
                        ref={swiperRef}
                        horizontal={true}
                        loop={false}
                        activeDotColor='#25C3F4'
                        onIndexChanged={(ind) => setIndex(ind)}
                    >
                        <View style={{}}>
                            <Image source={images.onboarding1} style={styles.img} />
                            <Text style={styles.browse}>Browse Popular</Text>
                            <Text style={styles.fitness}>Fitness Event</Text>
                            <Text style={styles.mission}>Our Mission is to provide whats happening near you, browse and search, for the type of events you like to attend.</Text>
                        </View>
                        <View style={{}}>
                            <Image source={images.onboarding2} style={styles.img} />
                            <Text style={styles.choose}>Choose a location</Text>
                            <Text style={styles.fitness}>below to get started.</Text>
                            <Text style={styles.mission1}>Our Mission is to provide whats happening near you, browse and search, for the type of events you like to attend.</Text>
                        </View>
                        <View style={{}}>
                            <Image source={images.onboarding3} style={styles.img} />
                            <Text style={styles.choose}>Strong, Fit, Healthy</Text>
                            <Text style={styles.fitness}>and Happy!</Text>
                            <Text style={styles.mission1}>Our Mission is to provide whats happening near you, browse and search, for the type of events you like to attend.</Text>
                        </View>
                    </Swiper>
                </View>
                {
                    index == 2
                        ?
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.startedBtn}>
                                <Text style={styles.startedText}>Get Started</Text>
                                <Image source={images.next} style={styles.nextImg} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.skipBtn}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => swiperRef.current.scrollBy(1)} style={styles.nextBtn}>
                                <Text style={styles.startedText}>Next</Text>
                                <Image source={images.next} style={styles.nextImg} />
                            </TouchableOpacity>
                        </View>
                }

            </View>
        </View>
    )
}

export default OnBoardingScreen

