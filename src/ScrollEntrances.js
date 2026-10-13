import {useEffect} from 'react';

// Replay nonessential entrances on viewport re-entry, without hiding base content
// or changing native scrolling, layout, focus, or product decisions.
export function useScrollEntrances(route){
  useEffect(()=>{
    const main=document.getElementById('main');
    if(!main||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
    const media=matchMedia('(prefers-reduced-motion:reduce)');
    const items=new Map();let lastY=scrollY,direction='down',raf=0;
    const reduced=()=>media.matches||document.documentElement.classList.contains('motion-reduced');
    const stop=()=>items.forEach(state=>{state.animation?.cancel();state.animation=null;});
    const preference=()=>{if(reduced())stop();};
    const onScroll=()=>{const next=scrollY;if(Math.abs(next-lastY)>2)direction=next>lastY?'down':'up';lastY=next;};
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const state=items.get(entry.target);if(!state)return;
        if(!state.primed){state.primed=true;if(entry.isIntersecting){state.inside=true;return;}}
        if(!entry.isIntersecting){state.inside=false;state.animation?.cancel();state.animation=null;return;}
        if(state.inside)return;state.inside=true;
        if(reduced()||document.hidden||entry.target.contains(document.activeElement))return;
        state.animation?.cancel();
        const distance=innerWidth<=600?24:48;
        const side=state.side*(direction==='up'?-1:1);
        const order=direction==='up'?state.total-1-state.index:state.index;
        entry.target.dataset.entranceRuns=String(Number(entry.target.dataset.entranceRuns||0)+1);
        entry.target.dataset.entranceDirection=direction;
        state.animation=entry.target.animate([
          {translate:`${side*distance}px 0px`,opacity:.4},
          {translate:'0px 0px',opacity:1}
        ],{duration:680,delay:Math.min(order*85,425),easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
        state.animation.onfinish=()=>{state.animation=null;};
      });
    },{rootMargin:'-85px 0px -5% 0px',threshold:0});
    raf=requestAnimationFrame(()=>{
      const sections=main.querySelectorAll('.narrative-section,.page-hero,.proof-strip,.controls-preview,.pricing-section,.resources-section,.faq-section,.related-modules,.final-cta,.intake-section,.signin-page,.legal-hero,.legal-layout,.receipt-hero,.not-found,.workflow-section');
      sections.forEach((section,chapter)=>{
        if(section.closest('.module-scroll-stage,.scroll-review-stage,.workbench'))return;
        const targets=[...section.querySelectorAll('.narrative-copy>*,.page-hero-copy>*,.section-heading>div>*,.section-heading>p,.control-grid>.control-flip,.pricing-layout>div:first-child>*,.pricing-card,.resource-grid>.resource-card,.faq-intro>*,.faq-list>details,.related-modules>div>a,.workflow-path>div,.workflow-gate,.intake-context>h2,.intake-context>p,.intake-context>.eyebrow,.signin-art>h1,.signin-art>p,.signin-art>.eyebrow,.legal-layout article>section')];
        if(section.matches('.proof-strip'))targets.push(...section.children);
        if(section.matches('.final-cta,.legal-hero,.receipt-hero,.not-found'))targets.push(...section.querySelectorAll(':scope>.container>*,:scope>h1,:scope>p,:scope>.eyebrow,:scope>.row'));
        if(section.matches('.related-modules'))targets.push(...section.querySelectorAll(':scope>.eyebrow,:scope>h2'));
        section.querySelectorAll('.exhibit').forEach(figure=>{
          if(figure.closest('.resource-card')||figure.querySelector('.source-sequence,.revenue-path-sequence,.guide-sequence'))return;
          const pieces=figure.querySelectorAll('.v-step,.bundle-sheet,.v-role,.v-substitutes>div,.v-atlas-cell,.v-decision-pair>.v-paper,.sample-source');
          if(pieces.length)targets.push(...pieces);else targets.push(figure);
        });
        const unique=[...new Set(targets)].filter(e=>!e.closest('.module-scroll-stage,.scroll-review-stage,.workbench')&&!items.has(e));
        // Animate a card or figure as a unit, never both it and a nested child.
        const units=unique.filter(e=>!unique.some(parent=>parent!==e&&parent.contains(e)));
        units.sort((a,b)=>(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1);
        units.forEach((element,index)=>{
          element.classList.add('scroll-entrance-item');
          element.dataset.entranceSide=(index+chapter)%2?'right':'left';
          items.set(element,{index,total:units.length,side:(index+chapter)%2?1:-1,primed:false,inside:false,animation:null});
          observer.observe(element);
        });
      });
    });
    const focus=e=>{for(const [element,state] of items)if(element===e.target||element.contains(e.target)){state.animation?.cancel();state.animation=null;}};
    const hidden=()=>{if(document.hidden)stop();};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('earnedline-motion',preference);
    media.addEventListener('change',preference);
    main.addEventListener('focusin',focus);
    document.addEventListener('visibilitychange',hidden);
    return()=>{cancelAnimationFrame(raf);observer.disconnect();stop();window.removeEventListener('scroll',onScroll);window.removeEventListener('earnedline-motion',preference);media.removeEventListener('change',preference);main.removeEventListener('focusin',focus);document.removeEventListener('visibilitychange',hidden);items.forEach((_,el)=>{el.classList.remove('scroll-entrance-item');delete el.dataset.entranceSide;});};
  },[route]);
}
