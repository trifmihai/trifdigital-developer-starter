"use strict";(()=>{var r=(e=document)=>{let o="Last Published:";for(let t of e.childNodes)if(t.nodeType===Node.COMMENT_NODE&&t.textContent?.includes(o)){let n=t.textContent.trim().split(o)[1];if(n)return new Date(n)}};var s=e=>{let o=r();console.log(`Hello ${e}!`),console.log(`This site was last published on ${o?.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"2-digit"})}.`)};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{s("Mike"),document.body.style.backgroundColor="red"});})();
