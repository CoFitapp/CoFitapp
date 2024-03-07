import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'

const TransactionHistory = () => {
    const [type, setType] = useState('all');
    const [transactionHistory,setTransactionHistory]=useState([
        {
            date:"Today, 13 JANUARY",
            image:images.zumba,
            title:"Zumba Workout",
            time:"Sat Jan 13 | 10 - 11 AM Cst",
            address:"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas",
            ticketType:"Standard Ticket ($10) : 1 ticket(s)",
            amount:"$10.00",
            purchase:true
        },
        {
            date:"Today, 13 JANUARY",
            image:images.zumba,
            title:"Zumba Workout",
            time:"Sat Jan 13 | 10 - 11 AM Cst",
            address:"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas",
            ticketType:"Premium Ticket ($20) : 10 ticket(s)",
            amount:"$200.00",
            purchase:true
        },
        {
            date:"Today, 13 JANUARY",
            image:images.zumba,
            title:"Zumba Workout",
            time:"Sat Jan 13 | 10 - 11 AM Cst",
            address:"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas",
            ticketType:"Standard Ticket ($10) : 1 ticket(s)",
            amount:"$10.00",
            purchase:true
        },
        {
            date:"Today, 13 JANUARY",
            image:images.zumba,
            title:"Zumba Workout",
            time:"Sat Jan 13 | 10 - 11 AM Cst",
            address:"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas",
            ticketType:"Premium Ticket ($20) : 10 ticket(s)",
            amount:"$200.00",
            purchase:true
        },
        {
            date:"Today, 13 JANUARY",
            image:images.zumba,
            title:"Zumba Workout",
            time:"Sat Jan 13 | 10 - 11 AM Cst",
            address:"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas",
            ticketType:"Standard Ticket ($10) : 1 ticket(s)",
            amount:"$10.00",
            purchase:false
        },
        {
            date:"Today, 13 JANUARY",
            image:images.zumba,
            title:"Zumba Workout",
            time:"Sat Jan 13 | 10 - 11 AM Cst",
            address:"Austin Parks & Recreation Department, 200 S Lamar Blvd, Austin, Texas",
            ticketType:"Standard Ticket ($10) : 1 ticket(s)",
            amount:"$10.00",
            purchase:true
        },
    ])

    // const renderItem=({item,index})=>{
    //     return(
    //         <View>
    //             <Text>{item.}</Text>
    //         </View>
    //     )
    // }

    return (
    <View style={styles.mainView}>
        <Header title="Transaction History"/>
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() => setType('all')}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type=="all" ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: type=="all" ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            height:37
          }}>
          <Text
            style={{
              color: type=="all" ? "#fff" : "#000",
              fontFamily:type=="all" ?  fonts.SfPro_Semibold : fonts.SfPro_Regular,
              paddingHorizontal: 15,
            }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('purchases')}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type=="purchases" ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: type=="purchases" ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            marginLeft: 15,
            height:37
          }}>
          <Text style={{ color: type=="purchases" ? "#fff" : "#000", fontFamily: type=="purchases" ?  fonts.SfPro_Semibold : fonts.SfPro_Regular, paddingHorizontal: 12,}}>Purchases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('earnings')}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type=="earnings" ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: type=="earnings" ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            marginLeft: 15,
            height:37
          }}>
          <Text style={{ color: type=="earnings" ? "#fff" : "#000", fontFamily: type=="earnings" ?  fonts.SfPro_Semibold : fonts.SfPro_Regular, paddingHorizontal: 12,}}>Earnings</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.monthText}>January 2024</Text>
      <View style={{flex:1}}>
       <FlatList 
       data={transactionHistory}
       style={{flex:1}}
       contentContainerStyle={{paddingBottom:50,}}
    //    contentInsetAdjustmentBehavior='never'
       ItemSeparatorComponent={()=> <View style={styles.seperator}/>}
       renderItem={({item,index})=>{
        return(
            <View>
                <Text style={styles.date}>{item.date}</Text>
            <View style={styles.flatlistMainView}>
              <View style={{width:'70%'}}>
                <View style={{flexDirection:'row',width:'100%',}}>
                    <Image source={item.image} style={styles.eventImage}/>
                   <View style={{flexDirection:"column",paddingLeft:10,width:'70%'}}>
                    <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.timeText}>{item.time}</Text>
                    <Text numberOfLines={1} style={styles.timeText}>{item.address}</Text>
                   </View>
                </View>
                <Text style={styles.ticketType}>{item.ticketType}</Text>
              </View>
              <View style={{width:'30%',flexDirection:"row",justifyContent:"flex-end"}}>
                 <Text style={styles.amount}>{item.amount}</Text>
                 <Image source={item.purchase ? images.arrow1 : images.arrow2} style={styles.arrow}/>
              </View>

            </View>
            </View>
        )
       }}
       />
       </View>
    </View>
  )
}

export default TransactionHistory;