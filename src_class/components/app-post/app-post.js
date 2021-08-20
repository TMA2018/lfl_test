import React from 'react';
import Spinner from '../spinner/spinner';
import './app-post.scss';

const AppPost = ({urlPost, loadingPost}) =>{
    if (loadingPost) {
        return <Spinner/>
    }
    return (
            <div className="post">
                <iframe 
                    className="post__content" 
                    type="text/html" 
                    src={urlPost}
                    frameBorder="0"
                    title="post">
                </iframe>
            </div>
    )
}

export default AppPost;