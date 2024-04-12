import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import FastImage from "react-native-fast-image";

const PaymentCollectionSetup = () => {
  const navigation = useNavigation();
  const [payment, setPayment] = useState("");

  const showOptions = () => {
    return [
      "Secure & easy setup.",
      "All cards accepted",
      "Stripe payouts to your bank in 2-3 days",
    ].map((item, index) => (
      <View style={styles.description} key={index}>
        <FastImage
          resizeMode="contain"
          style={styles.tickIcon}
          source={images.tick}
        ></FastImage>
        <Text style={styles.descriptionText}>{item}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.scrollView}>
      <View
        style={{
          height: "90%",
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <FastImage
              source={images.backArrow}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveTxt}>Save & exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeLine}>
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={65} />
        </View>
        <LabelDescComponent
          desc={`How would you like to receive payments for your event? Pick a method that's convenient for you and your attendees!`}
          label={"Set Up Payment Collection"}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FastImage
            resizeMode="contain"
            source={images.stripe}
            style={styles.icon}
          ></FastImage>
          {showOptions()}
          <Text onPress={() => setPayment(true)} style={styles.connectText}>
            Connect with Stripe
          </Text>

          <View style={styles.separator}></View>
          <FastImage
            resizeMode="contain"
            source={images.paypal}
            style={styles.icon}
          ></FastImage>
          {showOptions()}
          <Text onPress={() => setPayment(true)} style={styles.connectText}>
            Connect with PayPal
          </Text>

          <View style={styles.bottomSeparator}></View>
        </ScrollView>
      </View>
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("EventInstructions")}
          disabled={!payment}
          style={[
            styles.nextButton,
            {
              backgroundColor: payment ? "#E25F3C" : "#C9C9C9",
            },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentCollectionSetup;
