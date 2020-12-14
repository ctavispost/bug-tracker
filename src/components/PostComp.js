import React from 'react';
import ColorModel from '../models/color';

const PostComp = async (props) => {
    const colorId = props.colorId;
    const getColor = async (colorId) => {
        const colorInfo = (await ColorModel.getColor(colorId)).color;
        return colorInfo.hex;
    }
    const moodColor = getColor(colorId);

    return <div className="moodSquare" style={{backgroundColor: { moodColor }}}></div>
}

export default PostComp;