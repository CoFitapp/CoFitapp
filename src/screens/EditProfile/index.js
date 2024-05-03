import { NativeModules, StyleSheet, Text, View, useWindowDimensions, Image, Touchable, TouchableOpacity, TextInput, ImageBackground, Platform, Alert } from 'react-native'
import React from 'react'
import styles from './style'
import images from '../../constants/images'
import colors from '../../constants/colors'
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { logout, updateUser } from '../../redux/slices/userSlice'
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

const EditProfile = ({ navigation }) => {
  const bottomSheet = useRef();
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    console.log('23324cxzxz322r32r', userInfo);
    setEmail(userInfo.email)
    setName(userInfo.name)
    setFirstName(userInfo?.first_name)
    setLastName(userInfo?.last_name)
    if (userInfo?.phone_no != null) {
      setPhoneNo(userInfo.phone_no)
    }
    console.log('2131232112as21asasa', userInfo.profile_image);
    //  if(userInfo.profile_image!='null'){
    // alert(1)
    setProfileImage(userInfo.profile_image)
    //  }
  }

  const onLogout = async () => {
    Alert.alert("Log Out",
      "Are you sure you want to logout", [
      { 'text': "Cancel", style: "cancel", onPress: () => console.log('cancel pressed') },
      { 'text': 'Ok', onPress: () => onConfirmLogout() }
    ])
  }

  const onConfirmLogout = async () => {
    Auth.signOut()
    dispatch(logout())
    navigation.navigate("LoginScreen")
  }

  const onUpdate = async () => {

    // return;
    console.log('dsajdgh878912981', name);
    console.log('dsajdgh878912981', email);
    console.log('dsajdgh878912981', phoneNo);
    if (name.trim().length == 0 || email.length == 0 || phoneNo.trim().length == 0 || firstName.trim().length==0 || lastName.trim().length==0) {
      alert("Please fill all the field")
    }
    else if (phoneNo.trim().length < 10) {
      alert("Invalid phone no")
    }
    else {
      let data = new FormData();
      data.append('full_name', firstName + " " + lastName);
      data.append('first_name', firstName);
      data.append('last_name', lastName);
      data.append('location', userInfo.location);
      data.append('phone_no', phoneNo);
      let url = `${Url.UPDATE_USER_DETAILS}/${userInfo.id}`
      let response = await services.post(url, "", data, 'formdata')

      console.log('d9u2zsaasasdh9hd982', response);
      if (response.status) {
        alert(response.message)
        updateUserDetailToStore()
      }
    }
  }

  const updateUserDetailToStore = async () => {
    let url = `${Url.GET_USER_DETAILS}/${userInfo.id}`
    console.log('dsdsdssadasdasdssas', url);
    let res = await services.get(url)
    if (res.status) {
      dispatch(updateUser(res.user))
    }
    console.log('updated User Details>>>>>', res);
  }

  const takeAphoto = async () => {
    bottomSheet?.current.close()
    setTimeout(async () => {
      const res = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      let imageFile = {
        name: new Date().getTime() + ".png",
        type: res.mime,
        uri: res.path
      }
      updateProfileImage(imageFile)
      console.log("redshjgsdjhgjhdgasjhd", res);
    }, 750);


  };

  const chooseFromGallery = async () => {
    bottomSheet?.current.close()
    setTimeout(async () => {
      const res = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      let imageFile = {
        name: new Date().getTime() + ".png",
        type: res.mime,
        uri: res.path
      }
      updateProfileImage(imageFile)
      console.log("redshjdsdsdsgsdjhgjhdgasjhd", res);
    }, 750);

    console.log(res);
  };

  const updateProfileImage = async (imageFile) => {
    console.log('yiweruiweyrwey', imageFile);
    let body = new FormData();
    body.append('profile_image', imageFile);
    let url = `${Url.UPDATE_USER_DETAILS}/${userInfo.id}`
    console.log('url1ds1dsds111', url);
    let response = await services.post(url, "", body, 'formdata')
    if (response.status) {
      alert('Profile picture updated successfully.')
      updateUserDetailToStore()
    }
    console.log('d9u2asdsazsaasasdh9hd982', response);

    return;
    var data = new FormData();
    data.append('id', userDetail.ID);
    data.append('image', imageFile);

    var config = {
      method: 'post',
      url: 'https://stack.brstdev.com/silverfox/index.php/wp-json/silverfox/imageupload',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data
    };
    setLoader(true)
    axios(config)
      .then(function (response) {
        // let userDetail = userDetail
        console.log('23189y4838sdaasay8732', userDetail);
        let data = { ...userDetail }
        data.image = response.data.data.image
        setLoader(false)
        let data1 = {
          data: data
        }
        Alert.alert(title = "Silver Fox", message = "Image uploaded successfully")
        console.log('2173821dsdsdsds832dsds18ads36281632', data1);
        // userDetail.image==response.data.data.image
        dispatch(updateUser(data1));
        console.log("jkwhewgduewguedsdwgfugeuwgufw", response.data);
      })
      .catch(function (error) {
        setLoader(false)
        Alert.alert(title = "Silver Fox", message = response.data.msg)


        console.log("yugywgey8gd82g8g2", error);

      });

  }

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>

        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.arrNew1} style={[styles.nextArrowIcon, { transform: [{ rotate: "180deg" }] }]} />
          </TouchableOpacity>

          <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 20 }}>Profile</Text>
          <TouchableOpacity>
            <Image source={images.settings} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.lineSeperator} />
        <TouchableOpacity onPress={()=>bottomSheet.current.show()} style={styles.profileView}>
          <FastImage
            style={styles.profileImage}
            source={
              (userInfo.profile_image == null || userInfo.profile_image == 'null')
                ?
                images.backimg
                :
                {
                  uri: userInfo.profile_image,
                  priority: FastImage.priority.high,
                }}
          />
        </TouchableOpacity>

        <View style={styles.locationView}>
          <View style={styles.locationView1}>
            <Text style={styles.locationText}>My Home Location</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ChangeLocation',{value:2})} style={styles.locationView2}>
            <Image source={images.location3} style={styles.locationIcon} />
            <Text style={styles.locationName}>{userInfo?.location}</Text>
            <Image source={images.arrNew1} style={styles.nextArrowIcon1} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 15 }]}>Name</Text>
        <View style={styles.textInputView}>
          <View style={styles.inputInnerView}>
            <TextInput
              placeholder='First Name'
              placeholderTextColor={"#020A23"}
              value={firstName}
              onChangeText={(val)=>setFirstName(val)}

              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Medium,color:"#020A23" }}
            />
          </View>
          <View style={styles.inputInnerView}>
            <TextInput
              placeholder='Last Name'
              value={lastName}
              onChangeText={(val)=>setLastName(val)}
              placeholderTextColor={"#020A23"}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Medium }}
            />
          </View>
        </View>

        <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Email</Text>
        <View style={styles.textInputView}>

          <View style={styles.emailInputView}>
            <TextInput
              placeholder='Email'
              placeholderTextColor={"#020A23"}
              value={email}
              editable={false}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Medium,color:"#020A23" }}
            />
          </View>
        </View>

        <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Phone Number</Text>
        <View style={styles.textInputView}>
          <View style={styles.phoneInputView1}>
            <Text>+1 (US)</Text>
            <Image source={images.arrNew1} style={[styles.nextArrowIcon, { transform: [{ rotate: "90deg" }], marginLeft: 5 }]} />
          </View>
          <View style={styles.phoneInputView2}>
            <TextInput
              editable={true}
              placeholder='Phone number'
              placeholderTextColor={"#020A23"}
              maxLength={10}
              keyboardType='number-pad'
              returnKeyType='done'
              value={phoneNo}
              onChangeText={(val)=>setPhoneNo(val)}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Medium ,color:"#020A23"}}
            />
          </View>
        </View>

        <TouchableOpacity onPress={()=>onUpdate()} style={[styles.bottomBtn1,{marginTop:20}]}>
<Text style={styles.btnText1}>Update</Text>
</TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={[styles.bottomBtn, { marginVertical: 40 }]}>
          <Text style={styles.btnText}>Delete Account</Text>
        </TouchableOpacity>

      </KeyboardAwareScrollView>


      <Modal
        style={styles.modal}
        backdropOpacity={0.6}
        isVisible={isModalVisible}
      >
        <View style={styles.modalContainer}>



          <Text style={styles.status}>Are you Sure?</Text>
          <Text style={styles.detailsText}>
            You’re about to delete your CoFit Account.
            Type DELETE if you are sure you want to continue.
          </Text>
          <View style={styles.deleteAccountView}>
            <View style={styles.emailInputView}>
              <TextInput
                // placeholder='Email'
                autoCapitalize='characters'
                placeholderTextColor={""}
                style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Medium }}
              />
            </View>
          </View>

        <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between",marginTop:20}}>
        <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={[styles.CancelBtn]}>
          <Text style={styles.btnText1}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={[styles.DeleteBtn]}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
        </View>
        </View>
      </Modal>


      <BottomSheet ref={bottomSheet} height={180} width={100} sheetBackgroundColor={colors.background}   >
        <View style={{ height: '100%', marginHorizontal: '2%', backgroundColor: colors.background, }}>
          <View style={{ height: '60%', borderRadius: 10, marginHorizontal: '2%', backgroundColor: "#fff", }}>

            <TouchableOpacity onPress={() => takeAphoto()} style={{ marginHorizontal: '2%', backgroundColor: "#fff", height: '50%', alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.placeholderColor, borderBottomWidth: 0.5 }}>
              <Text style={{ fontSize: 18, fontFamily: fonts.SfPro_Medium, color: colors.current }}>Take a photo</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => chooseFromGallery()} style={{ marginHorizontal: '2%', backgroundColor: "#fff", height: '50%', alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: 18, fontFamily: fonts.SfPro_Medium, color: colors.current }}>Choose Existing photo</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => bottomSheet.current.close()} style={{ height: '45%', marginTop: '5%', }}>
              <View style={{ backgroundColor: colors.white, borderRadius: 10, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontFamily: fonts.SfPro_Medium, color: colors.current }}>Cancel</Text>

              </View>
            </TouchableOpacity>

          </View>
        </View>
      </BottomSheet>

    </View>
  )
}

export default EditProfile;