import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import Header from '../../components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputComponent } from '../../components/TextInput'
import { TextRegular } from '../../components/AppText'
import FastImage from 'react-native-fast-image'
import images from '../../constants/images'
import { TouchableOpacity } from 'react-native'
import { AppMainButton } from '../../components/AppButton'
import colors from '../../constants/colors'
import CheckBox from 'react-native-check-box'
import Header1 from '../../components/Header1'
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from 'react-redux'
import { login, updateUser } from '../../redux/slices/userSlice'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import Toast from 'react-native-simple-toast';

const AddProfilePhoto = ({navigation}) => {
  const { height } = Dimensions.get('window')
  const [dob, setDob] = useState('')
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [imageFile, setImageFile] = useState({})
  const isDisable = firstName.trim().length == 0 || lastName.trim().length == 0 || dob.trim().length ==0 || phoneNumber.trim().length == 0 || !isChecked
  console.log('isDisableisDisable', isDisable);

  const onPress =()=> {
    navigation.navigate('ChooseActivity')
  }

  const takeAphoto = async () => {
    if(Object.keys(imageFile).length) {
      setImageFile({})
      return;
    }
    setTimeout(async () => {
      const res = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      let imageFile = {
        name: new Date().getTime() + ".png",
        type: res.mime,
        uri: res.path,
      };
      setImageFile(imageFile)
      // setEventImage(imageFile);
      // updateProfileImage(imageFile)
      console.log("redshjgsdjhgjhdgasjhd", res);
    }, 500);
  };

  const onContinue =async()=>{
    // navigation.navigate('ChooseActivity')
    // return
    setIsLoading(true)
    let body = new FormData();
    body.append('profilePhoto', imageFile);
    let url = `${Url.ADD_PROFILE}/${userInfo.id}`
    console.log('31231231212', userInfo);
    console.log('url1ds1dsds111', url);
    let response = await services.post(url, "", body, 'formdata')
    console.log('dsada341232131212', response)
    setIsLoading(false)
      Toast.show(response.message)
      if(response.status) {
        // dispatch(updateUser(response.user));
        navigation.navigate("ChooseActivity")
      }
  }

  const chooseFromGallery = async () => {
    if(Object.keys(imageFile).length) {
      navigation.navigate('ChooseActivity')
      return;
    }
    setTimeout(async () => {
      const res = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      let imageFile = {
        name: new Date().getTime() + ".png",
        type: res.mime,
        uri: res.path,
      };
      setImageFile(imageFile)
      // setEventImage(imageFile);
      // updateProfileImage(imageFile)
      console.log("redshjdsaasdsdsgsdjhgjhdgasjhd", res);
    }, 500);

    console.log(res);
  };

  const onPressSkip =()=> {
    navigation.navigate('ChooseActivity')
  }

  return (
    <KeyboardAwareScrollView  contentContainerStyle={{flexGrow: 1,backgroundColor: '#fff'}}>
     <View style={{height: height - 160}}>
      <TouchableOpacity onPress={()=> console.log('3243342323423')}>
       <Header1 title="Skip" onPress={onPressSkip}/>
     </TouchableOpacity>
    <TextRegular text="Take a new photo or upload from your library to set your profile photo." styles={styles.photo}/>

    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: 'center'}}>
      <TouchableOpacity>
      <Image source={!Object.keys(imageFile).length ? images.camera2 : {uri: imageFile.uri}} style={{height: 200, width: 200,borderRadius: 100,borderWidth: 1, borderColor: colors.gray}}/>
      </TouchableOpacity>
    </View>
     </View>
     <View style={styles.bottom}>
      <AppMainButton title={!Object.keys(imageFile).length ? "Take Photo" : 'Change Photo'} textStyle={{color: colors.orange_dark}} styles={styles.button} onPress={takeAphoto}/>
      <AppMainButton title={!Object.keys(imageFile).length ? "Add From Library" : 'Continue'} isLoading={isLoading} onPress={!Object.keys(imageFile).length ? chooseFromGallery : onContinue}/>
     </View>
    </KeyboardAwareScrollView>
  )
}

export default AddProfilePhoto
