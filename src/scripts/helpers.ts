export const clamp = (n: number, min: number, max: number): number => {
    return Math.min(Math.max(n, min), max);
}
export const byteClamp = (n: number): number => {
    return clamp(n, 0, 255);
}
export const asPercent = (n: number)=> {
    return `${Math.round(percent(n) * 100)}%`;
}
export const percent = (n: number)=> {
    return Math.round(n * 100) / 100;
}