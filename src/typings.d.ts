declare module '*.json' {
    const value: any;
    export default value;
    export function map(callback: () => any): any;
    export const length: number;
}
