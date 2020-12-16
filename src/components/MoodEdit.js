import React, { Component } from 'react';
import PostModel from '../models/post';

class MoodEdit extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        let showBlock = {display: "none"};

        if(this.props.show) {
            showBlock = {display: "block"};
        };

        return (
            <section className="modal" id="modal1" style={ showBlock }>
                <p>temp text</p>
            </section>
        );    
    };
}

export default MoodEdit;