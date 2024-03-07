import { Text, View, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import ActivityComponent from "../../components/ActivityComponent";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
const activitiesArr = [
  { id: 1, label: "Yoga Class", value: "Yoga Class" },
  { id: 2, label: "Running Meetup", value: "Running Meetup" },
  { id: 3, label: "Basketball Runs", value: "Basketball Runs" },
  { id: 4, label: "Cycling Ride", value: "Cycling Ride" },
  { id: 5, label: "Outdoor Bootcamp", value: "Outdoor Bootcamp" },
  { id: 6, label: "Dance Fitness", value: "Dance Fitness" },
  { id: 7, label: "Swimming Challenge", value: "Swimming Challenge" },
  { id: 8, label: "Zumba Session", value: "Zumba Session" },
  { id: 9, label: "HIIT Workout", value: "HIIT Workout" },
  { id: 10, label: "Pilates Class", value: "Pilates Class" },
  { id: 11, label: "Walking Group", value: "Walking Group" },
  {
    id: 12,
    label: "Mindfulness Meditation",
    value: "Mindfulness Meditation",
  },
  {
    id: 13,
    label: "Weightlifting Workshop",
    value: "Weightlifting Workshop",
  },
  { id: 14, label: "Family Fitness Day", value: "Family Fitness Day" },
  { id: 15, label: "Soccer Runs", value: "Soccer Runs" },
  { id: 16, label: "Group Hike", value: "Group Hike" },
  { id: 17, label: "CrossFit Workout", value: "CrossFit Workout" },
  { id: 18, label: "5K Fun Run", value: "5K Fun Run" },
  { id: 19, label: "Wellness Workshop", value: "Wellness Workshop" },
  { id: 20, label: "Team Sports Day", value: "Team Sports Day" },
  { id: 21, label: "Fitness Charity Run", value: "Fitness Charity Run" },
  { id: 22, label: "Bodyweight Workout", value: "Bodyweight Workout" },
  { id: 23, label: "Tai Chi Class", value: "Tai Chi Class" },
  { id: 24, label: "Local Park Workout", value: "Local Park Workout" },
  { id: 25, label: "Stretching Session", value: "Stretching Session" },
  { id: 26, label: "Football", value: "Football" },
];
const SelectActivity = () => {
  const [searchInput, setSearchInput] = useState("");
  const [select, setSelect] = useState();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState(originalData);
  const navigation = useNavigation();

  useEffect(() => {
    // Filter the data based on the search input
    const filtered = originalData.filter((item) =>
      item.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchInput, originalData]);

  useEffect(()=>{
    getEventActivity();
  },[])

  const getEventActivity =async()=> {
    let url = `${Url.EVENT_CATEGORIES}`
    let res = await services.get(url)
    if(res?.status && res?.data && res?.data?.length!=0){
      setOriginalData(res.data)
    }
    console.log('jsakhahjksahdkhaka',res);
  }

  const onSearchCandidate = (value) => {
    setInput(true)

    console.log("search text", value)
    if (value == '' || value.length == 0) {
      setFilterJob([])
      setTextt('')
    } else {
      const newData = data.filter(item => {
        try {
          const itemData = item.title.toUpperCase();
          const textData = value.toUpperCase();
          console.log("textData", textData)
          return itemData.indexOf(textData) > -1

        }
        catch (error) {
        }

      })
      console.log("newData1234dsdsdsdsdsdsdsds", newData)
      setFilterJob(newData)
      console.log("newdataaaaa+++++++++", newData)
    }

  }

  return (
    <View style={{backgroundColor:"#fff"}}>
    <View style={styles.scrollView}>
      <View
        style={{
          height: "90%",
        }}
      >
        <View style={styles.header}>
          {/* back icon */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            {/* cancel button */}

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

        {/* timeline viewer */}
        <View style={styles.timeLine}>
          {/* outer view */}
          <TimeLineComponent perc={30} />
          <TimeLineComponent perc={0} />
          <TimeLineComponent perc={0} />
        </View>

        {/* title & description */}

        <LabelDescComponent
          desc={
            "Find the perfect match for your CoFit event. Search and select from a variety of fitness activities to get started."
          }
          label={"Choose Your Fitness Activity"}
          isSearch={true}
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);
          }}
          placeholder={"Search for activity"}
        />

        {/* activities section */}

        <View style={{height:0.4,backgroundColor:"gray"}}/>
        <Text style={styles.heading}>Popular activities</Text>
        <FlatList
          data={filteredData}
          contentContainerStyle={{ marginBottom: 10 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelect(item.id);
                  AsyncStorage.setItem("eventType", item.category);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 45,
                  marginVertical: 12,
                }}
              >
                <FastImage
                  source={images.running}
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 6,
                    marginRight: 15,
                  }}
                />
                {item.id == select && (
                  <FastImage
                    source={images.checkNew}
                    style={{
                      height: 30,
                      width: 30,
                      position: "absolute",
                      right: 0,
                    }}
                  />
                )}
                <Text
                  style={{
                    fontFamily: fonts.SfPro_Regular,
                    fontSize: 14,
                    color:colors.textRegular
                  }}
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 40,
                  fontFamily: "SFProText-Medium",
                  fontSize: 14,
                }}
              >
                No Data Found
              </Text>
            );
          }}
        />
      </View>
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          disabled={!select}
          onPress={() => navigation.navigate("EnterName",{edit:false})}
          style={[
            styles.button,
            { backgroundColor: select ? "#F67045" : "#C9C9C9" },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default SelectActivity;
