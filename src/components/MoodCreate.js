import React, { Component } from 'react';
import PostModel from '../models/post';

class MoodCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            colorId: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = async (event) => {
        event.preventDefault();
        event.persist();
        console.log("event :", event)
        if(!Number.isNaN(event.target.dataset.value)) {
            this.setState({colorId: event.target.dataset.value});
        } else {
            this.setState({colorId: event.target.parentElement.dataset.value});
        };
        console.log("state: ", this.state.colorId);
        const newPost = {
            colorId: this.state.colorId
        };
        console.log("new post", newPost);
        //this.props.onSubmit(await PostModel.create(newPost));
    }  

    render() {
        let showBlock = {display: "none"};

        if(this.props.show) {
            showBlock = {display: "block"};
        };

        return (
            <section className="modal" id="modal1" style={ showBlock }>
                <h4>How are you?</h4>
                <section className="flexy">
                    <button onClick={this.handleClick} value="Submit" data-value="1" className="flexy just-center align-center btn-quiet">
                        <i className="material-icons round orange">sentiment_very_satisfied</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="2" className="flexy just-center align-center btn-quiet">
                        <i className="material-icons round green">sentiment_satisfied</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="3" className="flexy just-center align-center btn-quiet">
                        <i className="material-icons round purple">sentiment_neutral</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="4" className="flexy just-center align-center btn-quiet">
                        <i className="material-icons round blue">sentiment_dissatisfied</i>
                    </button>
                    
                    <button onClick={this.handleClick} value="Submit" data-value="5" className="flexy just-center align-center btn-quiet">
                        <i className="material-icons round grey">sentiment_very_dissatisfied</i>
                    </button>
                </section>
            </section>
        );    
    };
}

export default MoodCreate;