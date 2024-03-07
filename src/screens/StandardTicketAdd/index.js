import { Text, View, ScrollView } from "react-native";
import React from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import FastImage from "react-native-fast-image";

const StandardTicketAdd = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
        <TimeLineComponent perc={45} />
      </View>
      <LabelDescComponent
        desc={`Tailor your tickets to fit your event. Name each ticket type, decide the quantity available, and set the right price. Create options that cater to all your attendees.`}
        label={"Customize Your Ticket Details"}
      />

      <View style={styles.ticketContainer}>
        <View style={styles.typeTextContainer}>
          <Text style={styles.typeText}>Standard ticket</Text>
          <Text style={styles.typeText}>{`$ ${20} /ticket`}</Text>
        </View>
        <Text style={styles.quantity}>{`Quantity : 50`}</Text>
        <View style={styles.saleType}>
          <Text style={styles.saleTypeText}>{`On Sale`}</Text>
        </View>
        <View style={styles.options}>
          <FastImage
            source={images.docEdit}
            style={{ height: 20, width: 20 }}
          ></FastImage>
          <Text style={styles.editText}>Edit</Text>
          <FastImage
            source={images.del}
            style={{ height: 20, width: 20 }}
          ></FastImage>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.addTicket}>
        <FastImage
          source={images.add}
          style={{ height: 16, width: 16 }}
        ></FastImage>
        <Text style={styles.addTicketText}>Add ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("PaymentCollectionSetup")}
        style={styles.nextBtn}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StandardTicketAdd;
