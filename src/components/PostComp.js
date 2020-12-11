import React from 'react';
import ColorModel from '../models/color';

const PostComp = (props) => {
    const colorId = props.color;
    const getColor = async (colorId) => {
        const colorInfo = await ColorModel.getColor;
        return colorInfo.hex;
    }
    moodColor = getColor(colorId);

    return <div className="moodSquare" style={
        {backgroundColor: { ...moodColor }}
    }></div>
}