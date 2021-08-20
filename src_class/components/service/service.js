const axios = require('axios');

export default class Service {

    // async getResources(url) {
    //     await axios.get(url)
    //     .then(res => res.data);
    // }
    /*
    async getResources(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`could not fetch ${url} received ${res.status}`);
        }
        return await res.json();
    }
    
    async getHTML(url) {
        const { data } = await this.getResources(url).get();
        return data; //html
    }
*/
    // async putStyle(url, customStyle) {
    //     await axios.put(url, customStyle)
    //     .then( data => console.log(data))
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
/*
    async putStyle(url, customStyle) {

        //const response = 
        const objStyle = {customStyle};
        // console.log(url);
        // console.log(typeof(objStyle));
        console.log(objStyle);
        const res = await fetch(url, {
            //mode: "no-cors",
            method: 'PUT', 
            // headers: {
            //     'Content-Type': 'application/json;charset=utf-8',
            //     'Access-Control-Allow-Origin': '*'
            // },
            //body: JSON.stringify(objStyle)
            body: objStyle
        });
        return await res.json();
        // .then(response => await response.json())
        // .then(myObj => console.log(myObj))
        // .catch(err => console.error('error', err));
        if (!response.ok){
            throw new Error('json error'); 
        }
    } */
}