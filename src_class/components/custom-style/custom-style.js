import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './custom-style.scss';

export default class CustomStyle extends Component{

    // constructor(props) {
    //     super(props);
    //     this.term = this.props.oldValue;
    // }

    state = {
        value: ''
    }
    
    initialState = () => {
        console.log(' this.props.oldValue state', this.props.template);
        
        this.setState( {     
            value: this.props.template
        });
    }

    onUpdateState = (evt) => {
        this.setState({
            value: evt.target.value
        });
        //console.log('change input template', this.state.value);
        //this.initialState();
    }
    
    componentDidMount() {
        this.initialState();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.template !== this.props.template) {
            this.initialState();
        }
    }
    render() {
        const { onUpdateStyle, loading } = this.props;
        const value = this.state.value;
        //this.initialState();

        //console.log('first render value', value);
        //console.log('first render template', template);
        if (loading) {
            return <Spinner/>
        }
        //let style = value;//value.replace(/}/g,'}\n');
        return (
            <div className='customStyle'>
                <textarea
                    className='customStyle__code'
                    name='style'
                    placeholder='write new style'
                    //onChange = {this.onUpdateStyle}
                    //defaultValue={style}
                    defaultValue={value}
                    rows = {20}
                    cols = {30}
                    onChange = {this.onUpdateState}
                ></textarea>
                {/* <pre>
                    {style}
                </pre> */}
                <button 
                    type='button' 
                    className='btn customStyle__btn'
                    onClick={ () => onUpdateStyle(value)}
                >
                    Обновить стили
                </button>
            </div>
        )
    }
}