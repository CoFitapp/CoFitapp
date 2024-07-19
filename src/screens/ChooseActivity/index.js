import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native'
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
import { FlatList } from 'react-native'
import fonts from '../../constants/fonts'
import { useDispatch, useSelector } from 'react-redux'
import { login, updateUser } from '../../redux/slices/userSlice'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import Toast from 'react-native-simple-toast';

const ChooseActivity = ({navigation}) => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(false)
  const { height, width } = Dimensions.get('window')
  const [interests, setInterests] = useState([
    {
      id: 1,
      name: 'Zumba',
      image: images.running,
      selected: false
    },
    {
        id: 2,
        name: 'Running',
        image: images.zumba,
        selected: false
      },
      {
        id: 3,
        name: 'Swimming',
        image: images.zumba,
        selected: false
      },
      {
        id: 4,
        name: 'Gym',
        image: images.running,
        selected: false
      },
      {
        id: 5,
        name: 'Crossfit',
        image: images.running,
        selected: false
      },
      {
        id: 6,
        name: 'Rock Climbing',
        image: images.zumba,
        selected: false
      },
      {
        id: 7,
        name: 'Running',
        image: images.zumba,
        selected: false
      },
      {
        id: 8,
        name: 'Swimming',
        image: images.running,
        selected: false
      },
      {
        id: 9,
        name: 'Gym',
        image: images.running,
        selected: false
      },
      {
        id: 10,
        name: 'Crossfit',
        image: images.zumba,
        selected: false
      },
      {
        id: 11,
        name: 'Yoga',
        image: images.zumba,
        selected: false
      }
  ])
  const isSelected = interests.some(item => item.selected);
  console.log('2123213433212321312', isSelected)
  const onSelectActivity =(item, index)=> {
    let data = [...interests]
    data[index].selected = !data[index].selected
    setInterests(data)
  }

  const onPressNext =async()=> {
    // navigation.navigate('ChooseLocation')
    // return
    console.log('dsadasdasdsdsa', interests);
    let filterArr = interests.filter(a => a.selected == true).map(i => i.name)
    console.log('dsdsadsadasdasdsdsqw', filterArr);
    setIsLoading(true)
      const data = new FormData()
      data.append('interests', JSON.stringify(filterArr))
      console.log('bodyyyyy', data);
      let url = `${Url.ADD_PROFILE}/${userInfo.id}`
      console.log('urllllll', url);
      const response = await services.post(url, "", data, 'formdata')
      setIsLoading(false)
      Toast.show(response.message)
      if(response.status) {
        dispatch(updateUser(response.user));
        navigation.navigate('ChooseLocation')
      }
  }
  return (
    // <KeyboardAwareScrollView  contentContainerStyle={{flexGrow: 1,backgroundColor: '#fff'}}>
    <View style={{flex: 1}}>
    <View style={{height:'90%'}}>
     <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.arrNew1} style={[styles.nextArrowIcon, { transform: [{ rotate: "180deg" }] }]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate('ChooseLocation')}>
            <Text  style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </View>
     <Text style={styles.account}>Choose your Interests</Text>
        <TextRegular styles={{paddingTop: 8, paddingHorizontal: 15}} text="Get personalized event recommendations by choosing what interests you!"/>
        <FlatList
          data={interests}
          numColumns={2}
          horizontal={false}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item, index}) => {
            return(
                <TouchableOpacity onPress={()=> onSelectActivity(item, index)} activeOpacity={0.7} style={{}}>
                 <FastImage  source={item.image} style={{height: 150, width: width * 0.45, marginLeft: width * 0.03, marginTop: width * .03, borderRadius: 6, justifyContent: item.selected ? 'space-between' : 'flex-end', paddingBottom: 10, borderWidth: item.selected ? 2 : 0, borderColor: colors.blue}}>
                  {
                    item.selected &&
                    <FastImage source={images.checkNew} style={{height: 24, width: 24, alignSelf: 'flex-end', marginTop: 10, marginRight: 10}}/>
                  }
                   <Text style={{color:'#fff', fontFamily: fonts.SfPro_Semibold, paddingLeft: 15, textShadowRadius: 5, textShadowColor: '#000'}}>{item.name}</Text>
                 </FastImage>
                </TouchableOpacity>
            )
          }}
        />
     </View>

     <View style={styles.bottom}>
      <AppMainButton title="Next" disable={!isSelected} isLoading={isLoading} onPress={onPressNext}/>
     </View>
     </View>
    // </KeyboardAwareScrollView>
  )
}

export default ChooseActivity
