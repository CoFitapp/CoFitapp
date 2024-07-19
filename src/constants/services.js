import axios from "axios";
import * as Url from "./url"
// import Toast from 'react-native-simple-toast';

export const post = async(url , token , data , type)=>{
    var headers;
    if (token == '' || token == null || token == undefined) {
        headers = {
            "Content-Type":type=='json' ? "application/json" : 'multipart/form-data'
        }
    }
    else {
        headers = {
            "Content-Type":type=='json' ? "application/json" : "multipart/form-data",
            "x-access-token": token
        }
    }
    let completeUrl = Url.BASE_URL + url;
    console.log('url>>>>>>>>>',completeUrl);
    console.log('headerss>>>>>', headers);

    const response = await fetch(completeUrl, {
        method: 'POST',
        headers,
        body:type=='json' ? JSON.stringify(data) : data
    });
    let res = await response.json();
    console.log('dsagdahjsdasasaasgjhasdadads',res);
    if(res.status==1){
        return res;
    }else{
        // Toast.show(res.message)
        return res;
    }
}

export const patch = async(url , token , data )=>{
    var headers;
    if (token == '' || token == null || token == undefined) {
        headers = {
            "Content-Type":"application/json"
        }
    }
    else {
        headers = {
            "Content-Type":"application/json",
            "x-access-token": token
        }
    }
    let completeUrl = Url.BASE_URL + url;
    const response = await fetch(completeUrl, {
        method: 'patch',
        headers,
        body:JSON.stringify(data)
    });
    let res = await response.json();
    console.log('dsagdahjsaasgjhasdadads',res);
    if(res.status==1){
        return res;
    }else{
        // Toast.show(res.message)
        return res;
    }
}

export const get = async(url)=>{
    let completeUrl = Url.BASE_URL + url;
    console.log('complete url>>>>', completeUrl);
    const response = await fetch(completeUrl, {
        method: 'get',
    });
    let res = await response.json();
    console.log('res>>>>>>>>>>>>>>',res);
    if(res.status==1){
        return res;
    }else{
        // Toast.show(res.message)
        return res;
    }
}