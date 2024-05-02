import React from "react";

export default function ControlPanel() {
    return(
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
    )
}