import React from "react";
import Player from "./Player";
import Role from "./Role";
import Timer from "./Timer";

export default function AdminPanel(props) {
    return (
        <div className="admin-panel">
            <div className="control-panel">
                <button className="btn btn-dark">Сделать доном</button>
                <button className="btn btn-secondary">Сделать мафией</button>
                <button className="btn btn-warning">Сделать шерифом</button>
                <button className="btn btn-danger">Сделать мирным</button>
                <button className="btn btn-light">Поставить фол</button>
                <button className="btn btn-primary">Выставить на голосование</button>
                <button className="btn btn-danger">Изгнать</button>
                <button className="btn btn-info">Следующий игрок</button>
                <button className="btn btn-info">Предыдущий игрок</button>
            </div>
            <div className="middle-panel">
                <div className="chosen-player-container">
                    <h1>Player 1</h1>
                </div>
                <div className="players-container">
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                    <Player number={10} role={<Role role={"Д"} />} />
                </div>
                <div className="timer-container">
                    <Timer />
                    <div className="timer-controls-container">
                        <div className="timer-controls-duration">
                            <button className="btn btn-primary">+5 sec</button>
                            <button className="btn btn-warning">-5 sec</button>
                        </div>
                        <div className="timer-controls-time">
                            <button className="btn btn-success">Start</button>
                            <button className="btn btn-danger">Stop</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="voting-panel">

            </div>
        </div>
    )
}