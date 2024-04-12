// import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
// import React from 'react'
// import styles from "./style"
// import Header from '../../components/Header'
// import images from '../../constants/images'
// import colors from '../../constants/colors'

// const ViewTicket = ({ navigation }) => {


//     return (
//         <View style={styles.mainView}>
//             <View style={styles.mainView1}>
//                 <View  style={{ width: "15%", paddingLeft: 20 }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Image source={images.cancel} style={{ height: 22, width: 22, resizeMode: "contain" }} />

//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ width: "70%", }}>
//                     <Text style={{ textAlign: 'center', fontFamily: fonts.SfPro_Semibold, fontSize: 20, color: colors.black }}>{"Your Ticket"}</Text>
//                 </View>
//                 <TouchableOpacity style={{ width: "15%", paddingRight: 20, }}>
//                     <Image source={images.share1} style={{ height: 22, width: 22, resizeMode: "contain", alignSelf: "flex-end" }} />
//                 </TouchableOpacity>

//             </View>

//             <View style={{ flex: 1 }}>
//                 <ScrollView>
//                     <View style={styles.ticketCardView}>
//                         <View style={{paddingHorizontal:20}}>
//                         <Image source={images.zumba} style={styles.eventImage} />
//                         <Text style={styles.eventTitle}>{"Zumba Workout"}</Text>
//                         <Text style={styles.date}>{"Sat, Dec 9 | 10 - 11 AM CST"}</Text>
//                         <Text style={styles.date}>{"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas"}</Text>
//                         </View>


//                         <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: 'gray', borderStyle: 'dashed', zIndex: 0,marginTop:30 }}>
//                             <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
//                         </View>
//                       <Text style={styles.ticketType}>1 Standard ticket(s)</Text>
//                       <View style={{paddingHorizontal:20}}>
//                        <Image source={images.barcode} style={styles.barcodeImg}/>
//                        </View>
//                        <View style={styles.cancellationView}>
//                         <Text style={styles.cancellationText}>Cancellation not available for this event</Text>
//                        </View>
//                        <View style={styles.totalAmountView}>
//                         <Text style={styles.amountText}>Total Amount</Text>
//                         <Text style={styles.amountText}>{"$100"}</Text>
//                        </View>
//                     </View>
//                 </ScrollView>
//             </View>
//             <View style={{ backgroundColor: "#fff" }}>
//                 <TouchableOpacity
//                     style={styles.button}
//                 >
//                     <Text style={styles.buttonText}>Go to Event</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default ViewTicket;


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const index = () => {
//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   )
// }

// export default index

// const styles = StyleSheet.create({})

import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import Barcode from 'react-native-barcode-svg';
import { useEffect } from 'react'

const ViewTicket = ({ navigation, route }) => {
    const { height, width } = useWindowDimensions();
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        let amount1 = 0
        const bookEventsArray = route?.params?.bookEvents
        bookEventsArray.map(item => {
            // console.log('amount>>>',item.amount , 'quantity>>>>',item.quantity);
            amount1 = amount1 + item.amount * item?.quantity
            // console.log('amount1>>>>',amount1);
        })
        setAmount(amount1)
    }, [])
    return (
        <View style={styles.mainView}>
            <View style={styles.mainView1}>
                <View style={{ width: "15%", paddingLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.cancel} style={{ height: 22, width: 22, resizeMode: "contain" }} />

                    </TouchableOpacity>
                </View>
                <View style={{ width: "70%", }}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.SfPro_Semibold, fontSize: 20, color: colors.black }}>{"Your Ticket"}</Text>
                </View>
                <TouchableOpacity style={{ width: "15%", paddingRight: 20, }}>
                    {/* <Image source={images.share1} style={{ height: 22, width: 22, resizeMode: "contain", alignSelf: "flex-end" }} /> */}
                </TouchableOpacity>

            </View>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <FlatList
                        data={route?.params?.bookEvents}
                        horizontal={true}
                        pagingEnabled={true}
                        style={{ width: '100%' }}
                        renderItem={({ item, index }) => {
                            console.log('fdsfdfdsfdss', item);
                            return (
                                <View style={[styles.ticketCardView, { width: width * 0.9 }]}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <Image source={{ uri: route?.params?.item?.image }} style={styles.eventImage} />
                                        <Text style={styles.eventTitle}>{route?.params?.item?.title}{index}</Text>
                                        <Text style={styles.date}>{route?.params?.item?.date?.when}</Text>
                                        <Text style={styles.date}>{route?.params?.item?.address[0]}</Text>
                                    </View>

                                    <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: 'gray', borderStyle: 'dashed', zIndex: 0, marginTop: 30 }}>
                                        <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />

                                    </View>
                                    <View style={{backgroundColor:'#f6f6f9',flex: 1,width: 100, alignSelf: 'center', borderRadius: 5, marginTop: -15}}>
                                     <Text style={styles.ticketType1}>{`Ticket ${index+1} of ${route?.params?.bookEvents?.length}`}</Text>
                                    </View>
                                    <Text style={styles.ticketType}>{`${item?.quantity} ${item?.planId} ticket(s) `}</Text>

                                    <View style={{ paddingHorizontal: 20, alignSelf: 'center', paddingVertical: 10 }}>
                                        <Barcode value={item.ticketNumber} format="CODE128" />
                                        <Text style={styles.ticketType}>{`Ticket Number  ${item.ticketNumber}`}</Text>
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: 50, alignSelf: 'flex-end', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                    </View>
                                    <View style={styles.cancellationView}>
                                        <Text style={styles.cancellationText}>Cancellation not available for this event</Text>
                                    </View>
                                    <View style={styles.totalAmountView}>
                                        <Text style={styles.amountText}>Total Amount</Text>
                                        <Text style={styles.amountText}>${amount}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />

                </ScrollView>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Go to Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ViewTicket;