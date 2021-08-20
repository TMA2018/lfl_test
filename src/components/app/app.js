import React, { useState, useEffect } from 'react';
import AppPost from '../app-post/app-post';
import CustomStyle from '../custom-style/custom-style';

import './app.scss';
const axios = require('axios');

function App() {

    let urlPost = 'https://sheets.amateum.com/graphic/611a13fe643d22548b08a89c';
    const urlTemplate =  'https://rest.amateum.com/templates/611a138d728e210c2c38d795';

    const [template, onUpdateTemplate] = useState('');
    const [loadingTemplate, onUpdateLoadingTemplate] = useState(true);
    const [loadingPost, onUpdateLoadingPost] = useState(true);
    const [reloadPost, onUpdateReloadPost] = useState(0);

    useEffect(() => { 
        initialState();
    }, []);

    function initialState() {  
        let oldValue;
        axios.get(urlTemplate)
        .then(res => {
            for (let k in res.data) {
                if (k === 'customStyle') {
                  oldValue = res.data[k];
                }
            }
            //console.log('oldvalue',oldValue);
            onUpdateTemplate(oldValue);
            onUpdateLoadingTemplate(false);
            onUpdateLoadingPost(false);
            onUpdateReloadPost(Math.random());
        });
        //.catch(console.log(`Failed to get resource`));
    }
    //initialState();

    async function onUpdateStyle (customStyle) {

        //this.props.onUpdateStyle(term);
       /*let customStyle = `#sharable {background: linear-gradient(to top, #1F1C18, black);}
       .sharable-stripes-left {background: linear-gradient(to top, #1F1C18, #331913);}
       .sharable-cont{background: rgba(0, 0, 0, .75);}
       .tournament .inner .emblem-text, .sharable-stripes-right > div:first-child {color: #401710;}
       .sharable-stripes-right > div:last-child {background: #000000;}
       .scores > div {background-color: rgba(105, 23, 10, .35);}
       .events-item:nth-child(even) {background-color: rgba(138, 34, 16, .15);}`;*/
       const objStyle = {customStyle};

        await axios.put(urlTemplate, objStyle)
        .then( res => console.log('posting successful', res.data))
        .catch(function (error) {
            console.log(error);
        });;
            // .then( data => console.log('posting successful', data))
            // .catch(console.log(`posting to ${this.urlTemplate} failure`));

        onUpdateTemplate(customStyle);
        onUpdateLoadingTemplate(false);
        onUpdateLoadingPost(false);
        onUpdateReloadPost(Math.random());
        initialState();
        //await axios.get(urltest).then(res => console.log(res.data));
    }
    
    // componentDidUpdate(prevProps) {
    //     if (prevProps.template !== this.props.template) {
    //         this.initialState();
    //     }
    // }

    return (
        <div className='app'>
            <AppPost
                urlPost={urlPost}
                loadingPost={loadingPost}
                key={reloadPost}
            />
            <CustomStyle
                onUpdateStyle={onUpdateStyle}
                loading = {loadingTemplate}
                template ={template}
            />
        </div>
    )

}
export default App;