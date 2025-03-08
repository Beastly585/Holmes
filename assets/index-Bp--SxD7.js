(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();class h{constructor(e){this.display=document.getElementById(e)}clearVisualizer(){this.display.innerHTML=""}displayByView(e,t,n){const i=`${e}-view`;switch(this.display.className="",this.display.classList.add("visualizer"),this.display.classList.add(i),e){case"home":this.populateHomeView(t);break;case"ame":this.populateAMEView(n);break;case"ima":this.populateIMAView();break;case"help":this.populateHelpView();break;default:console.error(`Unknown view: ${i}`)}}populateHomeView(e){const t=this.createGridObject(6);let i=this.mainTitle("The Home of Pepco Reliability"),a="Welcome to the AME and IMA Home of Pepco Reliability.",r="We are the inquisitive eye that sees beyond the outage. Our mission is to preserve and correct data, ensuring accuracy and reliability.",s="Following through with outage investigations, corrective actions, and stakeholder engagement.",o=this.createParagraph(a),c=this.createParagraph(r),d=this.createParagraph(s);t.appendChild(i),t.appendChild(o),t.appendChild(c),t.appendChild(d)}populateAMEView(e){const t=this.createGridObject(6);let i=this.mainTitle("AME Home"),r=this.createParagraph("Welcome! Use the filters below to review outage data.");t.appendChild(i),t.appendChild(r);let s=this.vertList("AME-dataview");t.appendChild(s);for(let o in e){let c=e[o],d=this.eventCard(c);s.appendChild(d)}}createGridObject(e,t,n=null,i=null){const a=document.createElement("div");return a.classList.add("grid-object"),a.style.gridColumnEnd=`span ${e}`,a.style.gridRowEnd=`span ${t}`,n!==null&&(a.style.gridColumnStart=n),i!==null&&(a.style.gridRowStart=i),this.display.appendChild(a),a}vertCont(e){let t=document.createElement("div");return t.classList.add("vert-container"),e&&(t.style.maxWidth=`${e}%`),classes.length>0&&t.classList.add(...classes),t}hztCont(e,...t){let n=document.createElement("div");return n.classList.add("hzt-container"),e&&(n.style.maxWidth=`${e}%`),t.length>0&&n.classList.add(...t),n}vertList(...e){const t=document.createElement("div");return t.classList.add("vertical-list"),e.length>0&&t.classList.add(...e),t}mainTitle(e,...t){return this.createElementWithText("h1",e,"main-title",...t)}createSecTitle(e,...t){return this.createElementWithText("h2",e,"secondary-title",...t)}createParagraph(e,...t){return this.createElementWithText("p",e,"paragraph",...t)}createElementWithText(e,t,...n){const i=document.createElement(e);return i.textContent=t,i.classList.add(...n),i}actionButton(e,t){const n=document.createElement("button");return n.classList.add("action-button",`${e}-button`),n.innerHTML=`${e}`,n.addEventListener("click",t),n}eventCard(e){return this.hztCont(100,"event-card")}altEventCard(e){}fileUploadButton(e,t){const n=document.createElement("div");n.classList.add("file-upload-container");const i=document.createElement("input");i.type="file",i.id=e,i.style.display="none";const a=document.createElement("button");return a.classList.add("file-upload-button"),a.innerHTML="Upload File",a.addEventListener("click",()=>{i.click()}),i.addEventListener("change",t),n.appendChild(i),n.appendChild(a),n}}let u={},p={};document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector(".main-nav-container"),e=new h("visualizer"),t=document.querySelector(".expander-row");e.displayByView("home"),l.addEventListener("click",i=>{const a=i.target,r=a.closest(".nav-section-row");if(r&&!a.classList.contains("expander")){console.log("what did i click?",a.classList),document.querySelectorAll(".nav-section-row").forEach(o=>{o.classList.remove("active")}),r.classList.add("active");let s="";r.querySelector(".home-icon")?(s="home",e.clearVisualizer(),e.displayByView(s,p,u)):r.querySelector(".ame-icon")?(s="ame",e.clearVisualizer(),e.displayByView(s,p,u)):r.querySelector(".ima-icon")?(s="ima",console.log(s)):r.querySelector(".help-icon")&&(s="help",console.log(s))}}),document.querySelectorAll(".nav-section-row").forEach(i=>{i.addEventListener("click",a=>{a.target.classList.contains("nav-row-expand")&&i.closest(".nav-section-container").querySelectorAll(".nav-section-row").forEach(o=>{o.classList.toggle("expanded")})})}),t.addEventListener("mouseenter",()=>{l.classList.add("expanded")}),l.addEventListener("mouseleave",()=>{l.classList.remove("expanded")})});
