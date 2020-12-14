import React from 'react';

const PostComp = (props) => {
    const style = { backgroundColor: props.colorHex };
    return (<div className="moodSquare" style={ style }></div>);
}

export default PostComp;