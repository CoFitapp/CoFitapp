import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { useSelector } from 'react-redux'
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import FastImage from "react-native-fast-image";

const TransactionHistory = () => {
  const [type, setType] = useState('all');
  const [transactionHistory, setTransactionHistory] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])

  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    async function getTransactions() {
      let url = `${Url.TRANSACTIONS}/${userInfo.id}`
      let res = await services.get(url)
      console.log('fsdfdsfdfdfsdasdfsd',JSON.stringify(res) );
      if (res.status) {
        setTransactionHistory(res.transactionDetails)
        setFilteredTransactions(res.transactionDetails)
      } else {
        setTransactionHistory([])
        setFilteredTransactions([])
      }
      setIsLoader(false)
      console.log('rezsssssss', res)
    }
    getTransactions()
  }, [])

  useEffect(()=> {
     console.log('dsdsadsadsda', type);
     let arr = []
     filteredTransactions.map((item,index)=> {
       if(type == 'purchases') {
        if( item.type == 'payment' ) {
          arr.push(item)
        }
       } else if ( type == 'earnings' ) {
        if( item.type == 'transfer' ) {
          arr.push(item)
        }
       } else {
        arr.push(item)
       }
     })
     setTransactionHistory(arr)
     console.log('dsakjdadhlhlhklas', arr);
  },[type])

  return (
    <View style={styles.mainView}>
      <Header title="Transaction History" />
      <View style={{ flexDirection: "row", marginLeft: 20 ,marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => setType('all')}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type == "all" ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: type == "all" ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            height: 37
          }}>
          <Text
            style={{
              color: type == "all" ? "#fff" : "#000",
              fontFamily: type == "all" ? fonts.SfPro_Semibold : fonts.SfPro_Regular,
              paddingHorizontal: 15,
            }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('purchases')}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type == "purchases" ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: type == "purchases" ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            marginLeft: 15,
            height: 37
          }}>
          <Text style={{ color: type == "purchases" ? "#fff" : "#000", fontFamily: type == "purchases" ? fonts.SfPro_Semibold : fonts.SfPro_Regular, paddingHorizontal: 12, }}>Purchases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('earnings')}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type == "earnings" ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: type == "earnings" ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            marginLeft: 15,
            height: 37
          }}>
          <Text style={{ color: type == "earnings" ? "#fff" : "#000", fontFamily: type == "earnings" ? fonts.SfPro_Semibold : fonts.SfPro_Regular, paddingHorizontal: 12, }}>Earnings</Text>
        </TouchableOpacity>
      </View>
      {
        (!isLoader && transactionHistory.length == 0) &&
        <Text style={{ fontFamily: fonts.SfPro_Medium, color: colors.black, textAlign: 'center',top:50 }}>No transaction found.</Text>
       }
      <View style={{ flex: 1 }}>
        {
          isLoader
            ?
            <ActivityIndicator size={'large'} color={'#000'} style={{marginTop: 50}}/>
            :
            <FlatList
              data={transactionHistory}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 50, }}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text style={styles.date}>{item.date}</Text>
                    <View style={styles.flatlistMainView}>
                      <View style={{ width: '70%' }}>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                          <FastImage source={{uri: item.eventImage}} style={styles.eventImage} />
                          <View style={{ flexDirection: "column", paddingLeft: 10, width: '70%' }}>
                            <Text numberOfLines={1} style={styles.titleText}>{item.eventName}</Text>
                            <Text numberOfLines={1} style={styles.timeText}>{item.eventDate}</Text>
                            <Text numberOfLines={1} style={styles.timeText}>{item.eventLocation}</Text>
                          </View>
                        </View>
                        {
                          item.tickets.map((item1, index1) => {
                            return(
                              <View>
                                <Text style={styles.ticketType}>{`${item1.planName} Ticket ($${item1.price}): ${item1.quantity} ticket(s)`}</Text>
                                </View>
                            )
                          })
                        }

                      </View>
                      <View style={{ width: '30%', flexDirection: "row", justifyContent: "flex-end" }}>
                        <Text style={styles.amount}>${item.amount / 100}</Text>
                        <FastImage source={item.type == 'payment' ? images.arrow1 : images.arrow2} style={styles.arrow} />
                      </View>

                    </View>
                  </View>
                )
              }}
            />
        }

      </View>

    </View>
  )
}

export default TransactionHistory;