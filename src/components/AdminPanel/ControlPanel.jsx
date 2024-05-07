import React from "react";
import { setFoul, setRole } from "../../features/game/gameSlice";
import { useDispatch } from "react-redux";

export default function ControlPanel() {
    
    const dispatch = useDispatch();

    return(
        <div className="control-panel">
        <button className="btn btn-dark" onClick={() => dispatch(setRole({role: "Д"}))}>Сделать доном</button>
        <button className="btn btn-secondary" onClick={() => dispatch(setRole({role: "М"}))}>Сделать мафией</button>
        <button className="btn btn-warning" onClick={() => dispatch(setRole({role: "Ш"}))}>Сделать шерифом</button>
        <button className="btn btn-danger" onClick={() => dispatch(setRole({role: "К"}))}>Сделать мирным</button>
        <button className="btn btn-light" onClick={() => dispatch(setFoul())}>Поставить фол</button>
        <button className="btn btn-primary">Выставить на голосование</button>
        <button className="btn btn-danger">Изгнать</button>
        <button className="btn btn-info">Следующий игрок</button>
        <button className="btn btn-info">Предыдущий игрок</button>
    </div>
    )
}