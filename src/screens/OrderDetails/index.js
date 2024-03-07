import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native'
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
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const OrderDetails = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isApplePaySelected, setIsApplePaySelected] = useState(false)
  const [isPaypalSelected, setIsPaypalSelected] = useState(false)
  const [savedCards, setSavedCards] = useState([])
  const [loader, setLoader] = useState(false)
  const [paymentMethodId, setPaymentMethodId] = useState('')
  // const [loader,setLoader] = useState
  const { confirmPayment, } = useStripe();
  console.log('rwexasdiodsadurweosadiewr', JSON.stringify(route.params));

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
    console.log('payment method id113211', paymentMethodId);
    // return;
    if (paymentMethodId?.length == 0 && !isApplePaySelected && !isPaypalSelected) {
      alert("Please select any payment method.")
      return;
    }
    if (isApplePaySelected) {
      payWithApplePay()
      return;
    }
   
    let amount  = route.params?.userObj?.totalAmount 
    let PlatformAndStripeFee;

    if(amount<=100){
    PlatformAndStripeFee = (amount* 12.9/100 +0.30).toFixed(2)
    }else if(amount<=500){
      PlatformAndStripeFee = (amount* 10.9/100 +0.30).toFixed(2)
    }else if(amount<=1000){
      PlatformAndStripeFee = (amount* 8.9/100 +0.30).toFixed(2)
    }else{
      PlatformAndStripeFee = (amount* 7.9/100 +0.30).toFixed(2)
    }
    console.log('amountttttttdsdsad',amount);
    console.log('PlatformAndStripeFeedsadsd',PlatformAndStripeFee);
    // return;
    setLoader(true)
    let data = {
      "amount": route.params?.userObj?.totalAmount * 100,
      "currency": "usd",
      "payment_method": paymentMethodId,
      // "on_behalf_of": route.params?.userObj?.event?.accountId,
      "transfer_data": {
        "amount": (route.params?.userObj?.totalAmount * 100) - (PlatformAndStripeFee*100),
        "destination":route.params?.userObj?.event?.accountId
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
      confirmPaymentIntent(response?.client_secret);

    } else {
      setLoader(false)
      alert(response?.message)
      console.log('error in create payment Intent Api', response);
    }
  }

  const confirmPaymentIntent = async (paymentIntentId) => {
    console.log('payment Intent Id1111', paymentIntentId);

    // let data = {
    //   "payment_Intent_id": paymentIntentId,
    //   "payment_method": paymentMethodId
    // }
    // let response = await services.post(Url.CONFIRM_PAYMENT_INTENT, '', data, 'json')
    // console.log('responseedsdasdaeee', response);
    // if (response.status) {
    const { paymentIntent, error } = await confirmPayment(paymentIntentId, {
      paymentMethodType: "Card",
      paymentMethodData: { paymentMethodId: paymentMethodId },
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
      setLoader(false)
      alert("Payment Successfull.")
      console.log("payment scuessfull!dsdss", paymentIntent)
    }

    // } else {
    //   setLoader(false)
    //   alert(response?.message)
    //   console.log('error in confirm payment Intent Api', response);
    // }
  }

  const payWithApplePay = async () => {

    let amount  = route.params?.userObj?.totalAmount 
    let PlatformAndStripeFee;

    if(amount<=100){
    PlatformAndStripeFee = (amount* 12.9/100 +0.30).toFixed(2)
    }else if(amount<=500){
      PlatformAndStripeFee = (amount* 10.9/100 +0.30).toFixed(2)
    }else if(amount<=1000){
      PlatformAndStripeFee = (amount* 8.9/100 +0.30).toFixed(2)
    }else{
      PlatformAndStripeFee = (amount* 7.9/100 +0.30).toFixed(2)
    }

    let data = {
      "amount": route.params?.userObj?.totalAmount * 100,
      "currency": "usd",
      // "on_behalf_of": route.params?.userObj?.event?.accountId,
      "transfer_data": {
        "amount": (route.params?.userObj?.totalAmount * 100) - (PlatformAndStripeFee*100),
        "destination": route.params?.userObj?.event?.accountId
      }
    }
    let response = await services.post(Url.CREATE_PAYMENT_INTENT_NEW, "",data , "json")
    console.log('create payment intent new api response11111',response);
    if(response?.status){
      const { error, paymentIntent } = await confirmPlatformPayPayment(
        response?.clientSecret,
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
                amount:`${route.params?.userObj?.totalAmount}.00`,
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
        // handle error
      } else {
        // Alert.alert('Success', 'Check the logs for payment intent details.');
        alert("Payment Successfull.")
        console.log(JSON.stringify(paymentIntent, null, 2));
      }
    }else{
     alert(response?.message)
    }
   
  };

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
      <Header title="Order Details" />
      <View style={{ flex: 1 }}>
        <ScrollView style={{}}>
          <View style={styles.flatlistMainView}>
            <Image source={{ uri: route?.params?.userObj?.event?.image }} style={styles.eventImage} />
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
                        <Text numberOfLines={1} style={styles.ticketType}>{`${item?.name} Ticket ($${item?.price}) : ${item?.quantity} ticket(s)`}</Text>
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
          <Text style={styles.name}>{`${route?.params?.userObj?.email}, ${route?.params?.userObj?.phoneNumber}`}</Text>
          <View style={styles.seperator} />
          <View style={styles.couponView}>
            <View style={styles.couponSubView}>
              <Image source={images.coupon} style={styles.couponImage} />
              <Text style={styles.couponText}>Apply Coupon</Text>
            </View>
            <Image source={images.backArrow} style={styles.nextImage} />

          </View>
          <View style={styles.seperator} />
          <Text style={styles.orderSummaryText}>Order Summary</Text>
          <View style={styles.ticketPriceView}>
            <Text style={styles.priceText}>1x Ticket price</Text>
            <Text style={styles.priceValue}>${route.params?.userObj?.totalAmount}</Text>
          </View>

          {/* <View style={styles.bookingFeeView}>
            <View style={styles.bookingFeeSubView}>
              <Text style={styles.bookingText}>Booking Fee</Text>
              <Image source={images.info} style={styles.infoImage} />
            </View>
            <Text style={styles.priceValue}>{"$2"}</Text>
          </View> */}

          <View style={styles.ticketPriceView}>
            <Text style={styles.TotalPriceText}>Total</Text>
            <Text style={styles.TotalPriceText}>${route.params?.userObj?.totalAmount}</Text>
          </View>
          <View style={styles.seperator} />
          <Text style={styles.orderSummaryText}>Payment methods</Text>
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
          <View style={styles.seperator} />
          <TouchableOpacity onPress={() => { setIsPaypalSelected(!isPaypalSelected), setIsApplePaySelected(false), onSelectPaymentMethod1() }} style={[styles.cardView]}>
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
          </TouchableOpacity>
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
          {/* <View style={styles.seperator}/> */}

        </ScrollView>
      </View>
      <View style={styles.seperator} />
      <TouchableOpacity
        onPress={() => onPurchaseTicket()}
        style={styles.button}
      >
        {
          loader
            ?
            <ActivityIndicator size={"small"} color={"#fff"} />
            :
            <Text style={styles.buttonText}>Purchase Ticket(s)</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

export default OrderDetails;