import React, { Component } from 'react';
import PostModel from '../models/post';

class MoodCreate extends Component {
    state = {
        colorId: null
    };

    handleCreateSubmit = async (event) => {
        event.preventDefault();
        this.setState({colorId: event.target.dataset.value});
        const newPost = {
            colorId: this.state.colorId
        };
        console.log(this.state.colorId);
        console.log(newPost);
        this.props.onSubmit(await PostModel.create(newPost));
    }

    render() {
        if(!this.props.show){
            return null;
        }

        return (
            <section className="modal">
                <h4>How are you?</h4>
                <section className="flexy">
                    <form onSubmit={e => this.handleCreateSubmit(e)}>
                        <button type="submit" value="Submit" data-value="1" className="flexy just-center align-center btn-quiet">
                            <i className="material-icons round orange">sentiment_very_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={e => this.handleCreateSubmit(e)}>
                        <button type="submit" value="Submit" data-value="2" className="flexy just-center align-center btn-quiet">
                            <i className="material-icons round green">sentiment_satisfied</i>
                        </button>
                    </form>
                    <form onSubmit={e => this.handleCreateSubmit(e)}>
                        <button type="submit" value="Submit" data-value="3" className="flexy just-center align-center btn-quiet">
                            <i className="material-icons round purple">sentiment_neutral</i>
                        </button>
                    </form>
                    <form onSubmit={e => this.handleCreateSubmit(e)}>
                        <button type="submit" value="Submit" data-value="4" className="flexy just-center align-center btn-quiet">
                            <i className="material-icons round blue">sentiment_dissatisfied</i>
                        </button>
                    </form>
                    <form onSubmit={e => this.handleCreateSubmit(e)}>
                        <button type="submit" value="Submit" data-value="5" className="flexy just-center align-center btn-quiet">
                            <i className="material-icons round grey">sentiment_very_dissatisfied</i>
                        </button>
                    </form>
                </section>
            </section>
        )    
    };
}

export default MoodCreate;