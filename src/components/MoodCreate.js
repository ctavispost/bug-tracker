import React, { Component } from 'react';
import PostModel from '../models/post';

class MoodCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            see: this.props.show
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = async (event) => {
        event.preventDefault();
        event.persist();
        
        let colorIdStr = null;
        if(event.target.dataset.value) {
            console.log("true");
            colorIdStr = event.target.dataset.value;
        } else {
            colorIdStr = event.target.parentElement.dataset.value;
        };
        
        const colorVal = parseInt(colorIdStr);
        
        const newPost = {
            colorId: colorVal
        };
        console.log("new post", newPost);
        this.props.onClick(await PostModel.create(newPost));
    }  

    render() {
        let showBlock = {display: "none"};

        if(this.props.show) {
            showBlock = {display: "block"};
        };

        return (
            <section className="modal" id="modal1" style={ showBlock }>
                <h1 className="just-center pad-top marg-bot-sm">How are you?</h1>
                <section className="flexy pad-bot">
                    <button onClick={this.handleClick} value="Submit" data-value="1" className="flexy just-center align-center round btn-quiet">
                        <i className="material-icons round pad-med orange">sentiment_very_satisfied</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="2" className="flexy just-center align-center round btn-quiet">
                        <i className="material-icons round pad-med green">sentiment_satisfied</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="3" className="flexy just-center align-center round btn-quiet">
                        <i className="material-icons round pad-med purple">sentiment_neutral</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="4" className="flexy just-center align-center round btn-quiet">
                        <i className="material-icons round pad-med blue">sentiment_dissatisfied</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="5" className="flexy just-center align-center round btn-quiet">
                        <i className="material-icons round pad-med grey">sentiment_very_dissatisfied</i>
                    </button>
                </section>
            </section>
        );    
    };
}

export default MoodCreate;