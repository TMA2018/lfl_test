import React, { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import Spinner from '../spinner/spinner';
import './custom-style.scss';

function CustomStyle({template, onUpdateStyle, loading }) {

    const [value, onUpdateValue] = useState(template);
    //const debouncedUpdateStyle = debounce(onUpdateStyle, 5000);
    const changeStyle = (evt) => {
        onUpdateValue(evt.target.value);
        onUpdateStyle(evt.target.value);
    }
    const debouncedChangeStyle = useMemo(
        () => debounce(changeStyle, 5000), [onUpdateStyle]
    );

    //console.log('template', template);
    //onUpdateValue(template);
    //template = value;
    useEffect(() => {
        if (!value) onUpdateValue(template);
        console.log('value', value);
        //debouncedChangeStyle();
        // let timerId = setInterval(onUpdateStyle, 5000, value);
        // return () => {
        //     clearInterval(timerId);
        // }
        return () => {
            //debouncedUpdateStyle.cancel();
            debouncedChangeStyle.cancel();
        }
    }, [template, value, debouncedChangeStyle]);

    //console.log('value', value);
    
    if (loading) {
        return <Spinner/>
    }
    let arr = value.replace(/}/g,'}\n').split('\n');//value.replace(/}/g,'}\n');
    let style = '';
    for (let str of arr) {
        style += str.trim() + '\n';
    }
    return (
        <div className='customStyle'>
            <textarea
                className='customStyle__code'
                name='style'
                placeholder='write new style'
                //onChange = {this.onUpdateStyle}
                //defaultValue={style}
                defaultValue={style}
                rows = {20}
                cols = {30}
                onChange = {debouncedChangeStyle}
            ></textarea>
            <button 
                type='button' 
                className='btn customStyle__btn'
                onClick={ () => onUpdateStyle(style)}
            >Обновить стили
            </button>
        </div>
    )
}

export default CustomStyle;