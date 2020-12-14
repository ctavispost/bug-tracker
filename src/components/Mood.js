import React from 'react';


const Mood = () => {
    return(
        <section>
            <h4>How are you?</h4>
            <section className="flexy">
                <i class="material-icons">sentiment_very_satisfied</i>
                <i class="material-icons">sentiment_satisfied</i>
                <i class="material-icons">sentiment_neutral</i>
                <i class="material-icons">seniment_dissatisfied</i>
                <i class="material-icons">sentiment_very_dissatisfied</i>
            </section>
        </section>
    )
}
export default Mood;