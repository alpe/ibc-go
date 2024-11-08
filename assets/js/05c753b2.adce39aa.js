"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[81123],{63636:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var n=i(85893),s=i(11151);const o={title:"Overview",sidebar_label:"Overview",sidebar_position:1,slug:"/middleware/ics29-fee/overview"},a="Overview",r={id:"middleware/ics29-fee/overview",title:"Overview",description:"Learn about what the Fee Middleware module is, and how to build custom modules that utilize the Fee Middleware functionality",source:"@site/versioned_docs/version-v9.0.x/04-middleware/01-ics29-fee/01-overview.md",sourceDirName:"04-middleware/01-ics29-fee",slug:"/middleware/ics29-fee/overview",permalink:"/v9.0.x/middleware/ics29-fee/overview",draft:!1,unlisted:!1,tags:[],version:"v9.0.x",sidebarPosition:1,frontMatter:{title:"Overview",sidebar_label:"Overview",sidebar_position:1,slug:"/middleware/ics29-fee/overview"},sidebar:"defaultSidebar",previous:{title:"Overview",permalink:"/v9.0.x/ibc/light-clients/tendermint/overview"},next:{title:"Integration",permalink:"/v9.0.x/middleware/ics29-fee/integration"}},c={},d=[{value:"What is the Fee Middleware module?",id:"what-is-the-fee-middleware-module",level:2},{value:"Concepts",id:"concepts",level:2},{value:"Known Limitations",id:"known-limitations",level:2}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"overview",children:"Overview"}),"\n",(0,n.jsx)(t.admonition,{title:"Synopsis",type:"note",children:(0,n.jsx)(t.p,{children:"Learn about what the Fee Middleware module is, and how to build custom modules that utilize the Fee Middleware functionality"})}),"\n",(0,n.jsx)(t.h2,{id:"what-is-the-fee-middleware-module",children:"What is the Fee Middleware module?"}),"\n",(0,n.jsx)(t.p,{children:"IBC does not depend on relayer operators for transaction verification. However, the relayer infrastructure ensures liveness of the Interchain network \u2014 operators listen for packets sent through channels opened between chains, and perform the vital service of ferrying these packets (and proof of the transaction on the sending chain/receipt on the receiving chain) to the clients on each side of the channel."}),"\n",(0,n.jsxs)(t.p,{children:["Though relaying is permissionless and completely decentralized and accessible, it does come with operational costs. Running full nodes to query transaction proofs and paying for transaction fees associated with IBC packets are two of the primary cost burdens which have driven the overall discussion on ",(0,n.jsx)(t.strong,{children:"a general, in-protocol incentivization mechanism for relayers"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Initially, a ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc/pull/577/files",children:"simple proposal"})," was created to incentivize relaying on ICS20 token transfers on the destination chain. However, the proposal was specific to ICS20 token transfers and would have to be reimplemented in this format on every other IBC application module."]}),"\n",(0,n.jsxs)(t.p,{children:["After much discussion, the proposal was expanded to a ",(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc/tree/master/spec/app/ics-029-fee-payment",children:"general incentivisation design"})," that can be adopted by any ICS application protocol as ",(0,n.jsx)(t.a,{href:"/v9.0.x/ibc/middleware/develop",children:"middleware"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"concepts",children:"Concepts"}),"\n",(0,n.jsx)(t.p,{children:"ICS29 fee payments in this middleware design are built on the assumption that sender chains are the source of incentives \u2014 the chain on which packets are incentivized is the chain that distributes fees to relayer operators. However, as part of the IBC packet flow, messages have to be submitted on both sender and destination chains. This introduces the requirement of a mapping of relayer operator's addresses on both chains."}),"\n",(0,n.jsxs)(t.p,{children:["To achieve the stated requirements, the ",(0,n.jsx)(t.strong,{children:"fee middleware module has two main groups of functionality"}),":"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsx)(t.p,{children:"Registering of relayer addresses associated with each party involved in relaying the packet on the source chain. This registration process can be automated on start up of relayer infrastructure and happens only once, not every packet flow."}),"\n",(0,n.jsxs)(t.p,{children:["This is described in the ",(0,n.jsx)(t.a,{href:"/v9.0.x/middleware/ics29-fee/fee-distribution",children:"Fee distribution section"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsx)(t.p,{children:"Escrowing fees by any party which will be paid out to each rightful party on completion of the packet lifecycle."}),"\n",(0,n.jsxs)(t.p,{children:["This is described in the ",(0,n.jsx)(t.a,{href:"/v9.0.x/middleware/ics29-fee/msgs",children:"Fee messages section"}),"."]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"We complete the introduction by giving a list of definitions of relevant terminology."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Forward relayer"}),": The relayer that submits the ",(0,n.jsx)(t.code,{children:"MsgRecvPacket"})," message for a given packet (on the destination chain)."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Reverse relayer"}),": The relayer that submits the ",(0,n.jsx)(t.code,{children:"MsgAcknowledgement"})," message for a given packet (on the source chain)."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Timeout relayer"}),": The relayer that submits the ",(0,n.jsx)(t.code,{children:"MsgTimeout"})," or ",(0,n.jsx)(t.code,{children:"MsgTimeoutOnClose"})," messages for a given packet (on the source chain)."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Payee"}),": The account address on the source chain to be paid on completion of the packet lifecycle. The packet lifecycle on the source chain completes with the receipt of a ",(0,n.jsx)(t.code,{children:"MsgTimeout"}),"/",(0,n.jsx)(t.code,{children:"MsgTimeoutOnClose"})," or a ",(0,n.jsx)(t.code,{children:"MsgAcknowledgement"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Counterparty payee"}),": The account address to be paid on completion of the packet lifecycle on the destination chain. The package lifecycle on the destination chain completes with a successful ",(0,n.jsx)(t.code,{children:"MsgRecvPacket"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Refund address"}),": The address of the account paying for the incentivization of packet relaying. The account is refunded timeout fees upon successful acknowledgement. In the event of a packet timeout, both acknowledgement and receive fees are refunded."]}),"\n",(0,n.jsx)(t.h2,{id:"known-limitations",children:"Known Limitations"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"At the time of the release of the feature (ibc-go v4) fee payments middleware only supported incentivisation of new channels; however, with the release of channel upgradeability (ibc-go v8.1) it is possible to enable incentivisation of all existing channels."}),"\n",(0,n.jsx)(t.li,{children:"Even though unlikely, there exists a DoS attack vector on a fee-enabled channel if 1) there exists a relayer software implementation that is incentivised to timeout packets if the timeout fee is greater than the sum of the fees to receive and acknowledge the packet, and 2) only this type of implementation is used by operators relaying on the channel. In this situation, an attacker could continuously incentivise the relayers to never deliver the packets by incrementing the timeout fee of the packets above the sum of the receive and acknowledge fees. However, this situation is unlikely to occur because 1) another relayer behaving honestly could relay the packets before they timeout, and 2) the attack would be costly because the attacker would need to incentivise the timeout fee of the packets with their own funds. Given the low impact and unlikelihood of the attack we have decided to accept this risk and not implement any mitigation mesaures."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,t,i)=>{i.d(t,{Z:()=>r,a:()=>a});var n=i(67294);const s={},o=n.createContext(s);function a(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);