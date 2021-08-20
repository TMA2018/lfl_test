import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import './custom-style.scss';

function CustomStyle({template, onUpdateStyle, loading }) {

    const [value, onUpdateValue] = useState(template);
    //console.log('template', template);
    //onUpdateValue(template);
    //template = value;
    useEffect(() => {
        if (!value) onUpdateValue(template);
        console.log('value', value);

        let timerId = setInterval(onUpdateStyle, 5000, value);
        return () => {
            clearInterval(timerId);
        }
    }, [template, value, onUpdateStyle]);

    //console.log('value', value);
    
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
                onChange = {(evt) => onUpdateValue(evt.target.value)}
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

export default CustomStyle;