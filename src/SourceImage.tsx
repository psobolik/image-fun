import * as React from "react";

interface SourceImageProps {
    file?: File | Blob;
    width: number;
    onLoaded: () => void;
}

const SourceImage: React.FunctionComponent<SourceImageProps> = (props) => {
    const ID = "source-canvas";

    React.useMemo(() => {
        if (props.file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (!event.target || !event.target.result) return;

                const canvas = document.getElementById(ID) as HTMLCanvasElement;
                const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
                if (context == null) return;

                const image = new Image();
                image.src = event.target.result.toString();
                image.onload = function () {
                    // Draw the image onto the canvas
                    canvas.width = props.width;
                    canvas.height = image.height * (props.width / image.width);
                    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                };
                props.onLoaded();
            };
            reader.readAsDataURL(props.file);
        }

    }, [props])
    return <canvas id={ID}></canvas>
}

export default SourceImage;
