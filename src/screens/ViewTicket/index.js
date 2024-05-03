import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, useWindowDimensions, Share } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import Barcode from 'react-native-barcode-svg';
import { useEffect } from 'react'
import FastImage from "react-native-fast-image";
import * as services from '../../constants/services'
import * as Url from '../../constants/url'

const ViewTicket = ({ navigation, route }) => {
    const { height, width } = useWindowDimensions();
    const [amount, setAmount] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    var index = 0
    useEffect(() => {
        let amount1 = 0
        const bookEventsArray = route?.params
        console.log('fdsfsdsdasdssdsadsda',bookEventsArray );
        // bookEventsArray.map(item => {
        //     // console.log('amount>>>',item.amount , 'quantity>>>>',item.quantity);
        //     amount1 = amount1 + item.amount * item?.quantity
        //     // console.log('amount1>>>>',amount1);
        // })
        setAmount(amount1)
    }, [])

    const shareTicket =async()=> {
     Share.share({
        url: `${Url.BASE_URL}/ticket/${route?.params?.bookEvents[index].ticketNumber}`,
        message: 'Hey there, Please find the events ticket here',
        title:'Hey there, Please find the events ticket here.'
     })
    }

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
          // Update the active index to the index of the first visible item
        //   setActiveIndex(viewableItems[0].index || 0);
        let a = viewableItems[0].index || 0
        index = a
        console.log('indddddd', a);
        // setActiveIndex(a)

        }
      };

    return (
        <View style={styles.mainView}>
            <View style={styles.mainView1}>
                <View style={{ width: "15%", paddingLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.arrNew1} style={{ height: 22, width: 22, resizeMode: "contain", transform:[{rotate:'180deg'}]}} />

                    </TouchableOpacity>
                </View>
                <View style={{ width: "70%", }}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.SfPro_Semibold, fontSize: 20, color: colors.black }}>{"Your Ticket"}</Text>
                </View>
                <TouchableOpacity onPress={() => shareTicket()} style={{ width: "15%", paddingRight: 20, }}>
                    <Image source={images.share1} style={{ height: 22, width: 22, resizeMode: "contain", alignSelf: "flex-end" }} />
                </TouchableOpacity>

            </View>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <FlatList
                        data={route?.params?.bookEvents}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                        // onViewableItemsChanged={(e)=> console.log('3764343432322846328', e.changed)}
                        style={{ width: '100%' }}
                        renderItem={({ item, index }) => {
                            console.log('fdsfdfdsfdss', item);
                            return (
                                <View style={[styles.ticketCardView, { width: width * 0.9 }]}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <FastImage
                                        source={{uri: route?.params?.item?.image }}
                                        style={styles.eventImage}
                                        />
                                        {/* <Image source={{ uri: route?.params?.item?.image }} style={styles.eventImage} /> */}
                                        <Text style={styles.eventTitle}>{route?.params?.item?.title}</Text>
                                        <Text style={styles.date}>{route?.params?.item?.date?.when}</Text>
                                        <Text style={styles.date}>{route?.params?.item?.address[0]}</Text>
                                    </View>

                                    <View style={{marginTop: 50}}>
                                    <View style={{ height: 1, width: '100%',alignSelf:'center', borderRadius: 1, borderWidth: 1, borderColor: 'gray', borderStyle: 'dashed', zIndex: 0 }}>
                                        <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />

                                    </View>
                                    <View style={{backgroundColor:'#f6f6f9',width: 100,height:30, alignSelf: 'center', borderRadius: 5, marginTop: -15}}>
                                     <Text style={styles.ticketType1}>{`Ticket ${index+1} of ${route?.params?.bookEvents?.length}`}</Text>
                                    </View>
                                    </View>
                                    <View style={{height: 60, marginTop: -45, flexDirection: 'row',justifyContent:'space-between'}}>
                                    <View style={{height: 60, width: 60, borderRadius: 60, backgroundColor: '#E7ECF0',marginLeft: -30}}/>
                                    <View style={{height: 60, width: 60, borderRadius: 60, backgroundColor: '#E7ECF0',marginRight: -30}}/>
                                    </View>



                                    <Text style={styles.ticketType}>{`Ticket Number  #${item.ticketNumber}`}</Text>
                                    <View style={{ paddingHorizontal: 20, alignSelf: 'center', paddingVertical: 10 }}>
                                        <Barcode value={item.ticketNumber} format="CODE128" />
                                        <View style={{flexDirection: 'row',alignItems: 'center', marginTop: 10, alignSelf: 'center'}}>
                                        <Text style={styles.ticketType2}>{`POWERED BY`}</Text>
                                        <Image source={images.cofitLogo} style={{height:20, width: 40, resizeMode: 'contain', marginLeft: 5}}/>
                                        </View>

                                        {/* <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: 50, alignSelf: 'flex-end', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        </View> */}
                                    </View>
                                    {/* <View style={styles.cancellationView}>
                                        <Text style={styles.cancellationText}>Cancellation not available for this event</Text>
                                    </View> */}
                                    {/* <View style={styles.totalAmountView}>
                                        <Text style={styles.amountText}>Total Amount</Text>
                                        <Text style={styles.amountText}>${amount}</Text>
                                    </View> */}
                                </View>
                            )
                        }}
                    />

                </ScrollView>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => navigation.navigate('EventDetail',{item: route.params.item})}
                >
                    <Text style={styles.buttonText}>Go to Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ViewTicket;