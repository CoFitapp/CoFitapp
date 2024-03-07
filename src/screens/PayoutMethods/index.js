import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Image, ScrollView, Dimensions, Linking, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import { Dropdown } from 'react-native-element-dropdown'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get("window");

const PayoutMethod = () => {
  const [eventType, setEventType] = useState("United States");
  const [isBankSelected,setIsBankSelected]=useState(false)
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoader,setIsLoader]=useState(false)
  // console.log('daslkasldjasjlk',userInfo);
  const countryArr = [
    { label: "United States", value: "United States" },
    // { label: "India", value: "India" },
    // { label: "United Kingdom", value: "United Kingdom" },
    // { label: "Russia", value: "Russia" },
    // { label: "Mexico", value: "Mexico" },
  ];

  const onsubmit=async()=>{
   console.log('skldfhkdshfhkshlkklsdh',userInfo?.stripeAccountId);
      let data = {
           "account":userInfo?.stripeAccountId,
           "refresh_url":"https://apple.cofitapp.com?id=assdf",
           "return_url":"https://apple.cofitapp.com?id=assdf",
           "type":"account_onboarding"
      }
      let response = await services.post(Url.CREATE_ACCOUNT_LINK, "", data, "json")
      console.log('cretae account api response11111',response);
      setIsLoader(false)
      if(response?.status){
        Linking.openURL(response?.accountLink?.url)
         console.log('fdskflsdjlkflsd');
      }else{
        alert(response.error)
      }
  }

    return (
    <View style={styles.mainView}>
        <Header title="Payout Methods"/>
       <ScrollView>
        <Text style={styles.saveText}>Billing country/region</Text>
        <View
            style={{
              marginVertical: 20,
              borderColor: "#A1A5AC",
              justifyContent: "center",
              width: '90%',
              marginHorizontal:20,
              borderWidth: 1,
              height: 45,
              borderRadius:11,
              // paddingLeft: 10,
            }}
          >
            <Dropdown
              style={{paddingLeft:10}}
              data={countryArr}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Country"}
              placeholderStyle={{color:"#A1A5AC"}}
              fontFamily={fonts.SfPro_Medium}
              iconStyle={{marginRight:15,height:20,width:20,resizeMode:"contain"}}
              containerStyle={{
                borderRadius: 5,
                height: 150,
                paddingLeft:10,
                alignSelf: "flex-start",
                width:'100%',
                
              }}
              value={eventType}
              onChange={(item) => {
                console.log("sdffdscdcsd", item);
              }}
            />
          </View>

        <Text style={styles.saveText}>Setup Payout Method</Text>
       <Text style={styles.payoutText}>Payouts will be sent in USD.</Text>
       <TouchableOpacity onPress={()=>setIsBankSelected(true)} style={styles.cardView}>
        <View></View>
        <View style={styles.subView1}>
          
          <Image source={images.bank} style={styles.cardView1}/>
          <View style={styles.subView3}>
          <Text style={styles.text}>Bank Account</Text>
          <View style={{flexDirection:"row",alignItems:"center",paddingLeft:20}}>
          <View style={styles.dot}/>
          <Text style={{fontSize:12,fontFamily:fonts.SfPro_Regular,color:colors.textRegular,marginLeft:5}}>3-5 business days</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:"center",paddingLeft:20}}>
          <View style={styles.dot}/>
          <Text style={{fontSize:12,fontFamily:fonts.SfPro_Regular,color:colors.textRegular,marginLeft:5}}>no fees</Text>
          </View>
          </View>
         
        </View>
        <View style={styles.subView2}>
              <View style={[styles.checkbox, { borderColor: isBankSelected ? colors.blue : colors.black }]}>
                {
                  isBankSelected &&
                  <View style={{ height: 14, width: 14, borderRadius: 8, backgroundColor: colors.blue }} />
                }
              </View>
            </View>
        {/* <View style={styles.subView2}>
        <View style={{
        height:22,
        width:22,
        borderRadius:11,
        borderWidth:2,
        borderColor:"#636366"
       }}/>
        </View> */}
       </TouchableOpacity>
       <View style={styles.seperator}/>
       
       </ScrollView>
       <View style={styles.seperator}/>
       <TouchableOpacity
        onPress={() => onsubmit()}
        style={styles.button}
      >
        {
          isLoader
          ?
          <ActivityIndicator size={'small'} color={"#fff"}/>
          :
          <Text style={styles.buttonText}>Continue</Text>
        }
        
      </TouchableOpacity>
    </View>
  )
}

export default PayoutMethod;