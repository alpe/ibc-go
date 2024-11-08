"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[16961],{4452:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var r=s(85893),o=s(11151);const t={title:"IBC-Go v5 to v6",sidebar_label:"IBC-Go v5 to v6",sidebar_position:7,slug:"/migrations/v5-to-v6"},i="Migrating from ibc-go v5 to v6",a={id:"migrations/v5-to-v6",title:"IBC-Go v5 to v6",description:"This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.",source:"@site/versioned_docs/version-v7.8.x/05-migrations/07-v5-to-v6.md",sourceDirName:"05-migrations",slug:"/migrations/v5-to-v6",permalink:"/v7/migrations/v5-to-v6",draft:!1,unlisted:!1,tags:[],version:"v7.8.x",sidebarPosition:7,frontMatter:{title:"IBC-Go v5 to v6",sidebar_label:"IBC-Go v5 to v6",sidebar_position:7,slug:"/migrations/v5-to-v6"},sidebar:"defaultSidebar",previous:{title:"IBC-Go v4 to v5",permalink:"/v7/migrations/v4-to-v5"},next:{title:"IBC-Go v6 to v7",permalink:"/v7/migrations/v6-to-v7"}},c={},d=[{value:"Chains",id:"chains",level:2},{value:"Upgrade proposal",id:"upgrade-proposal",level:3},{value:"IBC Apps",id:"ibc-apps",level:2},{value:"ICS27 - Interchain Accounts",id:"ics27---interchain-accounts",level:3},{value:"Controller APIs",id:"controller-apis",level:4},{value:"Host params",id:"host-params",level:4},{value:"API breaking changes",id:"api-breaking-changes",level:4},{value:"ICS29 - <code>NewKeeper</code> API change",id:"ics29---newkeeper-api-change",level:3},{value:"ICS20 - <code>SendTransfer</code> is no longer exported",id:"ics20---sendtransfer-is-no-longer-exported",level:3},{value:"ICS04 - <code>SendPacket</code> API change",id:"ics04---sendpacket-api-change",level:3},{value:"IBC testing package",id:"ibc-testing-package",level:3},{value:"Relayers",id:"relayers",level:2},{value:"IBC Light Clients",id:"ibc-light-clients",level:2}];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"migrating-from-ibc-go-v5-to-v6",children:"Migrating from ibc-go v5 to v6"}),"\n",(0,r.jsx)(n.p,{children:"This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.\nAny changes that must be done by a user of ibc-go should be documented here."}),"\n",(0,r.jsx)(n.p,{children:"There are four sections based on the four potential user groups of this document:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Chains"}),"\n",(0,r.jsx)(n.li,{children:"IBC Apps"}),"\n",(0,r.jsx)(n.li,{children:"Relayers"}),"\n",(0,r.jsx)(n.li,{children:"IBC Light Clients"}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Note:"})," ibc-go supports golang semantic versioning and therefore all imports must be updated to bump the version number on major releases."]}),"\n",(0,r.jsx)(n.h2,{id:"chains",children:"Chains"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ibc-go/v6"})," release introduces a new set of migrations for ",(0,r.jsx)(n.code,{children:"27-interchain-accounts"}),". Ownership of ICS27 channel capabilities is transferred from ICS27 authentication modules and will now reside with the ICS27 controller submodule moving forward."]}),"\n",(0,r.jsx)(n.p,{children:"For chains which contain a custom authentication module using the ICS27 controller submodule this requires a migration function to be included in the chain upgrade handler. A subsequent migration handler is run automatically, asserting the ownership of ICS27 channel capabilities has been transferred successfully."}),"\n",(0,r.jsxs)(n.p,{children:["This migration is not required for chains which ",(0,r.jsx)(n.em,{children:"do not"})," contain a custom authentication module using the ICS27 controller submodule."]}),"\n",(0,r.jsxs)(n.p,{children:["This migration facilitates the addition of the ICS27 controller submodule ",(0,r.jsx)(n.code,{children:"MsgServer"})," which provides a standardised approach to integrating existing forms of authentication such as ",(0,r.jsx)(n.code,{children:"x/gov"})," and ",(0,r.jsx)(n.code,{children:"x/group"})," provided by the Cosmos SDK."]}),"\n",(0,r.jsxs)(n.p,{children:["For more information please refer to ",(0,r.jsx)(n.a,{href:"/architecture/adr-009-v6-ics27-msgserver",children:"ADR 009"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"upgrade-proposal",children:"Upgrade proposal"}),"\n",(0,r.jsxs)(n.p,{children:["Please refer to ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/2383",children:"PR #2383"})," for integrating the ICS27 channel capability migration logic or follow the steps outlined below:"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Add the upgrade migration logic to chain distribution. This may be, for example, maintained under a package ",(0,r.jsx)(n.code,{children:"app/upgrades/v6"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:'package v6\n\nimport (\n    "github.com/cosmos/cosmos-sdk/codec"\n    storetypes "github.com/cosmos/cosmos-sdk/store/types"\n    sdk "github.com/cosmos/cosmos-sdk/types"\n    "github.com/cosmos/cosmos-sdk/types/module"\n    capabilitykeeper "github.com/cosmos/cosmos-sdk/x/capability/keeper"\n    upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"\n\n    v6 "github.com/cosmos/ibc-go/v6/modules/apps/27-interchain-accounts/controller/migrations/v6"\n)\n\nconst (\n    UpgradeName = "v6"\n)\n\nfunc CreateUpgradeHandler(\n    mm *module.Manager,\n    configurator module.Configurator,\n    cdc codec.BinaryCodec,\n    capabilityStoreKey *storetypes.KVStoreKey,\n    capabilityKeeper *capabilitykeeper.Keeper,\n    moduleName string,\n) upgradetypes.UpgradeHandler {\n    return func(ctx sdk.Context, _ upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {\n        if err := v6.MigrateICS27ChannelCapability(ctx, cdc, capabilityStoreKey, capabilityKeeper, moduleName); err != nil {\n            return nil, err\n    \t}\n\n        return mm.RunMigrations(ctx, configurator, vm)\n    }\n}\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:["Set the upgrade handler in ",(0,r.jsx)(n.code,{children:"app.go"}),". The ",(0,r.jsx)(n.code,{children:"moduleName"})," parameter refers to the authentication module's ",(0,r.jsx)(n.code,{children:"ScopedKeeper"})," name. This is the name provided upon instantiation in ",(0,r.jsx)(n.code,{children:"app.go"})," via the ",(0,r.jsxs)(n.a,{href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.1/x/capability/keeper/keeper.go#L70",children:[(0,r.jsx)(n.code,{children:"x/capability"})," keeper ",(0,r.jsx)(n.code,{children:"ScopeToModule(moduleName string)"})]})," method. ",(0,r.jsxs)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.0.0/testing/simapp/app.go#L304",children:["See here for an example in ",(0,r.jsx)(n.code,{children:"simapp"})]}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"app.UpgradeKeeper.SetUpgradeHandler(\n    v6.UpgradeName,\n    v6.CreateUpgradeHandler(\n        app.mm,\n        app.configurator,\n        app.appCodec,\n        app.keys[capabilitytypes.ModuleName],\n        app.CapabilityKeeper,\n        >>>> moduleName <<<<,\n    ),\n)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"ibc-apps",children:"IBC Apps"}),"\n",(0,r.jsx)(n.h3,{id:"ics27---interchain-accounts",children:"ICS27 - Interchain Accounts"}),"\n",(0,r.jsx)(n.h4,{id:"controller-apis",children:"Controller APIs"}),"\n",(0,r.jsxs)(n.p,{children:["In previous releases of ibc-go, chain developers integrating the ICS27 interchain accounts controller functionality were expected to create a custom ",(0,r.jsx)(n.code,{children:"Base Application"})," referred to as an authentication module, see the section ",(0,r.jsx)(n.a,{href:"/v7/apps/interchain-accounts/auth-modules",children:"Building an authentication module"})," from the documentation."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Base Application"})," was intended to be composed with the ICS27 controller submodule ",(0,r.jsx)(n.code,{children:"Keeper"})," and facilitate many forms of message authentication depending on a chain's particular use case."]}),"\n",(0,r.jsx)(n.p,{children:"Prior to ibc-go v6 the controller submodule exposed only these two functions (to which we will refer as the legacy APIs):"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.0.0/modules/apps/27-interchain-accounts/controller/keeper/account.go#L19",children:(0,r.jsx)(n.code,{children:"RegisterInterchainAccount"})})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.0.0/modules/apps/27-interchain-accounts/controller/keeper/relay.go#L18",children:(0,r.jsx)(n.code,{children:"SendTx"})})}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["However, these functions have now been deprecated in favour of the new controller submodule ",(0,r.jsx)(n.code,{children:"MsgServer"})," and will be removed in later releases."]}),"\n",(0,r.jsxs)(n.p,{children:["Both APIs remain functional and maintain backwards compatibility in ibc-go v6, however consumers of these APIs are now recommended to follow the message passing paradigm outlined in Cosmos SDK ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/cosmos-sdk/blob/main/docs/architecture/adr-031-msg-service.md",children:"ADR 031"})," and ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/cosmos-sdk/blob/main/docs/architecture/adr-033-protobuf-inter-module-comm.md",children:"ADR 033"}),". This is facilitated by the Cosmos SDK ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/cosmos-sdk/blob/main/baseapp/msg_service_router.go#L17",children:(0,r.jsx)(n.code,{children:"MsgServiceRouter"})})," and chain developers creating custom application logic can now omit the ICS27 controller submodule ",(0,r.jsx)(n.code,{children:"Keeper"})," from their module and instead depend on message routing."]}),"\n",(0,r.jsx)(n.p,{children:"Depending on the use case, developers of custom authentication modules face one of three scenarios:"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"auth-module-decision-tree.png",src:s(88637).Z+"",width:"458",height:"455"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"My authentication module needs to access IBC packet callbacks"})}),"\n",(0,r.jsxs)(n.p,{children:["Application developers that wish to consume IBC packet callbacks and react upon packet acknowledgements ",(0,r.jsx)(n.strong,{children:"must"})," continue using the controller submodule's legacy APIs. The authentication modules will not need a ",(0,r.jsx)(n.code,{children:"ScopedKeeper"})," anymore, though, because the channel capability will be claimed by the controller submodule. For example, given an Interchain Accounts authentication module keeper ",(0,r.jsx)(n.code,{children:"ICAAuthKeeper"}),", the authentication module's ",(0,r.jsx)(n.code,{children:"ScopedKeeper"})," (",(0,r.jsx)(n.code,{children:"scopedICAAuthKeeper"}),") is not needed anymore and can be removed for the argument list of the keeper constructor function, as shown here:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"app.ICAAuthKeeper = icaauthkeeper.NewKeeper(\n    appCodec,\n    keys[icaauthtypes.StoreKey],\n    app.ICAControllerKeeper,\n-   scopedICAAuthKeeper,\n)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Please note that the authentication module's ",(0,r.jsx)(n.code,{children:"ScopedKeeper"})," name is still needed as part of the channel capability migration described in section ",(0,r.jsx)(n.a,{href:"#upgrade-proposal",children:"Upgrade proposal"})," above. Therefore the authentication module's ",(0,r.jsx)(n.code,{children:"ScopedKeeper"})," cannot be completely removed from the chain code until the migration has run."]}),"\n",(0,r.jsxs)(n.p,{children:["In the future, the use of the legacy APIs for accessing packet callbacks will be replaced by IBC Actor Callbacks (see ",(0,r.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/1976",children:"ADR 008"})," for more details) and it will also be possible to access them with the ",(0,r.jsx)(n.code,{children:"MsgServiceRouter"}),"."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"My authentication module does not need access to IBC packet callbacks"})}),"\n",(0,r.jsxs)(n.p,{children:["The authentication module can migrate from using the legacy APIs and it can be composed instead with the ",(0,r.jsx)(n.code,{children:"MsgServiceRouter"}),", so that the authentication module is able to pass messages to the controller submodule's ",(0,r.jsx)(n.code,{children:"MsgServer"})," to register interchain accounts and send packets to the interchain account. For example, given an Interchain Accounts authentication module keeper ",(0,r.jsx)(n.code,{children:"ICAAuthKeeper"}),", the ICS27 controller submodule keeper (",(0,r.jsx)(n.code,{children:"ICAControllerKeeper"}),") and authentication module scoped keeper (",(0,r.jsx)(n.code,{children:"scopedICAAuthKeeper"}),") are not needed anymore and can be replaced with the ",(0,r.jsx)(n.code,{children:"MsgServiceRouter"}),", as shown here:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"app.ICAAuthKeeper = icaauthkeeper.NewKeeper(\n    appCodec,\n    keys[icaauthtypes.StoreKey],\n-   app.ICAControllerKeeper,\n-   scopedICAAuthKeeper,\n+   app.MsgServiceRouter(),\n)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["In your authentication module you can route messages to the controller submodule's ",(0,r.jsx)(n.code,{children:"MsgServer"})," instead of using the legacy APIs. For example, for registering an interchain account:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"- if err := keeper.icaControllerKeeper.RegisterInterchainAccount(\n-    ctx,\n-    connectionID,\n-    owner.String(),\n-    version,\n- ); err != nil {\n-    return err\n- }\n+ msg := controllertypes.NewMsgRegisterInterchainAccount(\n+    connectionID,\n+    owner.String(),\n+    version,\n+ )\n+ handler := keeper.msgRouter.Handler(msg)\n+ res, err := handler(ctx, msg)\n+ if err != nil {\n+    return err\n+ }\n"})}),"\n",(0,r.jsxs)(n.p,{children:["where ",(0,r.jsx)(n.code,{children:"controllertypes"})," is an import alias for ",(0,r.jsx)(n.code,{children:'"github.com/cosmos/ibc-go/v6/modules/apps/27-interchain-accounts/controller/types"'}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["In addition, in this use case the authentication module does not need to implement the ",(0,r.jsx)(n.code,{children:"IBCModule"})," interface anymore."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"I do not need a custom authentication module anymore"})}),"\n",(0,r.jsxs)(n.p,{children:["If your authentication module does not have any extra functionality compared to the default authentication module added in ibc-go v6 (the ",(0,r.jsx)(n.code,{children:"MsgServer"}),"), or if you can use a generic authentication module, such as the ",(0,r.jsx)(n.code,{children:"x/auth"}),", ",(0,r.jsx)(n.code,{children:"x/gov"})," or ",(0,r.jsx)(n.code,{children:"x/group"})," modules from the Cosmos SDK (v0.46 and later), then you can remove your authentication module completely and use instead the gRPC endpoints of the ",(0,r.jsx)(n.code,{children:"MsgServer"})," or the CLI added in ibc-go v6."]}),"\n",(0,r.jsxs)(n.p,{children:["Please remember that the authentication module's ",(0,r.jsx)(n.code,{children:"ScopedKeeper"})," name is still needed as part of the channel capability migration described in section ",(0,r.jsx)(n.a,{href:"#upgrade-proposal",children:"Upgrade proposal"})," above."]}),"\n",(0,r.jsx)(n.h4,{id:"host-params",children:"Host params"}),"\n",(0,r.jsxs)(n.p,{children:["The ICS27 host submodule default params have been updated to include the ",(0,r.jsx)(n.code,{children:"AllowAllHostMsgs"})," wildcard ",(0,r.jsx)(n.code,{children:"*"}),".\nThis enables execution of any ",(0,r.jsx)(n.code,{children:"sdk.Msg"})," type for ICS27 registered on the host chain ",(0,r.jsx)(n.code,{children:"InterfaceRegistry"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:'// AllowAllHostMsgs holds the string key that allows all message types on interchain accounts host module\nconst AllowAllHostMsgs = "*"\n\n...\n\n// DefaultParams is the default parameter configuration for the host submodule\nfunc DefaultParams() Params {\n-   return NewParams(DefaultHostEnabled, nil)\n+   return NewParams(DefaultHostEnabled, []string{AllowAllHostMsgs})\n}\n'})}),"\n",(0,r.jsx)(n.h4,{id:"api-breaking-changes",children:"API breaking changes"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"SerializeCosmosTx"})," takes in a ",(0,r.jsx)(n.code,{children:"[]proto.Message"})," instead of ",(0,r.jsx)(n.code,{children:"[]sdk.Message"}),". This allows for the serialization of proto messages without requiring the fulfillment of the ",(0,r.jsx)(n.code,{children:"sdk.Msg"})," interface."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"27-interchain-accounts"})," genesis types have been moved to their own package: ",(0,r.jsx)(n.code,{children:"modules/apps/27-interchain-acccounts/genesis/types"}),".\nThis change facilitates the addition of the ICS27 controller submodule ",(0,r.jsx)(n.code,{children:"MsgServer"})," and avoids cyclic imports. This should have minimal disruption to chain developers integrating ",(0,r.jsx)(n.code,{children:"27-interchain-accounts"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The ICS27 host submodule ",(0,r.jsx)(n.code,{children:"NewKeeper"})," function in ",(0,r.jsx)(n.code,{children:"modules/apps/27-interchain-acccounts/host/keeper"})," now includes an additional parameter of type ",(0,r.jsx)(n.code,{children:"ICS4Wrapper"}),".\nThis provides the host submodule with the ability to correctly unwrap channel versions in the event of a channel reopening handshake."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"func NewKeeper(\n    cdc codec.BinaryCodec, key storetypes.StoreKey, paramSpace paramtypes.Subspace,\n-   channelKeeper icatypes.ChannelKeeper, portKeeper icatypes.PortKeeper,\n+   ics4Wrapper icatypes.ICS4Wrapper, channelKeeper icatypes.ChannelKeeper, portKeeper icatypes.PortKeeper,\n    accountKeeper icatypes.AccountKeeper, scopedKeeper icatypes.ScopedKeeper, msgRouter icatypes.MessageRouter,\n) Keeper\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"ics29---newkeeper-api-change",children:["ICS29 - ",(0,r.jsx)(n.code,{children:"NewKeeper"})," API change"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"NewKeeper"})," function of ICS29 has been updated to remove the ",(0,r.jsx)(n.code,{children:"paramSpace"})," parameter as it was unused."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"func NewKeeper(\n-   cdc codec.BinaryCodec, key storetypes.StoreKey, paramSpace paramtypes.Subspace,\n-   ics4Wrapper types.ICS4Wrapper, channelKeeper types.ChannelKeeper, portKeeper types.PortKeeper, authKeeper types.AccountKeeper, bankKeeper types.BankKeeper,\n+   cdc codec.BinaryCodec, key storetypes.StoreKey,\n+   ics4Wrapper types.ICS4Wrapper, channelKeeper types.ChannelKeeper,\n+   portKeeper types.PortKeeper, authKeeper types.AccountKeeper, bankKeeper types.BankKeeper,\n) Keeper {\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"ics20---sendtransfer-is-no-longer-exported",children:["ICS20 - ",(0,r.jsx)(n.code,{children:"SendTransfer"})," is no longer exported"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"SendTransfer"})," function of ICS20 has been removed. IBC transfers should now be initiated with ",(0,r.jsx)(n.code,{children:"MsgTransfer"})," and routed to the ICS20 ",(0,r.jsx)(n.code,{children:"MsgServer"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"See below for example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"if handler := msgRouter.Handler(msgTransfer); handler != nil {\n    if err := msgTransfer.ValidateBasic(); err != nil {\n        return nil, err\n    }\n\n    res, err := handler(ctx, msgTransfer)\n    if err != nil {\n        return nil, err\n    }\n}\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"ics04---sendpacket-api-change",children:["ICS04 - ",(0,r.jsx)(n.code,{children:"SendPacket"})," API change"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"SendPacket"})," API has been simplified:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"// SendPacket is called by a module in order to send an IBC packet on a channel\nfunc (k Keeper) SendPacket(\n    ctx sdk.Context,\n    channelCap *capabilitytypes.Capability,\n-   packet exported.PacketI,\n-) error {\n+   sourcePort string,\n+   sourceChannel string,\n+   timeoutHeight clienttypes.Height,\n+   timeoutTimestamp uint64,\n+   data []byte,\n+) (uint64, error) {\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Callers no longer need to pass in a pre-constructed packet.\nThe destination port/channel identifiers and the packet sequence will be determined by core IBC.\n",(0,r.jsx)(n.code,{children:"SendPacket"})," will return the packet sequence."]}),"\n",(0,r.jsx)(n.h3,{id:"ibc-testing-package",children:"IBC testing package"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"SendPacket"})," API has been simplified:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"// SendPacket is called by a module in order to send an IBC packet on a channel\nfunc (k Keeper) SendPacket(\n    ctx sdk.Context,\n    channelCap *capabilitytypes.Capability,\n-   packet exported.PacketI,\n-) error {\n+   sourcePort string,\n+   sourceChannel string,\n+   timeoutHeight clienttypes.Height,\n+   timeoutTimestamp uint64,\n+   data []byte,\n+) (uint64, error) {\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Callers no longer need to pass in a pre-constructed packet. ",(0,r.jsx)(n.code,{children:"SendPacket"})," will return the packet sequence."]}),"\n",(0,r.jsx)(n.h2,{id:"relayers",children:"Relayers"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"No relevant changes were made in this release."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"ibc-light-clients",children:"IBC Light Clients"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"No relevant changes were made in this release."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},88637:(e,n,s)=>{s.d(n,{Z:()=>r});const r=s.p+"assets/images/auth-module-decision-tree-d241ff33b40befa4fff8e7f00e07bd3a.png"},11151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>i});var r=s(67294);const o={},t=r.createContext(o);function i(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);