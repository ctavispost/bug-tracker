import React from 'react';
import ColorModel from '../models/color';

const PostComp = (props) => {
    const colorId = props.color_id;
    const getColor = async (colorId) => {
        const colorInfo = await ColorModel.getColor;
        return colorInfo.hex;
    }
    const moodColor = getColor(colorId);

    return <div className="moodSquare" style={{backgroundColor: { ...moodColor }}}></div>
}

export default PostComp;