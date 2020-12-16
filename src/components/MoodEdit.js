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
                <h1 className="just-center pad-top marg-bot-sm">How are you?</h1>
                <section className="flexy pad-bot">
                    <div onClick={this.props.getOut}>
                        <div>
                            <button onClick={this.handleClick} value="Submit" data-value="1" className="flexy just-center align-center round btn-quiet">
                                <i className="material-icons round pad-med orange">sentiment_very_satisfied</i>
                            </button>
                        </div>
                    </div>
                    
                    <div onClick={this.props.getOut}>
                        <div>
                            <button onClick={this.handleClick} value="Submit" data-value="2" className="flexy just-center align-center round btn-quiet">
                                <i className="material-icons round pad-med green">sentiment_satisfied</i>
                            </button>
                        </div>
                    </div>
                    
                    <div onClick={this.props.getOut}>
                        <div>
                            <button onClick={this.handleClick} value="Submit" data-value="3" className="flexy just-center align-center round btn-quiet">
                                <i className="material-icons round pad-med purple">sentiment_neutral</i>
                            </button>
                        </div>
                    </div>

                    <div onClick={this.props.getOut}>
                        <div>
                        <button onClick={this.handleClick} value="Submit" data-value="4" className="flexy just-center align-center round btn-quiet">
                            <i className="material-icons round pad-med blue">sentiment_dissatisfied</i>
                        </button>
                        </div>
                    </div>

                    <div onClick={this.props.getOut}>
                        <div>
                            <button onClick={this.handleClick} value="Submit" data-value="5" className="flexy just-center align-center round btn-quiet">
                                <i className="material-icons round pad-med grey">sentiment_very_dissatisfied</i>
                            </button>
                        </div>
                    </div>

                    <button onClick={this.props.getOut}>x</button>
                </section>
                <div onClick={this.props.getOut} className="just-center">
                    <button className="marg-bot-sm btn-quiet">delete</button>
                </div>
            </section>
        );    
    };
}

export default MoodEdit;