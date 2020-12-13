import React, { Component } from 'react';
import Mood from './Mood';
import PostModel from '../models/post';

class MoodCreate extends Component {
    state = {
        colorId: null
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({colorId: event.target.dafaultValue});
        const newPost = {
            colorId: this.state.colorId
        };

        this.props.onSubmit(await PostModel.create(newPost));
    }

    render() {
        return (
            <section>
                <h4>How are you?</h4>
                <section className="flexy">
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="1" style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i className="material-icons orange">sentiment_very_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="2" style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i className="material-icons green">sentiment_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="3" style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i className="material-icons purple">sentiment_neutral</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="4" style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i className="material-icons blue">seniment_dissatisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="5" style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i className="material-icons grey">sentiment_very_dissatisfied</i>
                        </button>
                    </form>
                </section>
            </section>
        )    
    };
}

export default MoodCreate;