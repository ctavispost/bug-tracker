import React from 'react';

const PostComp = (props) => {
    const style = { backgroundColor: props.colorHex };

    //iff component is passed 'truthy' props by userPostList, returns a button which onClick opens modal MoodEdit, else returns a div
    const btn = (<button className="moodSquare btn-quiet-two" value={props.id} onClick={props.openModal} style={ style }></button>);
    const nonBtn = (<div className="moodSquare" style={ style }></div>);
    
    return ( props.truthy ? btn : nonBtn );
}

export default PostComp;