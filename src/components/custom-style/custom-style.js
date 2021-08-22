import React, { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import Spinner from '../spinner/spinner';
import MonacoEditor from 'react-monaco-editor';
import './custom-style.scss';

function CustomStyle({template, onUpdateStyle, loading }) {

    const [value, onUpdateValue] = useState(template);
    //const debouncedUpdateStyle = debounce(onUpdateStyle, 5000);
    const changeStyle = (newvalue, evt) => {
        onUpdateValue(newvalue);
        onUpdateStyle(newvalue);
        //console.log("onChange", newvalue, evt);
    }
    const debouncedChangeStyle = useMemo(
        () => debounce(changeStyle, 5000), [onUpdateStyle]
    );

    useEffect(() => {
        if (!value) onUpdateValue(template);
        console.log('value', value);
        return () => {
            debouncedChangeStyle.cancel();
        }
    }, [template, value, debouncedChangeStyle]);
    
    if (loading) {
        return <Spinner/>
    }
    /*let arr = value.replace(/}/g,'}\n').split('\n');//value.replace(/}/g,'}\n');
    let style = '';
    for (let str of arr) {
        style += str.trim() + '\n';
    }*/
    const options = {
        selectOnLineNumbers: true,
        fontSize: 10,
        minimap: {
            enabled: false
        },
        wordWrap: true
    };

    function editorDidMount(editor, monaco) {
        console.log("editorDidMount", editor);
        editor.focus();
    }

    //const model = this.refs.monaco.editor.getModel();
    //const value1 = model.getValue();
    return (
        <div className='customStyle'>
            {/* <textarea
                className='customStyle__code'
                name='style'
                placeholder='write new style'
                //onChange = {this.onUpdateStyle}
                //defaultValue={style}
                defaultValue={style}
                rows = {20}
                cols = {30}
                onChange = {debouncedChangeStyle}
            ></textarea> */}
            <MonacoEditor
                width="400"
                height="300"
                language="css"
                theme="vs-dark"
                value={value}
                options={options}
                onChange={debouncedChangeStyle}
                editorDidMount={editorDidMount}
            />
            {/* <button 
                type='button' 
                className='btn customStyle__btn'
                onClick={ () => {
                        onUpdateStyle(editor.getValue());
                    }
                }
            >Обновить стили
            </button> */}
        </div>
    )
}

export default CustomStyle;