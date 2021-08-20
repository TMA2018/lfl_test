import React, {Component} from 'react';
import AppPost from '../app-post/app-post';
import CustomStyle from '../custom-style/custom-style';

import './app.scss';
const axios = require('axios');
export default class App extends Component {
    constructor() {
        super();
        this.urlPost = 'https://sheets.amateum.com/graphic/611a13fe643d22548b08a89c';
        this.urlTemplate =  'https://rest.amateum.com/templates/611a138d728e210c2c38d795';
    }

    state = {
        template: '',
        loadingTemplate: true,
        loadingPost: true
    }

    initialState() {  
        let oldValue;
        axios.get(this.urlTemplate)
        .then(res => {
            for (let k in res.data) {
                if (k === 'customStyle') {
                  oldValue = res.data[k];
                }
            }
            this.setState( () => {
                return {
                    template: oldValue,
                    loadingTemplate: false,
                    loadingPost: false
                }
            });
            //console.log(oldValue);
            // return oldValue; 
        });
            //.catch(console.log(`Failed to get resource`));
    }
    onUpdateStyle = async (customStyle) => {
        // const term = style; // evt.target.value.toLowerCase();
        // this.setState({term});
        // //this.props.onUpdateStyle(term);
       /*let customStyle = `#sharable {background: linear-gradient(to top, #1F1C18, black);}
       .sharable-stripes-left {background: linear-gradient(to top, #1F1C18, #331913);}
       .sharable-cont{background: rgba(0, 0, 0, .75);}
       .tournament .inner .emblem-text, .sharable-stripes-right > div:first-child {color: #401710;}
       .sharable-stripes-right > div:last-child {background: #000000;}
       .scores > div {background-color: rgba(105, 23, 10, .35);}
       .events-item:nth-child(even) {background-color: rgba(138, 34, 16, .15);}`;*/
       const objStyle = {customStyle};
        //let urltest = 'https://jsonplaceholder.typicode.com/posts/1';
        //await axios.get(urltest).then(res => console.log(res.data));
//this.urlTemplate
        await axios.put(this.urlTemplate, objStyle)
        .then( res => console.log('posting successful', res.data))
        .catch(function (error) {
            console.log(error);
        });;
            // .then( data => console.log('posting successful', data))
            // .catch(console.log(`posting to ${this.urlTemplate} failure`));

        this.setState({
            template: customStyle,
            loadingTemplate: true,
            loadingPost: true
        });
        this.initialState();
        //await axios.get(urltest).then(res => console.log(res.data));
    }
    
    componentDidMount() {
        this.initialState();
    }
    // componentDidUpdate() {
    //     this.initialState();
    // }
    render() {
       
        //console.log(this.urlTemplate);        
        const {template, loadingTemplate, loadingPost} = this.state;
        //console.log('template', template);

        return (
            <div className='app'>
                <AppPost
                    urlPost={this.urlPost}
                    loadingPost={loadingPost}
                />
                <CustomStyle
                    onUpdateStyle={this.onUpdateStyle}
                    loading = {loadingTemplate}
                    template ={template}
                />
            </div>
        )
    }
}
