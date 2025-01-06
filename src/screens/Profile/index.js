import { NativeModules, StyleSheet, Text, View, useWindowDimensions,Image, Touchable, TouchableOpacity, TextInput, ImageBackground, Platform, Alert } from 'react-native'
import React from 'react'
import styles from './style'
import images from '../../constants/images'
import colors from '../../constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch,useSelector } from 'react-redux'
import { logout, updateUser, setSavedPaymentMethod } from '../../redux/slices/userSlice'
import { useFocusEffect } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import { useState } from 'react'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import BottomSheet from "react-native-gesture-bottom-sheet";
import ImagePicker from "react-native-image-crop-picker";
import { useRef } from 'react'
import { useEffect } from 'react'
import fonts from '../../constants/fonts'
import FastImage from 'react-native-fast-image'

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const Profile = ({navigation}) => {
  const bottomSheet = useRef();
  const {height,width} = useWindowDimensions();
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [phoneNo,setPhoneNo]=useState('')
  const [profileImage,setProfileImage]=useState('')
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoggedIn = useSelector((state) => state.user.status);

  console.log('userInforfsffsdrzxczrrr',isLoggedIn);

  useEffect(()=>{
    getUserDetails();
  },[])

  const getUserDetails=async()=>{
    console.log('dsahsasadffsdfssdcxxzfhasgddugugaewwe',userInfo);
   setEmail(userInfo.email)
   setName(userInfo.name)
   if(userInfo?.phone_no!=null){
    setPhoneNo(userInfo.phone_no)
   }
   console.log('2131232112as21asasa', userInfo.profile_image);
  //  if(userInfo.profile_image!='null'){
    // alert(1)
    setProfileImage(userInfo.profile_image)
  //  }
  }

  const onLogout=async()=>{
    // if(!isLoggedIn) {
    //   navigation.navigate("SignUp")
    //   return
    // }
    Alert.alert("Log Out",
    "Are you sure you want to logout",[
      {'text':"Cancel",style:"cancel",onPress:()=>console.log('cancel pressed')},
      {'text':'Ok',onPress:()=>onConfirmLogout()}
    ])
}

const onConfirmLogout=async()=>{
    // Auth.signOut()
    dispatch(logout())
    dispatch(setSavedPaymentMethod(''))

    navigation.navigate("SignUp")
}

const onUpdate=async()=>{

   if(name.trim().length==0 || email.length==0 || phoneNo.trim().length==0){
    alert("Please fill all the field")
   }
   else if(phoneNo.trim().length<10){
    alert("Invalid phone no")
   }
   else{
   let data = new FormData();
   data.append('full_name',name);
   data.append('location',userInfo.location);
   data.append('phone_no',phoneNo);
   let url = `${Url.UPDATE_USER_DETAILS}/${userInfo.id}`
   let response = await services.post(url, "", data, 'formdata')

    console.log('d9u2zsaasasdh9hd982',response);
    if(response.status){
     alert(response.message)
     updateUserDetailToStore()
    }
   }
}

 const updateUserDetailToStore=async()=>{
  let url = `${Url.GET_USER_DETAILS}/${userInfo.id}`
  let res = await services.get(url)
  if(res.status){
    dispatch(updateUser(res.user))
  }
  console.log('updated User Details>>>>>',res.user);
 }

 const takeAphoto = async () => {
  bottomSheet?.current.close()
  setTimeout(async() => {
      const res = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
      });
      let imageFile={
          name: new Date().getTime() + ".png",
          type: res.mime,
          uri: res.path
      }
      updateProfileImage(imageFile)
      console.log("redshjgsdjhgjhdgasjhd",res);
  }, 750);


};

const chooseFromGallery = async () => {
  bottomSheet?.current.close()
  setTimeout(async() => {
      const res = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: false,
      });
      let imageFile={
          name: new Date().getTime() + ".png",
          type: res.mime,
          uri: res.path
      }
      updateProfileImage(imageFile)
      console.log("redshjdsdsdsgsdjhgjhdgasjhd",res);
  }, 750);

  console.log(res);
};

const updateProfileImage=async(imageFile)=>{
  console.log('yiweruiweyrwey',imageFile);
  let body = new FormData();
   body.append('profile_image',imageFile);
   let url = `${Url.UPDATE_USER_DETAILS}/${userInfo.id}`
   console.log('url1ds1dsds111',url);
   let response = await services.post(url, "", body, 'formdata')
   if(response.status){
    alert('Profile picture updated successfully.')
     updateUserDetailToStore()
   }
    console.log('d9u2asdsazsaasasdh9hd982',response);

  return;
  var data = new FormData();
  data.append('id',userDetail.ID );
  data.append('image',imageFile );

  var config = {
    method: 'post',
    url: 'https://stack.brstdev.com/silverfox/index.php/wp-json/silverfox/imageupload',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data : data
  };
  setLoader(true)
  axios(config)
  .then(function (response) {
      // let userDetail = userDetail
      console.log('23189y4838sdaasay8732',userDetail);
      let data = {...userDetail}
      data.image = response.data.data.image
      setLoader(false)
      let data1={
          data:data
      }
      Alert.alert(title = "Silver Fox", message = "Image uploaded successfully")
      console.log('2173821dsdsdsds832dsds18ads36281632',data1);
      // userDetail.image==response.data.data.image
      dispatch(updateUser(data1));
    console.log("jkwhewgduewguedsdwgfugeuwgufw",response.data);
  })
  .catch(function (error) {
      setLoader(false)
      Alert.alert(title = "Silver Fox", message = response.data.msg)


    console.log("yugywgey8gd82g8g2",error);

  });

      }

  const onPressEditProfile=async()=>{
    if(isLoggedIn) {
      navigation.navigate("EditProfile")
    } else {
      alert("It looks like you're currently browsing as a guest. To edit your profile, please sign up or log in.")
    }

  }

  return (
    <View style={styles.mainView}>

<KeyboardAwareScrollView>
<ImageBackground source={images.gradient} style={{height:250,width:'100%'}}>
<View style={styles.profileView}>

<FastImage
style={styles.profileImage}
source={
  (userInfo.profile_image==null || userInfo.profile_image=='null')
  // (userInfo.profile_image)

  ?
  images.backimg
  :
  {uri: userInfo.profile_image,
    priority: FastImage.priority.high,
}}
/>
</View>
<Text style={styles.name}>{isLoggedIn ? userInfo?.first_name + " " + userInfo?.last_name : "Guest User"}</Text>

        </ImageBackground>

 <TouchableOpacity onPress={()=> onPressEditProfile()} style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.profile3} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Edit Profile</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/>

 {/* <TouchableOpacity onPress={()=>navigation.navigate("Payment&PayoutMethod")} style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.payment} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Payments and Payouts</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/> */}

 {/* <TouchableOpacity onPress={()=>navigation.navigate("TransactionHistory")} style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.transaction} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Transaction History</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/> */}

 {/* <TouchableOpacity style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.refer} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Refer a Friend</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/>

 <TouchableOpacity style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.star} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Rate us on the App Store!</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/> */}

 <TouchableOpacity onPress={()=> navigation.navigate('TermService')} style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.term} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Terms of Use</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/>

 <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')} style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.privacy} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Privacy Policy</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/>

 {/* <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")} style={styles.view2}>
  <View style={styles.profileMainView}>
  <Image source={images.settings} style={styles.profileIcon}/>
  <Text style={styles.profileText}>Settings</Text>
  </View>
  <View style={{width:"15%",}}>
    <Image source={images.arrNew1} style={styles.nextArrowIcon}/>
  </View>
 </TouchableOpacity>
 <View style={styles.lineSeperator}/> */}

 <TouchableOpacity onPress={()=>{isLoggedIn === null ? navigation.navigate('LoginNew'): onLogout()}} style={[styles.bottomBtn,{marginVertical:50}]}>
<Text style={styles.btnText}>{ isLoggedIn ? 'Log Out' : 'Log In'}</Text>
</TouchableOpacity>

</KeyboardAwareScrollView>

        {/* <KeyboardAwareScrollView>
      <View style={{backgroundColor:'white',flex:1,height:height*1,}}>
       <View style={{height:height*0.4,flex:1,backgroundColor:'#f7ac42',}}>
       <View style={styles.skipView}>
<TouchableOpacity onPress={()=>navigation.goBack()}   style={styles.skipbtn}>
<Image style={styles.skipimg} source={images.back}></Image>
</TouchableOpacity>
      </View>
      <View style={{flex:0.7,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        <View style={{height:120,left:10,width:120,alignItems:'center',borderColor:"#F1F5FC",borderWidth:2,borderRadius:120/2,justifyContent:'center',}}>
        <FastImage
        style={{height:'100%',width:'100%',borderRadius:60 }}
        source={
          (userInfo.profile_image==null || userInfo.profile_image=='null')
          ?
          images.backimg
          :
          {uri: userInfo.profile_image,
            priority: FastImage.priority.high,
        }}
    />
        </View>
        <TouchableOpacity onPress={()=>bottomSheet.current.show()} style={{top:40,height:30,width:30,right:20,alignItems:'center',borderRadius:30/2,backgroundColor:'white',justifyContent:'center',}}>
        <Image style={{height:20,width:20,resizeMode:"contain", }}  source={images.camera}></Image>

        </TouchableOpacity>


</View>
       </View>

      <View style={{}}>

          <View style={styles.logoView}>
          </View>
          <View style={styles.backView}>

          </View>
          <View style={styles.startedView}>

<View style={styles.logoView1}>
<Text style={styles.enterLoc}>Name</Text>
<View style={styles.locationinput}>


<TextInput
style={styles.locinput}
placeholder='Your name'
value={name}
onChangeText={(val)=>setName(val)}
/>
</View>
<Text style={styles.enterLoc}>Email</Text>
<View style={styles.locationinput}>

<TextInput
editable={false}
style={styles.locinput}
placeholder='Email'
value={email}
/>
</View>
<Text style={styles.enterLoc}>Phone</Text>
<View style={styles.locationinput}>
<View style={{width:'20%',flexDirection:'row',borderRightWidth:0.5}}>
  <View style={{alignItems:'center',justifyContent:'center',paddingHorizontal:'5%',width:'40%'}} >
  <Image style={{height:25,width:25,resizeMode:'contain'}} source={images.country}></Image>

  </View>
<View style={{width:'60%', alignItems:'center',justifyContent:'center',paddingHorizontal:'5%'}}>
  <Text style={styles.locinput}>+1</Text>
</View>
</View>
<TextInput
editable={true}
placeholder='Phone number'
style={styles.locinput}
maxLength={10}
keyboardType='number-pad'
returnKeyType='done'
value={phoneNo}
onChangeText={(val)=>setPhoneNo(val)}
/>

</View>

<TouchableOpacity onPress={()=>onUpdate()} style={[styles.bottomBtn,{marginTop:20}]}>
<Text style={styles.btnText}>Update</Text>
</TouchableOpacity>

<View style={styles.bottomView} >
<TouchableOpacity onPress={()=>onLogout()} style={styles.bottomBtn}>
<Text style={styles.btnText}>Logout</Text>
<Image style={{height:20,width:20,resizeMode:'contain',marginHorizontal:10}} source={images.logout}></Image>
</TouchableOpacity>
          </View>
</View>
          </View>
        </View>

          </View>
          </KeyboardAwareScrollView> */}


       <BottomSheet  ref={bottomSheet} height={180} width={100} sheetBackgroundColor={colors.background}   >
           <View style={{height:'100%',marginHorizontal:'2%',backgroundColor:colors.background,}}>
             <View style={{height:'60%',borderRadius:10,marginHorizontal:'2%',backgroundColor:"#fff",}}>

<TouchableOpacity onPress={() => takeAphoto()} style={{marginHorizontal:'2%',backgroundColor:"#fff",height:'50%',alignItems:'center',justifyContent:'center',borderBottomColor:colors.placeholderColor,borderBottomWidth:0.5}}>
 <Text style={{fontSize:18,fontFamily:fonts.SfPro_Medium,color:colors.current}}>Take a photo</Text>

</TouchableOpacity>
<TouchableOpacity  onPress={() => chooseFromGallery()} style={{marginHorizontal:'2%',backgroundColor:"#fff",height:'50%',alignItems:'center',justifyContent:'center',}}>
 <Text style={{fontSize:18,fontFamily:fonts.SfPro_Medium,color:colors.current}}>Choose Existing photo</Text>

</TouchableOpacity>
<TouchableOpacity onPress={() => bottomSheet.current.close()} style={{height:'45%',marginTop:'5%',}}>
<View style={{backgroundColor:colors.white,borderRadius:10,height:'100%',alignItems:'center',justifyContent:'center'}}>
 <Text style={{fontSize:18,fontFamily:fonts.SfPro_Medium,color:colors.current}}>Cancel</Text>

</View>
</TouchableOpacity>

</View>
</View>
             </BottomSheet>

    </View>
  )
}

export default Profile