import React from "react";


export default function WinnersComponent() {
    return (
        <div className="modal-container">
            <div className="modal-title">
                <h3>Победа красных!</h3>
            </div>
            <div className="modal-content">
                <div className="modal-player-container">
                    <span>1 - Дон</span>
                </div>
                <div className="modal-player-container">
                    <span>2 - Маф</span>
                </div>
                <div className="modal-player-container">
                    <span>3 - Маф</span>
                </div>
                <div className="modal-player-container">
                    <span>4 - Шериф</span>
                </div>
            </div>
        </div>
    )
}