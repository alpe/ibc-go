"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[76430],{32218:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>a});var i=o(85893),n=o(11151);const s={title:"Troubleshooting",sidebar_label:"Troubleshooting",sidebar_position:11,slug:"/ibc/troubleshooting"},r="Troubleshooting",l={id:"ibc/troubleshooting",title:"Troubleshooting",description:"Unauthorized client states",source:"@site/versioned_docs/version-v9.0.x/01-ibc/11-troubleshooting.md",sourceDirName:"01-ibc",slug:"/ibc/troubleshooting",permalink:"/v9.0.x/ibc/troubleshooting",draft:!1,unlisted:!1,tags:[],version:"v9.0.x",sidebarPosition:11,frontMatter:{title:"Troubleshooting",sidebar_label:"Troubleshooting",sidebar_position:11,slug:"/ibc/troubleshooting"},sidebar:"defaultSidebar",previous:{title:"Roadmap",permalink:"/v9.0.x/ibc/roadmap"},next:{title:"Best Practices",permalink:"/v9.0.x/ibc/best-practices"}},c={},a=[{value:"Unauthorized client states",id:"unauthorized-client-states",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,i.jsx)(t.h2,{id:"unauthorized-client-states",children:"Unauthorized client states"}),"\n",(0,i.jsxs)(t.p,{children:["If it is being reported that a client state is unauthorized, this is due to the client type not being present\nin the ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v6.0.0/modules/core/02-client/types/client.pb.go#L345",children:(0,i.jsx)(t.code,{children:"AllowedClients"})})," array."]}),"\n",(0,i.jsxs)(t.p,{children:["Unless the client type is present in this array or the ",(0,i.jsx)(t.code,{children:"AllowAllClients"})," wildcard (",(0,i.jsx)(t.code,{children:'"*"'}),") is used, all usage of clients of this type will be prevented."]})]})}function u(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,t,o)=>{o.d(t,{Z:()=>l,a:()=>r});var i=o(67294);const n={},s=i.createContext(n);function r(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);