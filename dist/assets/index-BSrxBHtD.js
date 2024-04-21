(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const i of d.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(o){if(o.ep)return;o.ep=!0;const d=t(o);fetch(o.href,d)}})();function G(n){function e(i,c){const u=n[i];return u===void 0?!1:u.userAssignedRole===c}function t(i,c){const u=n[i];return u===void 0?!1:u.userInheritedRolesPlusCurrentRole.includes(c)}function a(i,c){const u=n[i];return u===void 0?!1:u.userPermissions.includes(c)}function o(i,c){const u=n[i];return u===void 0?!1:c.every(f=>u.userPermissions.includes(f))}function d(i){return{isRole(c){return e(i,c)},isAtLeastRole(c){return t(i,c)},hasPermission(c){return a(i,c)},hasAllPermissions(c){return o(i,c)}}}return{isRole:e,isAtLeastRole:t,hasPermission:a,hasAllPermissions:o,getAccessHelperWithOrgId:d}}function z(n){return{getOrg(e){if(n.hasOwnProperty(e))return n[e]},getOrgIds(){return Object.keys(n)},getOrgs(){return Object.values(n)},getOrgByName(e){for(const t of Object.values(n))if(t.orgName===e||t.urlSafeOrgName===e)return t}}}class j{constructor(e,t){this.userId=e.userId,this.orgIdToUserOrgInfo=t,this.email=e.email,this.firstName=e.firstName,this.lastName=e.lastName,this.username=e.username,this.createdAt=e.createdAt,this.pictureUrl=e.pictureUrl,this.hasPassword=e.hasPassword,this.hasMfaEnabled=e.hasMfaEnabled,this.canCreateOrgs=e.canCreateOrgs,this.legacyUserId=e.legacyUserId,this.impersonatorUserId=e.impersonatorUserId,this.properties=e.properties}getOrg(e){if(this.orgIdToUserOrgInfo)return this.orgIdToUserOrgInfo[e]}getOrgByName(e){if(!this.orgIdToUserOrgInfo)return;const t=e.toLowerCase().replace(/ /g,"-");for(const a in this.orgIdToUserOrgInfo){const o=this.orgIdToUserOrgInfo[a];if((o==null?void 0:o.urlSafeOrgName)===t)return o}}getUserProperty(e){if(this.properties)return this.properties[e]}getOrgs(){return this.orgIdToUserOrgInfo?Object.values(this.orgIdToUserOrgInfo):[]}isImpersonating(){return!!this.impersonatorUserId}isRole(e,t){const a=this.getOrg(e);return a?a.isRole(t):!1}isAtLeastRole(e,t){const a=this.getOrg(e);return a?a.isAtLeastRole(t):!1}hasPermission(e,t){const a=this.getOrg(e);return a?a.hasPermission(t):!1}hasAllPermissions(e,t){const a=this.getOrg(e);return a?a.hasAllPermissions(t):!1}static fromJSON(e){const t=JSON.parse(e),a={};for(const o in t.orgIdToUserOrgInfo)a[o]=_.fromJSON(JSON.stringify(t.orgIdToUserOrgInfo[o]));try{return new j({userId:t.userId,email:t.email,createdAt:t.createdAt,firstName:t.firstName,lastName:t.lastName,username:t.username,legacyUserId:t.legacyUserId,impersonatorUserId:t.impersonatorUserId,properties:t.properties,pictureUrl:t.pictureUrl,hasPassword:t.hasPassword,hasMfaEnabled:t.hasMfaEnabled,canCreateOrgs:t.canCreateOrgs},a)}catch(o){throw console.error("Unable to parse User. Make sure the JSON string is a stringified `UserClass` type.",o),o}}}class _{constructor(e,t,a,o,d,i,c){this.orgId=e,this.orgName=t,this.orgMetadata=a,this.urlSafeOrgName=o,this.userAssignedRole=d,this.userInheritedRolesPlusCurrentRole=i,this.userPermissions=c}isRole(e){return this.userAssignedRole===e}isAtLeastRole(e){return this.userInheritedRolesPlusCurrentRole.includes(e)}hasPermission(e){return this.userPermissions.includes(e)}hasAllPermissions(e){return e.every(t=>this.hasPermission(t))}static fromJSON(e){const t=JSON.parse(e);try{return new _(t.orgId,t.orgName,t.orgMetadata,t.urlSafeOrgName,t.userAssignedRole,t.userInheritedRolesPlusCurrentRole,t.userPermissions)}catch(a){throw console.error("Unable to parse UserOrgInfo. Make sure the JSON string is a stringified `UserOrgInfo` type.",a),a}}}function K(n){if(n===void 0)return;const e={};for(const t of Object.values(n))e[t.orgId]=new _(t.orgId,t.orgName,t.orgMetadata,t.urlSafeOrgName,t.userAssignedRole,t.userInheritedRolesPlusCurrentRole,t.userPermissions);return e}function Q(n){return fetch(`${n}/api/v1/refresh_token`,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}}).then(e=>e.status===401?null:e.status===0?(x(),Promise.reject({status:503,message:"Unable to process authentication response"})):e.ok?F(e):Promise.reject({status:e.status,message:e.statusText}))}function Y(n){return fetch(`${n}/api/v1/logout`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"}}).then(e=>e.status===0?(x(),Promise.reject({status:503,message:"Unable to process authentication response"})):e.ok?e.json():(console.error("Logout error",e.status,e.statusText),Promise.reject({status:e.status,message:e.statusText})))}function F(n){return n.text().then(e=>{try{const t=X(e);return V(t)}catch(t){return console.error("Unable to process authentication response",t),Promise.reject({status:500,message:"Unable to process authentication response"})}},e=>(console.error("Unable to process authentication response",e),Promise.reject({status:500,message:"Unable to process authentication response"})))}function X(n){return JSON.parse(n,function(e,t){if(e==="org_id")this.orgId=t;else if(e==="org_name")this.orgName=t;else if(e==="org_metadata")this.orgMetadata=t;else if(e==="url_safe_org_name")this.urlSafeOrgName=t;else if(e==="user_role")this.userAssignedRole=t;else if(e==="inherited_user_roles_plus_current_role")this.userInheritedRolesPlusCurrentRole=t;else if(e==="user_permissions")this.userPermissions=t;else if(e==="access_token")this.accessToken=t;else if(e==="expires_at_seconds")this.expiresAtSeconds=t;else if(e==="org_id_to_org_member_info")this.orgIdToOrgMemberInfo=t;else if(e==="user_id")this.userId=t;else if(e==="email_confirmed")this.emailConfirmed=t;else if(e==="first_name")this.firstName=t;else if(e==="last_name")this.lastName=t;else if(e==="picture_url")this.pictureUrl=t;else if(e==="mfa_enabled")this.mfaEnabled=t;else if(e==="has_password")this.hasPassword=t;else if(e==="can_create_orgs")this.canCreateOrgs=t;else if(e==="created_at")this.createdAt=t;else if(e==="last_active_at")this.lastActiveAt=t;else if(e==="legacy_user_id")this.legacyUserId=t;else if(e==="impersonator_user")this.impersonatorUserId=t;else return t})}function V(n){return n.orgIdToOrgMemberInfo&&(n.orgHelper=z(n.orgIdToOrgMemberInfo),n.accessHelper=G(n.orgIdToOrgMemberInfo)),n.userClass=new j({userId:n.user.userId,email:n.user.email,createdAt:n.user.createdAt,firstName:n.user.firstName,lastName:n.user.lastName,username:n.user.username,properties:n.user.properties,pictureUrl:n.user.pictureUrl,hasPassword:n.user.hasPassword,hasMfaEnabled:n.user.mfaEnabled,canCreateOrgs:n.user.canCreateOrgs,legacyUserId:n.user.legacyUserId,impersonatorUserId:n.impersonatorUserId},K(n.orgIdToOrgMemberInfo)),Promise.resolve(n)}function x(){console.error(`Request to PropelAuth failed due to a CORS error. There are a few likely causes: 
 1. In the Frontend Integration section of your dashboard, make sure your requests are coming either the specified Application URL or localhost with a matching port.
 2. Make sure your server is hosted on HTTPS in production.`)}function T(){return Date.now()/1e3}function R(){return typeof localStorage<"u"}function Z(){return typeof window<"u"}function E(n){if(!R())return null;const e=localStorage.getItem(n);if(!e)return null;const t=parseInt(e,10);return Number.isNaN(t)?null:t}const k="__PROPEL_AUTH_LOGGED_IN_AT",M="__PROPEL_AUTH_LOGGED_OUT_AT",W=10*60,ee=60,b=n=>(window?window.btoa:btoa)(n);function te(n){try{const e=new URL(n.authUrl);n.authUrl=e.origin}catch(e){throw console.error("Invalid authUrl",e),new Error("Unable to initialize auth client")}n.enableBackgroundTokenRefresh===void 0&&(n.enableBackgroundTokenRefresh=!0)}function re(n){te(n);const e={initialLoadFinished:!1,authenticationInfo:null,observers:[],accessTokenObservers:[],lastLoggedInAtMessage:E(k),lastLoggedOutAtMessage:E(M),authUrl:n.authUrl,refreshInterval:null,lastRefresh:null};function t(r){for(let s=0;s<e.observers.length;s++){const l=e.observers[s];l&&l(r)}}function a(r){for(let s=0;s<e.accessTokenObservers.length;s++){const l=e.accessTokenObservers[s];l&&l(r)}}function o(r,s){return!r&&(s||!e.initialLoadFinished)}function d(r,s){return!s&&r}function i(){const r=T();e.lastLoggedOutAtMessage=r,R()&&localStorage.setItem(M,String(r))}function c(){const r=T();e.lastLoggedInAtMessage=r,R()&&localStorage.setItem(k,String(r))}function u(r){var s;const l=(s=e.authenticationInfo)===null||s===void 0?void 0:s.accessToken;e.authenticationInfo=r;const g=r==null?void 0:r.accessToken;o(g,l)?(t(!1),i()):d(g,l)&&(t(!0),c()),l!==g&&a(g),e.lastRefresh=T(),e.initialLoadFinished=!0}async function f(r){try{const s=await Q(e.authUrl);return u(s),s}catch(s){if(r)return e.authenticationInfo;throw u(null),s}}const m=r=>{let s=new URLSearchParams,l=`${e.authUrl}/signup`;if(r){const{postSignupRedirectUrl:g,userSignupQueryParameters:C}=r;g&&s.set("rt",b(g)),C&&Object.entries(C).forEach(([N,B])=>{s.set(N,B)})}return s.toString()&&(l+=`?${s.toString()}`),l},p=r=>{let s=new URLSearchParams,l=`${e.authUrl}/login`;if(r){const{postLoginRedirectUrl:g,userSignupQueryParameters:C}=r;g&&s.set("rt",b(g)),C&&Object.entries(C).forEach(([N,B])=>{s.set(N,B)})}return s.toString()&&(l+=`?${s.toString()}`),l},O=r=>{let s=new URLSearchParams,l=`${e.authUrl}/account`;if(r){const{redirectBackToUrl:g}=r;g&&s.set("rt",b(g))}return s.toString()&&(l+=`?${s.toString()}`),l},I=(r,s)=>{let l=new URLSearchParams,g=`${e.authUrl}/org`;return r&&l.set("id",r),s&&s.redirectBackToUrl&&l.set("rt",b(s.redirectBackToUrl)),l.toString()&&(g+=`?${l.toString()}`),g},y=r=>{let s=new URLSearchParams,l=`${e.authUrl}/create_org`;if(r){const{redirectBackToUrl:g}=r;g&&s.set("rt",b(g))}return s.toString()&&(l+=`?${s.toString()}`),l},P=(r,s)=>{let l=new URLSearchParams;return s&&s.redirectBackToUrl&&l.set("rt",b(s.redirectBackToUrl)),l.set("id",r),`${e.authUrl}/saml?${l.toString()}`},h={addLoggedInChangeObserver(r){e.observers.includes(r)?console.error("Observer has been attached already."):r?e.observers.push(r):console.error("Cannot add a null observer")},removeLoggedInChangeObserver(r){const s=e.observers.indexOf(r);s===-1?console.error("Cannot find observer to remove"):e.observers.splice(s,1)},addAccessTokenChangeObserver(r){e.accessTokenObservers.includes(r)?console.error("Observer has been attached already."):r?e.accessTokenObservers.push(r):console.error("Cannot add a null observer")},removeAccessTokenChangeObserver(r){const s=e.accessTokenObservers.indexOf(r);s===-1?console.error("Cannot find observer to remove"):e.accessTokenObservers.splice(s,1)},async getAuthenticationInfoOrNull(r){const s=T();if(r)return await f(!1);if(e.authenticationInfo)if(s+W>e.authenticationInfo.expiresAtSeconds){const l=s<e.authenticationInfo.expiresAtSeconds;return await f(l)}else return e.authenticationInfo;else return await f(!1)},getSignupPageUrl(r){return m(r)},getLoginPageUrl(r){return p(r)},getAccountPageUrl(r){return O(r)},getOrgPageUrl(r,s){return I(r,s)},getCreateOrgPageUrl(r){return y(r)},getSetupSAMLPageUrl(r,s){return P(r,s)},redirectToSignupPage(r){window.location.href=m(r)},redirectToLoginPage(r){window.location.href=p(r)},redirectToAccountPage(r){window.location.href=O(r)},redirectToOrgPage(r,s){window.location.href=I(r,s)},redirectToCreateOrgPage(r){window.location.href=y(r)},redirectToSetupSAMLPage(r,s){window.location.href=P(r,s)},async logout(r){const s=await Y(e.authUrl);u(null),r&&(window.location.href=s.redirect_to)},destroy(){e.observers=[],e.accessTokenObservers=[],window.removeEventListener("storage",v),e.refreshInterval&&clearInterval(e.refreshInterval)}},v=async function(){if(!R())return;const r=E(M),s=E(k);r&&(!e.lastLoggedOutAtMessage||r>e.lastLoggedOutAtMessage)&&(e.lastLoggedOutAtMessage=r,e.authenticationInfo&&await f(!0)),s&&(!e.lastLoggedInAtMessage||s>e.lastLoggedInAtMessage)&&(e.lastLoggedInAtMessage=s,e.authenticationInfo||await f(!0))},U=async function(){e.lastRefresh&&T()>e.lastRefresh+ee?await f(!0):await h.getAuthenticationInfoOrNull()};return Z()&&(window.addEventListener("storage",v),window.addEventListener("online",U),window.addEventListener("focus",U),n.enableBackgroundTokenRefresh&&(h.getAuthenticationInfoOrNull(),e.refreshInterval=window.setInterval(h.getAuthenticationInfoOrNull,6e4))),h}/*! js-cookie v3.0.5 | MIT */function L(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var a in t)n[a]=t[a]}return n}var ne={read:function(n){return n[0]==='"'&&(n=n.slice(1,-1)),n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(n){return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function D(n,e){function t(o,d,i){if(!(typeof document>"u")){i=L({},e,i),typeof i.expires=="number"&&(i.expires=new Date(Date.now()+i.expires*864e5)),i.expires&&(i.expires=i.expires.toUTCString()),o=encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,i[u]!==!0&&(c+="="+i[u].split(";")[0]));return document.cookie=o+"="+n.write(d,o)+c}}function a(o){if(!(typeof document>"u"||arguments.length&&!o)){for(var d=document.cookie?document.cookie.split("; "):[],i={},c=0;c<d.length;c++){var u=d[c].split("="),f=u.slice(1).join("=");try{var m=decodeURIComponent(u[0]);if(i[m]=n.read(f,m),o===m)break}catch{}}return o?i[o]:i}}return Object.create({set:t,get:a,remove:function(o,d){t(o,"",L({},d,{expires:-1}))},withAttributes:function(o){return D(this.converter,L({},this.attributes,o))},withConverter:function(o){return D(L({},this.converter,o),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(n)}})}D(ne,{path:"/"});const S=re({authUrl:"https://95971036530.propelauthtest.com",enableBackgroundTokenRefresh:!0});let $="http://ec2-18-188-148-3.us-east-2.compute.amazonaws.com";const w=document.getElementById("make-posts");document.getElementById("post-container");const H=document.getElementById("modal-overlay"),J=document.getElementById("close-popup"),se=document.getElementById("popup-title"),A=document.getElementById("section-name");document.querySelector(".sidebar");let q="";document.getElementById("signup").onclick=S.redirectToSignupPage;document.getElementById("login").onclick=S.redirectToLoginPage;document.getElementById("username").onclick=S.redirectToAccountPage;document.getElementById("logout").onclick=S.logout;S.addLoggedInChangeObserver(n=>{n?(document.getElementById("display-when-logged-in").style.display="revert",document.getElementById("display-when-logged-out").style.display="none",A.textContent==="Welcome"?w.style.display="none":w.style.display="inline-block",S.getAuthenticationInfoOrNull().then(e=>{var t,a;document.getElementById("username").innerHTML=(t=e==null?void 0:e.user)==null?void 0:t.username,q=(a=e==null?void 0:e.user)==null?void 0:a.username})):(document.getElementById("display-when-logged-in").style.display="none",document.getElementById("display-when-logged-out").style.display="revert",w.style.display="none")});const oe=()=>{H.style.display="none"},ie=()=>{H.style.display="flex",se.innerHTML=`Make post to: ${A.textContent}`;const n=document.getElementById("department-select");A.textContent==="Department"?n.style.display="inline-block":n.style.display="none"};w.addEventListener("click",ie);J.addEventListener("click",oe);document.addEventListener("DOMContentLoaded",function(){const n=document.querySelectorAll(".sidebar ul li a");document.querySelector("#umd-bulletin").addEventListener("click",function(i){const c="Welcome";document.getElementById("section-name").textContent=c,w.style.display="none",document.title=c+" - UMD Bulletin"}),n.forEach(i=>{i.addEventListener("click",function(c){if(this.textContent!=="Logout"){c.preventDefault();const u=this.textContent;document.getElementById("section-name").textContent=u,w.style.display="inline-block",document.title=u+" - UMD Bulletin";let f=new Event("click");document.getElementById("search-button").dispatchEvent(f)}})}),document.getElementById("search-button").addEventListener("click",function(i){i.preventDefault();const c=document.getElementById("search-input"),u=document.getElementById("search-results"),f=document.getElementById("section-name"),m=c.value,p=f.textContent;function O(P){console.log(P),fetch(P,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json"}}).then(h=>h.json()).then(h=>{u.innerHTML="",h.reverse(),h.forEach(v=>{const U=document.createElement("div");U.className="post-box";const r=document.createElement("h3");r.textContent=v.title,U.appendChild(r);const s=document.createElement("p");if(s.textContent=`Author: ${v.author}`,U.appendChild(s),p=="Department"){const g=document.createElement("p");g.textContent=`Department: ${v.tab}`,U.appendChild(g)}const l=document.createElement("p");l.textContent=`Description: ${v.description}`,U.appendChild(l),u.appendChild(U)})}).catch(h=>console.error("Error fetching posts:",h))}let I=$,y=`search=${encodeURIComponent(m)}`;m===""&&(y=""),p=="Department"?I+="/posts/department?"+y:p=="Selling"?I+="/posts/selling?"+y:p=="Clubs"?I+="/posts/clubs?"+y:I+="/posts?"+y,O(I)});const t=document.getElementById("make-post-button"),a=document.getElementById("department-select"),o=document.getElementById("section-name");console.log(o),t.addEventListener("click",function(i){i.preventDefault();let c=A.textContent;o.textContent==="Department"&&(c=a.value);const u=document.getElementById("title-input").value,f=document.getElementById("description").value,m={title:u,author:q,description:f,tab:c};console.log(m),fetch($+"/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}).then(O=>O.json()).then(O=>{console.log("Success:",O);let I=new Event("click");J.dispatchEvent(I)}).catch(O=>{console.error("Error:",O)});let p=new Event("click");document.getElementById("search-button").dispatchEvent(p)});let d=new Event("click");document.getElementById("search-button").dispatchEvent(d)});
