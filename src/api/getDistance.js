import axios from "axios";

export default async function getDistance(origin,destination){
  console.log('origin',origin);
  console.log('destination',destination);
  try {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI`
    const res = await axios.get(url);
    console.log('reiuwyryeiyriweddddiyiw',JSON.stringify(res.data.rows[0].elements[0].status));
    if(res.data.rows[0].elements[0].status=="OK"){
     return res.data.rows[0].elements[0].distance.text;
    }else{
      return "N.A"
    }
} catch (err) {
    return err.message;
}
  }