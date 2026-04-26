const fs = require('fs');

const schemaPath = 'src/schema.ts';
const csvPath = 'Monthly data_Academic_Department_data_Updated (1).csv';

const schemaText = fs.readFileSync(schemaPath, 'utf8');
const start = schemaText.indexOf('SHEET_CONFIGS');
const braceStart = schemaText.indexOf('{', start);
let dep = 0, end = -1;
for (let i = braceStart; i < schemaText.length; i++) { const ch = schemaText[i]; if (ch === '{') dep++; else if (ch === '}') { dep--; if (dep === 0) { end = i; break; } } }
const body = schemaText.slice(braceStart + 1, end);

const keys = [];
let i = 0, d = 0;
let s=false, q=false, t=false, lc=false, bc=false;
const ws = c => /[\s,]/.test(c || '');
while (i < body.length) {
  const ch = body[i], nx = body[i+1];
  if (lc) { if (ch === '\n') lc=false; i++; continue; }
  if (bc) { if (ch === '*' && nx === '/') { bc=false; i+=2; continue; } i++; continue; }
  if (!s && !q && !t && ch === '/' && nx === '/') { lc=true; i+=2; continue; }
  if (!s && !q && !t && ch === '/' && nx === '*') { bc=true; i+=2; continue; }
  if (!q && !t && ch === "'" && body[i-1] !== '\\') { s=!s; i++; continue; }
  if (!s && !t && ch === '"' && body[i-1] !== '\\') { q=!q; i++; continue; }
  if (!s && !q && ch === '`' && body[i-1] !== '\\') { t=!t; i++; continue; }
  if (s || q || t) { i++; continue; }
  if (ch === '{' || ch === '[' || ch === '(') { d++; i++; continue; }
  if (ch === '}' || ch === ']' || ch === ')') { d--; i++; continue; }
  if (d === 0) {
    let j=i; while (ws(body[j])) j++;
    let key=null, kEnd=j;
    if (body[j] === '"' || body[j] === "'") { const qq = body[j++]; let out=''; while (j < body.length && body[j] !== qq) { if (body[j] === '\\') { j+=2; continue; } out += body[j++]; } if (body[j]===qq) { kEnd=++j; while (/\s/.test(body[kEnd]||'')) kEnd++; if (body[kEnd] === ':') key=out; } }
    else { const m = body.slice(j).match(/^([A-Za-z_$][\w$]*)\s*:/); if (m) { key=m[1]; kEnd = j + m[0].length - 1; } }
    if (key) { if (!keys.includes(key)) keys.push(key); i = kEnd + 1; continue; }
  }
  i++;
}

const lines = fs.readFileSync(csvPath,'utf8').split(/\r?\n/);
const headingSet = new Set();
for (const line of lines) {
  const cells = line.split(',').map(c => c.trim().replace(/^"|"$/g,'')).filter(Boolean);
  if (!cells.length) continue;
  for (const raw of cells) {
    const txt = raw.replace(/\s+/g,' ').trim();
    if (!txt) continue;
    const num = txt.match(/^(\d+)\s*[.)]\s*(.+)$/);
    if (num) { headingSet.add(num[2].trim()); continue; }
    if ((cells.length <= 2 && txt.length >= 5) || /^[A-Z][A-Za-z\s/&()'\-]{5,}:?$/.test(txt)) {
      if (!/^S\.?\s*No\.?$/i.test(txt) && !/^Year$/i.test(txt)) headingSet.add(txt.replace(/:$/,''));
    }
  }
}
const headings = [...headingSet];

const lev = (a,b) => { const n=a.length,m=b.length; const dp=Array.from({length:n+1},(_,r)=>Array.from({length:m+1},(_,c)=>r?c?0:c:c)); for(let r=1;r<=n;r++) for(let c=1;c<=m;c++) dp[r][c]=Math.min(dp[r-1][c]+1,dp[r][c-1]+1,dp[r-1][c-1]+(a[r-1]===b[c-1]?0:1)); return dp[n][m]; };

const exact=[]; const caseOnly=[]; const maps=[];
for (const k of keys) {
  const e = headings.find(h => h === k);
  if (e) { exact.push(`${k}`); continue; }
  const c = headings.find(h => h.toLowerCase() === k.toLowerCase());
  if (c) { caseOnly.push(`${k} <-> ${c}`); continue; }
  const best = headings.map(h=>({h,d:lev(k.toLowerCase(),h.toLowerCase())})).sort((a,b)=>a.d-b.d||a.h.localeCompare(b.h))[0];
  maps.push(`${k} -> ${best ? best.h : 'No heading detected'}`);
}

console.log(`keys=${keys.length}, headingCandidates=${headings.length}`);
console.log('Exact matches:');
console.log(exact.length ? exact.map(x=>`- ${x}`).join('\n') : '- None');
console.log('Case-only mismatches:');
console.log(caseOnly.length ? caseOnly.map(x=>`- ${x}`).join('\n') : '- None');
console.log('Suggested mappings:');
console.log(maps.map(x=>`- ${x}`).join('\n'));
