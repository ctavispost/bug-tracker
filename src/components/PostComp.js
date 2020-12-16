import React from 'react';

const PostComp = (props) => {
    const style = { backgroundColor: props.colorHex };

    const btn = (<button className="moodSquare btn-quiet-two" value={props.id} onClick={props.openModal} style={ style }></button>);
    const nonBtn = (<div className="moodSquare" onClick={()=>console.log("hey")} style={ style }></div>);
    
    return ( props.truthy ? btn : nonBtn );
}

export default PostComp;