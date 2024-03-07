import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'

const ViewTicket = ({ navigation }) => {


    return (
        <View style={styles.mainView}>
            <View style={styles.mainView1}>
                <View  style={{ width: "15%", paddingLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.cancel} style={{ height: 22, width: 22, resizeMode: "contain" }} />

                    </TouchableOpacity>
                </View>
                <View style={{ width: "70%", }}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.SfPro_Semibold, fontSize: 20, color: colors.black }}>{"Your Ticket"}</Text>
                </View>
                <TouchableOpacity style={{ width: "15%", paddingRight: 20, }}>
                    <Image source={images.share1} style={{ height: 22, width: 22, resizeMode: "contain", alignSelf: "flex-end" }} />
                </TouchableOpacity>

            </View>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.ticketCardView}>
                        <View style={{paddingHorizontal:20}}>
                        <Image source={images.zumba} style={styles.eventImage} />
                        <Text style={styles.eventTitle}>{"Zumba Workout"}</Text>
                        <Text style={styles.date}>{"Sat, Dec 9 | 10 - 11 AM CST"}</Text>
                        <Text style={styles.date}>{"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas"}</Text>
                        </View>
                        

                        <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: 'gray', borderStyle: 'dashed', zIndex: 0,marginTop:30 }}>
                            <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                        </View>
                      <Text style={styles.ticketType}>1 Standard ticket(s)</Text>
                      <View style={{paddingHorizontal:20}}>
                       <Image source={images.barcode} style={styles.barcodeImg}/>
                       </View>
                       <View style={styles.cancellationView}>
                        <Text style={styles.cancellationText}>Cancellation not available for this event</Text>
                       </View>
                       <View style={styles.totalAmountView}>
                        <Text style={styles.amountText}>Total Amount</Text>
                        <Text style={styles.amountText}>{"$100"}</Text>
                       </View>
                    </View>
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