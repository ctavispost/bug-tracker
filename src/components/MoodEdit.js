import React from 'react';
import Mood from './Mood';

const MoodCreate = (props) => {
    return (
        <section>
            <h4>How are you?</h4>
            <section className="flexy">
                <button>
                    <i className="material-icons">sentiment_very_satisfied</i>
                </button>
                <button>
                    <i className="material-icons">sentiment_satisfied</i>    
                </button>
                <button>
                    <i className="material-icons">sentiment_neutral</i>
                </button>
                <button>
                    <i className="material-icons">seniment_dissatisfied</i>    
                </button>
                <button>
                    <i className="material-icons">sentiment_very_dissatisfied</i>
                </button>
            </section>
        </section>
    )
}

export default MoodCreate;