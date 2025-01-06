import React from 'react'
import { ScrollView, StyleSheet, Text, View, useWindowDimensions, } from 'react-native'
import { useEffect } from 'react'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import Header1 from '../../components/Header1'
import Header from '../../components/Header'
import { useState } from 'react'
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html'
import fonts from '../../constants/fonts'

const index = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const { width } = useWindowDimensions()

  useEffect(() => {
    getTermOfService()
  }, [])

  const getTermOfService = async () => {
    const response = await services.get(Url.PRIVACY_POLICY)
    console.log('responsewwewewewewew', response)
    if (response.status) {
      setPrivacyPolicy(response.data)
     
    }
  }
  return (
    <View>
      <Header title="Privacy Policy" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 200 }}>

        <RenderHtml
          contentWidth={width}
          //   systemFonts={systemFonts}
            baseStyle={ textStyles }
          source={{ html: privacyPolicy }}
        />

      </ScrollView>
    </View>
  )
}

export default index

const textStyles = {
  fontFamily: fonts.SfPro_Regular,
  fontSize: 14,
  color: '#000'
}