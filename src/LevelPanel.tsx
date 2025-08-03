import * as React from "react";
import {asPercent} from "./scripts/helpers.ts";

interface LevelPanelProps {
    isVisible: boolean;
    redLevel: number;
    setRedLevel: (level: number) => void;
    greenLevel: number;
    setGreenLevel: (level: number) => void;
    blueLevel: number;
    setBlueLevel: (level: number) => void;
}

const LevelPanel: React.FunctionComponent<LevelPanelProps> = (props) => {
    const redLevelPercentage = React.useMemo(() => {
        return asPercent(props.redLevel / 255);
    }, [props.redLevel])
    const greenLevelPercentage = React.useMemo(() => {
        return asPercent(props.greenLevel / 255);
    }, [props.greenLevel])
    const blueLevelPercentage = React.useMemo(() => {
        return asPercent(props.blueLevel / 255);
    }, [props.blueLevel])

    const resetRed = ()=> {
        props.setRedLevel(255);
    }
    const resetGreen = ()=> {
        props.setGreenLevel(255);
    }
    const resetBlue = ()=> {
        props.setBlueLevel(255);
    }
    return <div style={{display: props.isVisible ? "inherit" : "none"}}>
        <div id={"level-panel"}>
            <label htmlFor={"redLevel"}>Red Level&ensp;</label>
            <input id={"redLevel"} type={"range"} step={"2"} min={0}
                   max={511} value={props.redLevel}
                   onChange={(e) => props.setRedLevel(parseInt(e.target.value))}/>
            <span>{redLevelPercentage}</span>
            <input type={"button"} value={"Reset"} onClick={resetRed}/>
            <label htmlFor={"greenLevel"}>Green Level&ensp;</label>
            <input id={"greenLevel"} type={"range"} step={"2"} min={0}
                   max={511} value={props.greenLevel}
                   onChange={(e) => props.setGreenLevel(parseInt(e.target.value))}/>
            <span>{greenLevelPercentage}</span>
            <input type={"button"} value={"Reset"} onClick={resetGreen}/>
            <label htmlFor={"blueLevel"}>Blue Level&ensp;</label>
            <input id={"blueLevel"} type={"range"} step={"2"} min={0}
                   max={511} value={props.blueLevel}
                   onChange={(e) => props.setBlueLevel(parseInt(e.target.value))}/>
            <span>{blueLevelPercentage}</span>
            <input type={"button"} value={"Reset"} onClick={resetBlue}/>
        </div>
    </div>
}

export default LevelPanel;