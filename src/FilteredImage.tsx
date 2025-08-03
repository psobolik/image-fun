import * as React from "react";
import Rgba, {type Callback} from "./scripts/Rgba.ts";

interface CanvasProps {
    sourceElementId: string;
    processPixel: Callback;
}

const FilteredImage: React.FunctionComponent<CanvasProps> = (props) => {
    const ID = "filter-canvas";

    React.useEffect(() => {
        const draw = ()=> {
            const sourceElement = document.getElementById(props.sourceElementId) as HTMLCanvasElement;
            if (!sourceElement) return;

            const canvas = document.getElementById(ID) as HTMLCanvasElement;
            const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (context == null) return;

            // Set the canvas dimensions to the image dimensions
            canvas.width = sourceElement.width;
            canvas.height = sourceElement.height;

            // Draw the image onto the canvas
            context.drawImage(sourceElement, 0, 0, sourceElement.width, sourceElement.height);

            // Get the image data from the canvas
            const imgData = context.getImageData(0, 0, canvas.width, canvas.height);

            // imgData.data is an array with [r,g,b,a,r,g,b,a,...]
            for (let i = 0; i < imgData.data.length; i += 4) {
                const rgba = new Rgba(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3]);

                // Here's where you manipulate the pixels
                const updated = props.processPixel(rgba);

                imgData.data[i] = updated.red
                imgData.data[i + 1] = updated.green
                imgData.data[i + 2] = updated.blue
                imgData.data[i + 3] = updated.alpha
            }

            // Put the manipulated data back on the canvas
            context.putImageData(imgData, 0, 0);
        }
        draw();
    }, [props]);

    return <canvas id={ID}></canvas>
}
// const FilteredImage: React.FunctionComponent<CanvasProps> = (props) => {
//     const ID = "filter-canvas";
//
//     React.useEffect(() => {
//         const draw = ()=> {
//             const imgElement = document.getElementById(props.imgId) as HTMLImageElement;
//             if (!imgElement) return;
//
//             const canvas = document.getElementById(ID) as HTMLCanvasElement;
//             const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
//             if (context == null) return;
//
//             // Set the canvas dimensions to the image dimensions
//             canvas.width = imgElement.width;
//             canvas.height = imgElement.height;
//
//             // Draw the image onto the canvas
//             context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
//
//             // Get the image data from the canvas
//             const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
//
//             // imgData.data is an array with [r,g,b,a,r,g,b,a,...]
//             for (let i = 0; i < imgData.data.length; i += 4) {
//                 const rgba = new Rgba(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3]);
//
//                 // Here's where you manipulate the pixels
//                 const updated = props.processPixel(rgba);
//
//                 imgData.data[i] = updated.red
//                 imgData.data[i + 1] = updated.green
//                 imgData.data[i + 2] = updated.blue
//                 imgData.data[i + 3] = updated.alpha
//             }
//
//             // Put the manipulated data back on the canvas
//             context.putImageData(imgData, 0, 0);
//         }
//         draw();
//     }, [props]);
//
//     return <canvas id={ID}></canvas>
// }

export default FilteredImage;
