import React,{useEffect,useRef,useState} from 'react';
import {Icon} from './Visuals.jsx';
import {SummitIntro} from './IntroScene.jsx';
import {IntroFrame} from './IntroRuntime.jsx';

// The live scene preserves the approved film, without encoding its interface
// into video pixels. Typography and SVGs render at the screen's pixel density.
export function IntroVideo(){
 const section=useRef(null),canvas=useRef(null),elapsed=useRef(0);
 const [width,setWidth]=useState(1920),[reduced,setReduced]=useState(false),[wanted,setWanted]=useState(true),[visible,setVisible]=useState(true),[hidden,setHidden]=useState(false),[prepared,setPrepared]=useState(false),[time,setTime]=useState(0),[ended,setEnded]=useState(false);
 const mobile=width<=700,playing=prepared&&wanted&&!reduced&&!ended&&visible&&!hidden;
 useEffect(()=>{const observer=new ResizeObserver(entries=>setWidth(entries[0].contentRect.width));observer.observe(canvas.current);const media=matchMedia('(prefers-reduced-motion:reduce)');const sync=()=>setReduced(media.matches||document.documentElement.classList.contains('motion-reduced'));sync();media.addEventListener('change',sync);window.addEventListener('earnedline-motion',sync);const io=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{threshold:.18});io.observe(section.current);const doc=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',doc);doc();const image=new Image();let live=true;image.onload=image.onerror=()=>{document.fonts.ready.then(()=>{if(live)setPrepared(true)})};image.src='/media/intro/alpine.webp';return()=>{live=false;observer.disconnect();io.disconnect();media.removeEventListener('change',sync);window.removeEventListener('earnedline-motion',sync);document.removeEventListener('visibilitychange',doc)}},[]);
 useEffect(()=>{if(!playing)return;let raf,last=performance.now(),paint=last;const tick=now=>{elapsed.current=Math.min(18,elapsed.current+Math.min(.1,(now-last)/1000));last=now;if(now-paint>=1000/30||elapsed.current>=18){setTime(elapsed.current);paint=now}if(elapsed.current>=18){setEnded(true);return}raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[playing]);
 // Natural completion follows the same hero handoff as the skip control.
 // Pausing, leaving the viewport, and reduced-motion previews do not complete playback.
 useEffect(()=>{if(ended)skip()},[ended]);
 function replay(){if(reduced)return;elapsed.current=0;setTime(0);setEnded(false);setWanted(true)}
 function skip(){setWanted(false);const hero=document.getElementById('home-hero');if(!hero)return;const header=document.querySelector('.site-header');window.scrollTo({top:window.scrollY+hero.getBoundingClientRect().top-(header?.offsetHeight||0),behavior:reduced?'instant':'smooth'});hero.focus({preventScroll:true})}
 return <section className="entry-intro" ref={section} aria-label="EarnedLine opening film" data-renderer="live-dom" data-playing={playing} data-motion-reduced={reduced} data-ended={ended} data-prepared={prepared} data-time={time.toFixed(2)}>
  <div className="entry-film" ref={canvas}>
   {!prepared&&<picture className="entry-poster"><source media="(max-width:700px)" srcSet="/media/earnedline-intro-mobile-poster.jpg"/><img src="/media/earnedline-intro-poster.jpg" alt="EarnedLine evidence review above an alpine ridge." fetchPriority="high"/></picture>}
   {prepared&&<div className="entry-native-canvas" aria-hidden="true"><IntroFrame.Provider value={{frame:(reduced?18:time)*30,fps:30,width,height:width*(mobile?4/3:9/16)}}><SummitIntro mobile={mobile}/></IntroFrame.Provider></div>}
   <div className="entry-progress" aria-hidden="true"><span style={{width:`${reduced||ended?100:Math.min(100,time/18*100)}%`}}/></div>
  </div>
  <div className="entry-toolbar"><span className="entry-chapter">{reduced?'Still preview · motion reduced':!prepared?'Loading intro':time<5?'01 / Follow the source':time<10?'02 / Compare the records':'03 / Keep the decision with finance'}<small>18 second intro · Synthetic data</small></span><div className="entry-actions"><button disabled={reduced||!prepared} onClick={()=>{if(ended){replay();return}setWanted(v=>!v)}} aria-label={ended?'Play intro again':playing?'Pause intro':'Play intro'}><Icon name={playing?'pause':'play'} size={14}/>{playing?'Pause':'Play'}</button><button disabled={reduced||!prepared} onClick={replay}><Icon name="rotate-ccw" size={14}/>Replay</button><button onClick={skip} className="entry-skip">Skip to hero <Icon name="arrow-right" size={14}/></button></div></div>
  <details className="entry-transcript"><summary>Read the intro story</summary><p>Signed agreement CT-22 includes 10,000 events per month and $0.04 per additional event. September usage shows 12,000 events. Invoice I-88 contains a $2,000 base fee and no usage overage line. The $80 candidate is unverified. The existing $40 credit has pending applicability. Finance retains the review decision; no invoice, message or system write executes.</p></details>
 </section>
}
