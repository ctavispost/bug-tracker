import React, { Component } from 'react';
import PostModel from '../models/post';

class MoodCreate extends Component {
    state = {
        colorId: null
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({colorId: event.target.dataset.value});
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
                        <button type="submit" value="Submit" data-value="1">
                            <i className="material-icons orange">sentiment_very_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" value="Submit" data-value="2">
                            <i className="material-icons green">sentiment_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" value="Submit" data-value="3">
                            <i className="material-icons purple">sentiment_neutral</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" value="Submit" data-value="4">
                            <i className="material-icons blue">seniment_dissatisfied</i>
                        </button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" value="Submit" data-value="5">
                            <i className="material-icons grey">sentiment_very_dissatisfied</i>
                        </button>
                    </form>
                </section>
            </section>
        )    
    };
}

export default MoodCreate;