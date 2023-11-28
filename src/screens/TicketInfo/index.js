import { NativeModules, PixelRatio, Image, StyleSheet, Dimensions, Text, View, useWindowDimensions, TextInput, ScrollView, FlatList, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from "../../constants/fonts";
import images from '../../constants/images';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import Toast from 'react-native-simple-toast';
import * as services from '../../constants/services'
import * as Url from '../../constants/url'

const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const TicketInfo = ({ navigation, route }) => {
    console.log('3278462364683428', route.params);
    const [capacity, setCapacity] = useState("")
    const [amount, setAmount] = useState("")

    const [freeClick, setFreeClick] = useState(false)
    const [offlineClick, setOfflineClick] = useState(null)
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const data = [
        { label: '20', value: '20' },
        { label: '50', value: '50' },
        { label: '75', value: '75' },
        { label: '100', value: '100' },
        { label: '150', value: '150' },
        { label: '200+', value: '200 +' },
    ];


    const onSubmit = async () => {
        if (capacity.trim().length == 0) {
            Toast.show('Please select capacity.')
        }
        else if (offlineClick == null) {
            Toast.show('Please choose event type.')
        }
        else if (offlineClick && amount.trim().length == 0) {

            Toast.show('Please add amount')
        }
        else {

            let newData = {
                ...route.params.newData,
                capacity: capacity,
                isPaid: freeClick ? false : true,
                amount: amount,
            }
            navigation.navigate("EventReview",{newData:newData})
            return;
            let data = {
                'events': {
                    ...route.params.eventData.events,
                    capacity: capacity,
                    isPaid: freeClick ? false : true,
                    amount: amount,
                },
                user_id: route.params.eventData.user_id

            }
            console.log('dasdhjgasjgdacsgskjdajkgakj', data);
            let response = await services.post(Url.ADD_EVENTS, "", data, 'json')
            console.log('d293yf23sagg238gdsad83g8g82', response);
        }

    }

    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1,
            paddingTop: Platform.OS == "ios" ? statusBarHeight : 0
        }}>
            <View style={{ flex: 0.85, }}>
                <KeyboardAwareScrollView>
                    <View style={{ marginHorizontal: width * .03, }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Image style={{
                                    marginLeft: 15,
                                    height: 15,
                                    width: 15,
                                    resizeMode: "contain",
                                }} source={images.back}></Image>
                            </TouchableOpacity>
                            <Text style={{ textAlign: "center", fontFamily: fonts.SfPro_Bold, fontSize: 22, }}>Ticket Info</Text>

                            <View style={{ flex: 1 }} />
                        </View>
                        <Text style={{
                            color: "#363C49",
                            fontSize: 18,
                            fontFamily: fonts.SfPro_Bold, marginTop: 20
                        }}>Add Capacity</Text>

                        <View style={{ marginTop: 20, borderColor: '#8B93A1', justifyContent: 'center', width: width * 0.94, borderWidth: 1, height: 40, borderRadius: 5, padding: 10 }}>
                            <Dropdown
                                style={{}}

                                data={data}

                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select Capacity'}
                                containerStyle={{ borderRadius: 5, height: 150, alignSelf: "flex-start", width: width * 0.94, left: 11, marginTop: 10 }}
                                value={capacity}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setCapacity(item.value)
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}

                            />
                        </View>
                        <Text style={{
                            color: "#363C49",
                            fontSize: 18,
                            fontFamily: fonts.SfPro_Bold, marginTop: 20
                        }}>Add Type</Text>
                        <View style={{ flexDirection: 'row', width: width * 1, marginTop: 20 }}>

                            <TouchableOpacity onPress={() => { setFreeClick(true), setOfflineClick(false) }} style={{ height: 40, backgroundColor: freeClick ? colors.orange_light : "white", alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: width * 0.45, borderColor: "#8B93A1", borderWidth: 1, }}>
                                <Text style={{ fontFamily: fonts.SfPro_Medium, color: freeClick ? '#fff' : "#000" }}>Free Event</Text>


                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setOfflineClick(true), setFreeClick(false) }} style={{ height: 40, backgroundColor: offlineClick ? colors.orange_light : "#fff", alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: width * 0.45, borderColor: "#8B93A1", borderWidth: 1, marginLeft: width * 0.04 }}>
                                <Text style={{ fontFamily: fonts.SfPro_Medium, color: offlineClick ? '#fff' : "#000" }}>Paid Event</Text>

                            </TouchableOpacity>

                        </View>
                        {
                            offlineClick &&
                            <View style={{ borderWidth: 1, height: 40, justifyContent: "center", borderColor: "#8B93A1", borderRadius: 5, marginTop: 20, paddingHorizontal: 5, }}>
                                <TextInput
                                    onChangeText={(text) => setAmount(text)}
                                    keyboardType="numeric"
                                    // multiline={true} 
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    value={amount}
                                    style={{
                                        fontSize: 16,
                                        color: "#000",
                                        marginLeft: '5%',
                                        fontFamily: fonts.SfPro_Regular,
                                        alignItems: "center"
                                    }}
                                    placeholderTextColor="#000"
                                    placeholder='Amount'>

                                </TextInput>
                            </View>
                        }

                    </View>

                </KeyboardAwareScrollView>
            </View>
            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: colors.orange_light, width: width * 0.94, height: 50, borderRadius: 10, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 16,
                        color: "#fff",
                        marginLeft: '5%',
                        fontFamily: fonts.SfPro_Semibold
                    }}>Review & Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
export default TicketInfo