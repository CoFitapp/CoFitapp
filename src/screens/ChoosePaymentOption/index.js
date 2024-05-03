import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { useEffect } from 'react'
import { PlatformPayButton, isPlatformPaySupported, confirmPlatformPayPayment, PlatformPay, useStripe, } from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setSavedPaymentMethod } from '../../redux/slices/userSlice'
import { useIsFocused } from '@react-navigation/native'
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image'

const ChoosePaymentOption = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const savedPaymentMethod = useSelector((state) => state.user.savedPaymentMethod);
  console.log('767254765324623675543276', savedPaymentMethod)
  const [isApplePaySelected, setIsApplePaySelected] = useState(false)
  const [isPaypalSelected, setIsPaypalSelected] = useState(false)
  const [savedCards, setSavedCards] = useState([])
  const [loader, setLoader] = useState(true)
  const [paymentMethodId, setPaymentMethodId] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  // const [loader,setLoader] = useState
  const { confirmPayment, } = useStripe();
  console.log('rwexasdiodsadurwesaosadiewr', userInfo);

  useEffect(() => {
    if (isFocused) {
      fetchCustomerPaymentMethods();
    }

  }, [isFocused])

  useEffect(() => {
    async function checkApplePayAvailable() {
      console.log('dasjdhdhjashkjahk', await isPlatformPaySupported());
    }
    checkApplePayAvailable();
  }, [])

  const fetchCustomerPaymentMethods = async () => {

    let customerId = userInfo?.stripeCustomerId;
    let url = `${Url.GET_CARDS}/${customerId}`
    let response = await services.get(url)
    console.log('responsedasaseee', JSON.stringify(response.cards));
    if (response.success) {
      setLoader(false)
      if(response.cards.length > 0 && savedPaymentMethod && Object.keys(savedPaymentMethod).length > 0) {
        let selectedPaymentIndex = response.cards.findIndex(card => card.id == savedPaymentMethod.id)
        response.cards.map((itm, ind) => {
          if (selectedPaymentIndex != -1 && ind == selectedPaymentIndex) {
            itm.isSelected = true
          } else {
            itm.isSelected = false
          }
        })
      } else {
        response.cards.map(item => item.isSelected = false)
      }
      setSavedCards(response.cards)
    } else {
      setLoader(false)
      setSavedCards([])
    }
  }

  const onSelectPaymentMethod = (itemm, indexx) => {
    console.log('dskjdashdhsaasasaaskjhkaj', itemm);
    setPaymentMethodId(itemm.id)

    let arr = [...savedCards]
    setIsApplePaySelected(false)
    setIsPaypalSelected(false)
    arr.map((item, index) => {
      if (index == indexx) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    })
    setSavedCards(arr)
    dispatch(setSavedPaymentMethod(itemm))
    navigation.goBack()
  }

  const onSelectPaymentMethod1 = (itemm, indexx) => {
    let arr = [...savedCards]
    arr.map((item, index) => {
      item.isSelected = false;
    })
    setSavedCards(arr)
    setPaymentMethodId('')
    dispatch(setSavedPaymentMethod(''))
    navigation.goBack()
  }

  const renderBrandImage = (brand) => {
    console.log('djakshjkdahkshkahk',brand);
    let image = images.Visa;
    if (brand == "mastercard") {
      image = images.Mastercard
    } else if (brand == "visa") {
      image = images.Visa
    } else if (brand == 'amex') {
      image = images.Amex
    } else if (brand == 'discover') {
      image = images.Discover
    }
    return (
      <Image source={image} style={styles.cardView1} />
    )
  }

  return (
    <View style={styles.mainView}>
      <Header title="Payment" />
      {
        loader
        ?
        <ActivityIndicator color={'#000'} size={'large'} style={{alignSelf:'center', justifyContent:'center', alignItems: 'center'}}/>
        :
        <View style={{ }}>
        <Text style={styles.orderSummaryText}>Current Payment Options</Text>
        <View style={styles.seperator} />
          <FlatList
            data={savedCards}
            style={{  }}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => onSelectPaymentMethod(item, index)}>
                  <View style={[styles.cardView]}>
                    <View style={styles.subView1}>
                      {renderBrandImage(item?.card?.brand)}

                      <View style={{}}>
                        <Text style={styles.text}>{`${item?.card?.brand} ...${item?.card?.last4}`}</Text>
                        <Text style={styles.expiry}>{`Expiration: ${item?.card?.exp_month}/${item?.card?.exp_year}`}</Text>
                      </View>
                    </View>
                    <View style={styles.subView2}>
                      <View style={[styles.checkbox, { borderColor: item?.isSelected ? colors.blue : colors.black }]}>
                        {
                          item?.isSelected &&
                          <View style={{ height: 14, width: 14, borderRadius: 8, backgroundColor: colors.blue }} />
                        }
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          <View style={styles.seperator}/>
          <TouchableOpacity onPress={() => { setIsApplePaySelected(!isApplePaySelected), setIsPaypalSelected(false), onSelectPaymentMethod1() }} style={[styles.cardView]}>
            <View style={styles.subView1}>
              <Image source={images.applePay} style={styles.cardView1} />
              <Text style={styles.text}>Apple Pay</Text>
            </View>
            <View style={styles.subView2}>
              <View style={[styles.checkbox, { borderColor: isApplePaySelected ? colors.blue : colors.black }]}>
                {
                  isApplePaySelected &&
                  <View style={{ height: 14, width: 14, borderRadius: 8, backgroundColor: colors.blue }} />
                }
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.seperator} />
          <Text style={styles.orderSummaryText}>Add Payment Type</Text>
          <View style={styles.seperator} />
          <TouchableOpacity onPress={() => navigation.navigate("AddCard")} style={styles.cardView}>
            <View style={styles.subView1}>
              <Image source={images.card1} style={styles.cardView1} />
              <Text style={styles.text}>Add Debit/Credit card</Text>
            </View>
            <View style={styles.subView2}>
              <Image source={images.backArrow} style={styles.nextImage} />
            </View>
          </TouchableOpacity>
          <View style={styles.seperator}/>

      </View>
      }

    </View>
  )
}

export default ChoosePaymentOption;