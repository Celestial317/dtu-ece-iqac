const fs = require("fs");
const schemaText = fs.readFileSync("src/schema.ts","utf8");
const csvLines = fs.readFileSync("Monthly data_Academic_Department_data_Updated (1).csv","utf8").split(/\r?\n/);

const s = schemaText.indexOf("SHEET_CONFIGS");
const b0 = schemaText.indexOf("{", s);
let d=0,b1=-1;
for(let i=b0;i<schemaText.length;i++){if(schemaText[i]==="{")d++; else if(schemaText[i]==="}"){d--; if(d===0){b1=i;break;}}}
const body = schemaText.slice(b0+1,b1);

const keys=[];
let i=0,depth=0,inS=false,inD=false,inT=false;
while(i<body.length){
  const ch=body[i],pr=body[i-1];
  if(!inD&&!inT&&ch==="'"&&pr!=="\\"){inS=!inS;i++;continue;}
  if(!inS&&!inT&&ch==='"'&&pr!=="\\"){inD=!inD;i++;continue;}
  if(!inS&&!inD&&ch==="`"&&pr!=="\\"){inT=!inT;i++;continue;}
  if(inS||inD||inT){i++;continue;}
  if(ch==="{"||ch==="["||ch==="("){depth++;i++;continue;}
  if(ch==="}"||ch==="]"||ch===")"){depth--;i++;continue;}
  if(depth===0){
    const m = body.slice(i).match(/^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:/);
    if(m){ const k=m[1]||m[2]||m[3]; if(!keys.includes(k)) keys.push(k); i += m[0].length; continue; }
  }
  i++;
}

const headingSet = new Set();
for (const line of csvLines) {
  if (!line.trim()) continue;
  const cells = line.split(",").map(c=>c.trim().replace(/^"|"$/g,"")).filter(Boolean);
  if (!cells.length) continue;

  const numbered = line.match(/(\d+\s*[.)]\s*[^,]+)/);
  if (numbered) {
    const clean = numbered[1].replace(/^\d+\s*[.)]\s*/, "").replace(/\s+/g," ").trim();
    if (clean.length >= 4) headingSet.add(clean);
    continue;
  }

  if (cells.length <= 2) {
    const t = cells.join(" ").replace(/\s+/g," ").replace(/:$/,"").trim();
    if (t.length >= 6 && !/^(Year|Date|Duration|Location|Programme|Program)$/i.test(t)) headingSet.add(t);
  }
}
const headings=[...headingSet];

function lev(a,b){const n=a.length,m=b.length,dp=Array.from({length:n+1},(_,r)=>Array.from({length:m+1},(_,c)=>r?c?0:c:c));for(let r=1;r<=n;r++){for(let c=1;c<=m;c++){dp[r][c]=Math.min(dp[r-1][c]+1,dp[r][c-1]+1,dp[r-1][c-1]+(a[r-1]===b[c-1]?0:1));}}return dp[n][m];}

const exact=[],caseOnly=[],maps=[];
for(const k of keys){
  const e=headings.find(h=>h===k); if(e){exact.push(k); continue;}
  const c=headings.find(h=>h.toLowerCase()===k.toLowerCase()); if(c){caseOnly.push(`${k} <-> ${c}`); continue;}
  const best=headings.map(h=>({h,d:lev(k.toLowerCase(),h.toLowerCase())})).sort((a,b)=>a.d-b.d)[0];
  maps.push(`${k} -> ${best?best.h:"(no heading found)"}`);
}

console.log("Exact matches:");
console.log(exact.length?exact.map(x=>`- ${x}`).join("\n"):"- None");
console.log("Case-only mismatches:");
console.log(caseOnly.length?caseOnly.map(x=>`- ${x}`).join("\n"):"- None");
console.log("Closest heading suggestions:");
console.log(maps.map(x=>`- ${x}`).join("\n"));
