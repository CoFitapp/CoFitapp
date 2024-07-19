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
import Tooltip from 'react-native-walkthrough-tooltip';
import { PlatformPayButton, isPlatformPaySupported, confirmPlatformPayPayment, PlatformPay, useStripe, } from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setSavedPaymentMethod } from '../../redux/slices/userSlice'
import { useIsFocused } from '@react-navigation/native'
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image'
const OrderDetails = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const savedPaymentMethod = useSelector((state) => state.user.savedPaymentMethod);
  // console.log('76725476532dddsasa4623675543276', route.params.userObj.selectedTicketQuantity)
  const [isApplePaySelected, setIsApplePaySelected] = useState(false)
  const [isPaypalSelected, setIsPaypalSelected] = useState(false)
  const [savedCards, setSavedCards] = useState([])
  const [loader, setLoader] = useState(false)
  const [paymentMethodId, setPaymentMethodId] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [toolTipVisible, settoolTipVisible] = useState(false)
  const [promoCodes, setPromoCodes] = useState([])
  const [appliedPromoCode, setAppliedPromoCode] = useState({})
  const [promoError, setPromoError] = useState('')
  const [bookingFee, setBookingFee] = useState(0)
  // const [loader,setLoader] = useState

  const { confirmPayment, } = useStripe();
  console.log('rwexasdiodsadurwesaosadiewr', userInfo);

  useEffect(() => {
    if (isFocused) {
      fetchCustomerPaymentMethods();
      fetchPromoCodes()
      getBookingFee()
    }

  }, [isFocused])

  useEffect(() => {
    async function checkApplePayAvailable() {
      console.log('dasjdhdhjashkjahk', await isPlatformPaySupported());
    }
    checkApplePayAvailable();
  }, [])

  const getBookingFee =()=>{
    let amount = route.params?.userObj?.totalAmount
    let PlatformAndStripeFee;

    if (amount <= 100) {
      PlatformAndStripeFee = (amount * 12.9 / 100 + 0.30).toFixed(2)
    } else if (amount <= 500) {
      PlatformAndStripeFee = (amount * 10.9 / 100 + 0.30).toFixed(2)
    } else if (amount <= 1000) {
      PlatformAndStripeFee = (amount * 8.9 / 100 + 0.30).toFixed(2)
    } else {
      PlatformAndStripeFee = (amount * 7.9 / 100 + 0.30).toFixed(2)
    }
    setBookingFee(Number(PlatformAndStripeFee))
  }

  const fetchPromoCodes = async () => {
    const res = await services.get(Url.GET_PROMO_CODES)
    console.log('dsasdsadsdasdsa', res);
    if (res.status && res.promoCodes && res.promoCodes.length > 0) {
      setPromoCodes(res.promoCodes)
    } else {
      setPromoCode([])
    }
  }

  const fetchCustomerPaymentMethods = async () => {

    let customerId = userInfo?.stripeCustomerId;
    let url = `${Url.GET_CARDS}/${customerId}`
    let response = await services.get(url)
    console.log('responsedasaseee', JSON.stringify(response.cards));
    if (response.success) {
      // setLoader(false)
      response.cards.map(item => item.isSelected = false)
      setSavedCards(response.cards)
    } else {
      // setLoader(false)
      setSavedCards([])
    }
  }

  const onSelectPaymentMethod = (itemm, indexx) => {
    console.log('dskjdashdhaskjhkaj', itemm.id);
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
  }

  const onSelectPaymentMethod1 = (itemm, indexx) => {
    let arr = [...savedCards]
    arr.map((item, index) => {
      item.isSelected = false;
    })
    setSavedCards(arr)
    setPaymentMethodId('')
  }

  const onPurchaseTicket = async () => {
    console.log('payment method id1132ewqewq11', savedPaymentMethod);
    // return;
    // if (paymentMethodId?.length == 0 && !isApplePaySelected && !isPaypalSelected) {
    //   alert("Please select any payment method.")
    //   return;
    // }

    // if (isApplePaySelected) {
    //   payWithApplePay()
    //   return;
    // }
    if (Object.keys(savedPaymentMethod).length <= 0) {
      payWithApplePay()
      return;
    }
    setLoader(true)

    let amount = route.params?.userObj?.totalAmount
    let discount = 0
    if(Object.keys(appliedPromoCode).length > 0) {
      discount = (amount * Number(appliedPromoCode.value) / 100) * 100
    }
     console.log('discountdiscountdiscount', discount);
    //  return
    let data = {
      "amount": (amount * 100) + (bookingFee * 100) - discount ,
      "currency": "usd",
      "payment_method": savedPaymentMethod?.id,
      // "on_behalf_of": route.params?.userObj?.event?.accountId,
      "transfer_data": {
        "amount": (amount * 100) - discount,
        "destination": route.params?.userObj?.event?.accountId
      },
      "metadata": {
        "eventId": route?.params?.userObj?.event?.id
      },
      // "return_url": "https://apple.cofitapp.com?id=1212",
      "description": "Description of the transaction",
      "customer": userInfo?.stripeCustomerId
    }
    console.log('dadadadadadaad', data);
    let response = await services.post(Url.CREATE_PAYMENT_INTENT, '', data, 'json')
    console.log('responsdseeeee', response);
    // return;
    if (response.status) {
      // confirmPaymentIntent(response?.client_secret);
      bookTicket(response?.client_secret, response?.payment_intent_id, 1)
    } else {
      setLoader(false)
      alert(response?.error)
      console.log('error in create payment Intent Api', response);
    }
  }

  const confirmPaymentIntent = async (paymentSecret) => {
    console.log('payment Intent Id1111', paymentSecret);

    const { paymentIntent, error } = await confirmPayment(paymentSecret, {
      paymentMethodType: "Card",
      paymentMethodData: { paymentMethodId: savedPaymentMethod?.id },
      billingDetails: {
        email: 'test@gmail.com',
        name: 'test user',
        address: 'california, USA'
      }
    })
    if (error) {
      console.log("error3264sdsds5374532", error)
      setLoader(false)
      alert(error.message)
    } else {
      // setPaymentType();
      console.log("payment scuessfull!dsdssss", paymentIntent)
      setLoader(false)
      // bookTicket(paymentIntent?.id)
      alert('event booked successfully.')
      navigation.navigate('MyEvents')

    }
  }

  const payWithApplePay = async () => {
    setLoader(true)
    let amount = route.params?.userObj?.totalAmount
    let discount = 0
    if(Object.keys(appliedPromoCode).length > 0) {
      discount = (amount * Number(appliedPromoCode.value) / 100) * 100
    }

    let data = {
      "amount": (amount * 100) + (bookingFee * 100) - discount,
      "currency": "usd",
      // "on_behalf_of": route.params?.userObj?.event?.accountId,
      "transfer_data": {
        "amount": (amount * 100) - discount,
        "destination": route.params?.userObj?.event?.accountId
      }
    }
    let response = await services.post(Url.CREATE_PAYMENT_INTENT_NEW, "", data, "json")
    console.log('create payment intent new api response11111', response);
    if (response?.status) {
      bookTicket(response?.client_secret, response?.payment_intent_id, 2)
    } else {
      alert(response?.message)
      setLoader(false)
    }

  };

  const paymentWithApple = async (paymentIntentId) => {

    const { error, paymentIntent } = await confirmPlatformPayPayment(
      paymentIntentId,
      {
        applePay: {
          cartItems: [
            {
              label: 'Example item name',
              amount: '10.00',
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: 'Total',
              amount: `${route.params?.userObj?.totalAmount}.00`,
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      }
    );
    if (error) {
      console.log('error in apple pay', error);
      alert(error?.message)
      // handle error
    } else {
      alert('event booked successfully.')
      navigation.navigate('MyEvents')
      setLoader(false)
      console.log("apple pay response11111", JSON.stringify(paymentIntent));
    }
  }
  const bookTicket = async (paymentSecret, paymentIntentId, val) => {
    console.log('daskjhdaskahkjahk', JSON.stringify(route.params));
    console.log('paymentIDDDDDDD>>>>>', paymentIntentId);
    const { firstName, lastName, email, phoneNumber, ticketArr, event, totalAmount } = route?.params?.userObj
    ticketArr.map(item => {
      item.eventId = event?.id
      if (!item?.planId) {
        item['planId'] = item['planName']
      }
    })
    const filterArr = ticketArr.filter(itm => itm?.quantity)
    console.log('filterrererererere', filterArr);
    // return;
    let data = {
      "userId": userInfo?.id,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phoneNumber': phoneNumber,
      'bookings': filterArr,
      'transactionId': paymentIntentId,
      // 'amount':totalAmount
    }
    console.log('book event Dataaaaa', data);
    // return;
    let res = await services.post(Url.BOOK_EVENT, '', data, 'json')
    if (res.status) {
      if (val == 1) {
        confirmPaymentIntent(paymentSecret)
      } else {
        paymentWithApple(paymentSecret)
      }

    } else {
      alert(res?.error)
      setLoader(false)
    }
    console.log('response of book event api1111', res);
    // console.log('booking Details111111',data);
  }

  const renderBrandImage = (brand) => {
    console.log('djakshjkdahkshkahk', brand);
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
    return image
  }

  const onAppliedPromoCode = () => {
    const isAvailable = promoCodes.some(code => code.code == promoCode)
    if (!isAvailable) {
      setPromoError('This code is invalid.')
      setAppliedPromoCode({})
    } else {
      const index = promoCodes.findIndex(code => code.code == promoCode)
      setAppliedPromoCode(promoCodes[index])
      setPromoError('')
      setPromoCode('')
      setModalVisible(!isModalVisible)
    }
    console.log('ddasasdsadsadassa', isAvailable);
  }

  return (
    <View style={styles.mainView}>
      <Header title="Order Details" />
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps='handled' style={{}}>
          <View style={styles.flatlistMainView}>
            <FastImage source={{ uri: route?.params?.userObj?.event?.image }} style={styles.eventImage} />
            <View style={{ flexDirection: "column", paddingLeft: 10, width: '75%' }}>
              <Text numberOfLines={1} style={styles.titleText}>{route?.params?.userObj?.event?.title}</Text>
              <Text numberOfLines={1} style={styles.timeText}>{route?.params?.userObj?.event?.date?.when}</Text>
              <Text numberOfLines={1} style={styles.timeText}>{route?.params?.userObj?.event?.address[0]}</Text>
              {
                route?.params?.userObj?.ticketArr &&
                <FlatList
                  data={route?.params?.userObj?.ticketArr}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <Text numberOfLines={1} style={styles.ticketType}>{`${item?.planName} Ticket ($${item?.price}) : ${item?.quantity} ticket(s)`}</Text>
                        {/* <Text numberOfLines={1} style={styles.ticketType}>{"Standard Ticket ($10) : 1 ticket(s)"}</Text> */}
                      </View>
                    )
                  }}
                />
              }


            </View>
          </View>
          <View style={styles.seperator} />
          <Text style={{ fontSize: 14, fontFamily: fonts.SfPro_Medium, color: "#C40000", marginLeft: 20 }}>Cancellation unavailable</Text>
          <Text style={styles.reviewText}>Please review your booking carefully. Bookings are final and non-refundable upon confirmation.</Text>
          <View style={styles.seperator} />
          <View style={styles.editDetailView}>
            <Text style={styles.detailText}>Your Details</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.name}>{`${route?.params?.userObj?.firstName} ${route?.params?.userObj?.lastName}`}</Text>
          <Text style={styles.name}>{`${route?.params?.userObj?.phoneNumber}`}</Text>
          <View style={styles.seperator} />

          <View style={styles.editDetailView}>
            <Text style={styles.detailText}>Email</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.editText}>Change</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.name}>{`${route?.params?.userObj?.email}`}</Text>
          <View style={styles.seperator} />

          {/* <TouchableOpacity onPress={ () => setModalVisible(!isModalVisible)}  style={styles.couponView}>
            <View style={styles.couponSubView}>
              <Image source={images.coupon} style={styles.couponImage} />
              <Text style={styles.couponText}>Apply Coupon</Text>
            </View>
            <Image source={images.backArrow} style={styles.nextImage} />

          </TouchableOpacity>
          <View style={styles.seperator} /> */}

          <Tooltip
            isVisible={toolTipVisible}
            showChildInTooltip={false}
            content={
            <View style={{alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{ fontSize: 12, fontFamily: fonts.SfPro_Regular }}>Payment process: 2.9% + $0.30</Text>
              <Text style={{ fontSize: 12, fontFamily: fonts.SfPro_Regular }}>Cofit Service Fee: 5%</Text>
              </View>
            }
            placement="top"
            onClose={() => settoolTipVisible(!toolTipVisible)}
          >
            <TouchableOpacity onPress={() => settoolTipVisible(!toolTipVisible)}>
              <Text style={styles.orderSummaryText}>Order Summary</Text>
            </TouchableOpacity>
          </Tooltip>
          <View style={styles.ticketPriceView}>
            <Text style={styles.priceText}>{route.params?.userObj?.selectedTicketQuantity}x Ticket price</Text>
            <Text style={styles.priceValue}>${route.params?.userObj?.totalAmount}</Text>
          </View>

          <View style={styles.bookingFeeView}>
            <View style={styles.bookingFeeSubView}>
              <Text style={styles.bookingText}>Booking Fee</Text>
              <TouchableOpacity>
                <Image source={images.info} style={styles.infoImage} />
              </TouchableOpacity>
            </View>
            <Text style={styles.priceValue}>${bookingFee}</Text>
          </View>

          {
            appliedPromoCode && Object.keys(appliedPromoCode).length > 0 &&
            <View style={styles.ticketPriceView}>
              <Text style={styles.promoApply}>Promo Code Applied</Text>
              <Text style={styles.priceValue}>- ${(route.params?.userObj?.totalAmount * Number(appliedPromoCode.value) / 100).toFixed(2)}</Text>
            </View>
          }

          <View style={styles.ticketPriceView}>
            <Text style={styles.TotalPriceText}>Total</Text>
            {
              appliedPromoCode && Object.keys(appliedPromoCode).length > 0
                ?
                <Text style={styles.TotalPriceText}>${(route.params?.userObj?.totalAmount + bookingFee - route.params?.userObj?.totalAmount * Number(appliedPromoCode.value) / 100).toFixed(2)}</Text>
                :
                <Text style={styles.TotalPriceText}>${(route.params?.userObj?.totalAmount + bookingFee).toFixed(2)}</Text>
            }
          </View>
          <View style={styles.seperator} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, alignItems: 'center' }}>
            <Text style={styles.orderSummaryText}>Payment</Text>
            {
              appliedPromoCode && Object.keys(appliedPromoCode).length > 0
                ?
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, borderWidth: 2, borderRadius: 6, borderColor: '#E25F3C' }}>
                    <Text style={{ color: '#E25F3C', fontSize: 14, fontFamily: fonts.SfPro_Regular, marginRight: 10 }}>{appliedPromoCode.value}% OFF Applied</Text>
                    <TouchableOpacity onPress={() => setAppliedPromoCode({})}>
                      <Image source={images.close} style={{ height: 15, width: 15, resizeMode: 'contain', tintColor: '#E25F3C' }} />
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
                  <Text style={styles.editText}>Promo Code</Text>
                </TouchableOpacity>
            }

          </View>
          {/* <View style={styles.seperator} />
          <FlatList
            data={savedCards}
            style={{ marginVertical: 20 }}
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
          <TouchableOpacity onPress={() => { setIsApplePaySelected(!isApplePaySelected), setIsPaypalSelected(false), onSelectPaymentMethod1() }} style={[styles.cardView, { marginTop: 20 }]}>
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
          <View style={styles.seperator} /> */}
          {/* <TouchableOpacity onPress={() => { setIsPaypalSelected(!isPaypalSelected), setIsApplePaySelected(false), onSelectPaymentMethod1() }} style={[styles.cardView]}>
            <View style={styles.subView1}>
              <Image source={images.paypal} style={styles.cardView1} />
              <Text style={styles.text}>Paypal</Text>
            </View>
            <View style={styles.subView2}>
              <View style={[styles.checkbox, { borderColor: isPaypalSelected ? colors.blue : colors.black }]}>
                {
                  isPaypalSelected &&
                  <View style={{ height: 14, width: 14, borderRadius: 8, backgroundColor: colors.blue }} />
                }
              </View>
            </View>
          </TouchableOpacity> */}
          <View style={styles.seperator} />
          {
            savedPaymentMethod && Object.keys(savedPaymentMethod).length > 0
              ?
              <View style={styles.cardView}>
                <View style={styles.subView1}>
                  <Image source={renderBrandImage(savedPaymentMethod?.card?.brand)} style={styles.cardView1} />
                  <Text style={styles.text}>{`${savedPaymentMethod?.card?.brand} ...${savedPaymentMethod?.card?.last4}`}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("ChoosePaymentOption")} style={styles.subView2}>
                  <Image source={images.backArrow} style={styles.nextImage} />
                </TouchableOpacity>
              </View>
              :
              <View style={styles.cardView}>
                <View style={styles.subView1}>
                  <Image source={images.applePay} style={styles.cardView1} />
                  <Text style={styles.text}>Apple Pay</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("ChoosePaymentOption")} style={styles.subView2}>
                  <Image source={images.backArrow} style={styles.nextImage} />
                </TouchableOpacity>
              </View>
          }
          {/* <View style={styles.seperator}/> */}

        </ScrollView>
      </View>
      <View style={styles.seperator} />
      <TouchableOpacity
        onPress={() => onPurchaseTicket()}
        style={[styles.button, { backgroundColor: colors.orange_dark }]}
      >
        {
          loader
            ?
            <ActivityIndicator size={"small"} color={"#fff"} />
            :
            <Text style={styles.buttonText}>{savedPaymentMethod && Object.keys(savedPaymentMethod).length > 0 ? `Buy with ${savedPaymentMethod?.card?.brand}` : "Buy with Apple Pay"}</Text>
        }
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        backdropOpacity={0.6}
        isVisible={isModalVisible}
      >
        <View style={styles.modalView}>
          <Text style={styles.promoText}>Add Promo Code</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder='Promo Code'
              style={styles.input}
              placeholderTextColor={'#A1A5AC'}
              autoCapitalize='characters'
              value={promoCode}
              onChangeText={(val) => setPromoCode(val)}
            />
          </View>
          {
            promoError.length > 0 &&
            <Text style={styles.promoError}>{promoError}</Text>
          }
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", marginTop: 20 }}>
            <TouchableOpacity
              disabled={promoCode.length == 0 ? true : false}
              onPress={() => onAppliedPromoCode()} style={[styles.CancelBtn, { backgroundColor: promoCode.length == 0 ? colors.buttonUnselect : colors.orange_dark, }]}>
              <Text style={styles.btnText1}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(!isModalVisible), setPromoError(''), setPromoCode('') }} style={[styles.DeleteBtn]}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default OrderDetails;