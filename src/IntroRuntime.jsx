import React,{createContext,useContext} from 'react';
export const IntroFrame=createContext({frame:540,fps:30,width:1920,height:1080});
export function useCurrentFrame(){return useContext(IntroFrame).frame}
export function useVideoConfig(){return useContext(IntroFrame)}
export function AbsoluteFill({style,children}){return <div style={{position:'absolute',inset:0,...style}}>{children}</div>}
export function CanvasImage(props){return <img alt="" draggable="false" {...props}/>}
export function staticFile(name){return '/media/'+name.replace('alpine.png','alpine.webp')}
export const Easing={bezier:(x1,y1,x2,y2)=>x=>{const curve=(t,a,b)=>3*(1-t)*(1-t)*t*a+3*(1-t)*t*t*b+t*t*t;let lo=0,hi=1;for(let i=0;i<14;i++){const mid=(lo+hi)/2;if(curve(mid,x1,x2)<x)lo=mid;else hi=mid}return curve((lo+hi)/2,y1,y2)}};
export function interpolate(value,input,output,options={}){if(value<=input[0])return output[0];if(value>=input.at(-1))return output.at(-1);let n=0;while(n<input.length-2&&value>input[n+1])n++;let t=(value-input[n])/(input[n+1]-input[n]);if(options.easing)t=options.easing(t);return output[n]+(output[n+1]-output[n])*t}
