declare namespace JSX { interface IntrinsicElements { [element: string]: any } }
declare module '*.css' { const content: string; export default content; }
declare module 'react' {
  export type PropsWithChildren<T = {}> = T & { children?: any };
  export function useRef<T>(value: T): { current: T };
  export function useState<T>(value: T): [T, (value: T) => void];
  const React: any;
  export default React;
}
declare module 'react-dom/client' { export function createRoot(element: Element): { render(node: any): void }; }
declare module 'react/jsx-runtime' { export const jsx: any; export const jsxs: any; export const Fragment: any; }
