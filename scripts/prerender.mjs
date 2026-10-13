import fs from 'node:fs/promises';
import path from 'node:path';
import {render} from '../server-build/server.js';
const pages=JSON.parse(await fs.readFile('src/registry.json','utf8'));
const shell=await fs.readFile('dist/index.html','utf8');
const origin='https://earnedline-evidence.artfullarch32.chatgpt.site';
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const p of pages){
 const title=p.id==='home'?'EarnedLine — Contract-to-invoice review':p.title.replace(/\.$/,'')+' | EarnedLine';
 const description=p.description+' Research-stage concept. All product examples use synthetic data.';
 let html=shell.replace('<div id="root"></div>',`<div id="root">${render(p.route)}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${escape(description)}">`);
 html=html.replace('</head>',`<meta name="robots" content="noindex, nofollow"><link rel="canonical" href="${origin+p.route}"><meta property="og:type" content="website"><meta property="og:site_name" content="EarnedLine"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${origin+p.route}"><meta property="og:image" content="${origin}/brand/visuals/social-preview.png"><meta name="twitter:card" content="summary_large_image"></head>`);
 const target=p.route==='/'?'dist/index.html':'dist'+p.route+'/index.html';await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,html);
 if(p.route!=='/')await fs.writeFile('dist'+p.route+'.html',html);
 if(p.id==='404')await fs.writeFile('dist/404.html',html);
}
await fs.writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.filter(p=>!['404','success','signin'].includes(p.id)).map(p=>'<url><loc>'+origin+p.route+'</loc></url>').join('')+'</urlset>');
console.log('Pre-rendered '+pages.length+' complete routes, metadata and a404 fallback.');
