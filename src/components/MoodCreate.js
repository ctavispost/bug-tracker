import React, { Component } from 'react';
import Mood from './Mood';
import PostModel from '../components/post';

class MoodCreate extends Component {
    state = {
        colorId: null
    }

    handleSubmit = (event) => {
        event.preventDefault();
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
                        <input type="number" defaultValue="1" value={this.state.colorId} style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i class="material-icons orange">sentiment_very_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="2" value={this.state.colorId} style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i class="material-icons green">sentiment_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="3" value={this.state.colorId} style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i class="material-icons purple">sentiment_neutral</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="4" value={this.state.colorId} style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i class="material-icons blue">seniment_dissatisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" defaultValue="5" value={this.state.colorId} style={{display: "none"}}></input>
                        <button type="submit" value="Submit">
                            <i class="material-icons grey">sentiment_very_dissatisfied</i>
                        </button>
                    </form>
                </section>
            </section>
        )    
    };
}

export default MoodCreate;