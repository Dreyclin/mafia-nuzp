import React from "react";
import ControlPanel from "./ControlPanel";
import MiddlePanel from "./MiddlePanel/MiddlePanel";
import VotingPanel from "./VotingPanel";

export default function AdminPanel(props) {
    console.log("rerendered");
    return (
        <div className="admin-panel">
           <ControlPanel />
           <MiddlePanel />
           <VotingPanel />
        </div>
    )
}