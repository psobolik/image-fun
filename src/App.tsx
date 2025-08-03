import './styles/App.scss'
import * as React from "react";
import {type ChangeEvent, useEffect} from "react";
import picture from './assets/default.jpg'
import FilteredImage from "./FilteredImage.tsx";
import Rgba, {type Callback} from "./scripts/Rgba.ts";
import SourceImage from "./SourceImage.tsx";
import LevelPanel from "./LevelPanel.tsx";

interface Filter {
    name: string;
    callback: Callback;
    showPanel: boolean;
}

function App() {
    const [loaded, setLoaded] = React.useState(false);
    const [callback_index, setCallbackIndex] = React.useState(0);
    const [redLevel, setRedLevel] = React.useState(255);
    const [greenLevel, setGreenLevel] = React.useState(255);
    const [blueLevel, setBlueLevel] = React.useState(255);
    const [blackAndWhite, setBlackAndWhite] = React.useState(false);

    const [file, setFile] = React.useState<File | Blob | undefined>(undefined);

    const filters: Filter[] = React.useMemo(() => {
        return [
            {
                name: "Unfiltered", showPanel: false, callback: (rgba: Rgba): Rgba => {
                    if (blackAndWhite) rgba = rgba.blackAndWhite();
                    return rgba;
                }
            }, {
                name: "Negative", showPanel: false, callback: (rgba: Rgba): Rgba => {
                    if (blackAndWhite) rgba = rgba.blackAndWhite();
                    return rgba.negative();
                }
            }, {
                name: "Posterized", showPanel: false, callback: (rgba) => {
                    if (blackAndWhite) rgba = rgba.blackAndWhite();
                    return rgba.posterized();
                }
            }, {
                name: "High contrast", showPanel: false, callback: (rgba) => {
                    if (blackAndWhite) rgba = rgba.blackAndWhite();
                    return rgba.highContrast();
                }
            }, {
                name: "Color Levels", showPanel: true, callback: (rgba) => {
                    return rgba.colorLevel(redLevel, greenLevel, blueLevel);
                }
            }

        ]
    }, [redLevel, greenLevel, blueLevel, blackAndWhite]);

    const [filter, setFilter] = React.useState(filters[callback_index]);

    // When the app starts, load the default picture
    useEffect(() => {
        fetch(picture)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                setFile(blob);
            });
    }, []);

    useEffect(() => {
        setFilter(filters[callback_index]);
    }, [callback_index, filters, loaded]);

    const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        if (!input || !input.files || !input.files.length) return;
        setLoaded(false);
        setFile(input.files[0]);
    }

    return (
        <>
            <header>Image Filter Fun!</header>
            <div>
                <SourceImage file={file} width={550} onLoaded={() => setLoaded(true)}></SourceImage>
                {loaded ? <FilteredImage sourceElementId={"source-canvas"}
                                         processPixel={filter.callback}></FilteredImage> : <></>}
            </div>
            <div
                style={{display: filters[callback_index].showPanel ? "none" : "inline-block"}}>
                <input id={"blackAndWhiteCheckbox"} type={"checkbox"} checked={blackAndWhite}
                       onChange={(e) => setBlackAndWhite(e.target.checked)}/>
                <label htmlFor={"blackAndWhiteCheckbox"}>Black and white</label>
            </div>
            <div>
                <select value={callback_index} onChange={e => setCallbackIndex(parseInt(e.target.value))}>
                    {filters.map((filter, index) => (<option key={index} value={index}>{filter.name}</option>))}
                </select>
            </div>
            <LevelPanel isVisible={filters[callback_index].showPanel} redLevel={redLevel}
                        setRedLevel={setRedLevel} greenLevel={greenLevel} setGreenLevel={setGreenLevel}
                        blueLevel={blueLevel} setBlueLevel={setBlueLevel}/>
            <hr style={{width: "50%"}}/>
            <input id="fileInput" type="file" accept="image/*" onChange={loadFile}/>
            <footer id="footer"><a href={"https://github.com/psobolik/image-fun.git"}>source</a></footer>
        </>
    )
}

export default App
