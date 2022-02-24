import React, { useContext } from 'react';
import './style.css';

const RowDetails = ({ name1, name2, gamestatus, result, values }) => {
    return (

        <div className="game-information-mob">
            <div className="teams-name-info-mob">
                <span className="time-markets-count-mob"><b className="b-row-view-mob">{gamestatus}</b></span>
                <p>
                    <span className="team-name-m-box-mob">{name1}</span>
                    <span className="game-score-live-mob">{' '}{result}{' '}</span>
                    <span className="team-name-m-box-mob">{name2}</span>
                </p>
            </div>
            <div className="match-result-container">
                <div className="match-result-text">Match Result</div>
                <div className="factor-container">
                    <div className="factor-mob">
                        <span><i>1.28</i></span>
                    </div>
                    <div className="factor-mob">
                        <span><i>5.10</i></span>
                    </div>
                    <div className="factor-mob">
                        <span><i>11.00</i></span>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default RowDetails;
