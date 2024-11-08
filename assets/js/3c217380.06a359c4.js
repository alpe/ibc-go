"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[21344],{14854:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var t=i(85893),o=i(11151);const s={title:"IBC-Go v6 to v7",sidebar_label:"IBC-Go v6 to v7",sidebar_position:8,slug:"/migrations/v6-to-v7"},r="Migrating from ibc-go v6 to v7",a={id:"migrations/v6-to-v7",title:"IBC-Go v6 to v7",description:"This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.",source:"@site/versioned_docs/version-v9.0.x/05-migrations/08-v6-to-v7.md",sourceDirName:"05-migrations",slug:"/migrations/v6-to-v7",permalink:"/v9.0.x/migrations/v6-to-v7",draft:!1,unlisted:!1,tags:[],version:"v9.0.x",sidebarPosition:8,frontMatter:{title:"IBC-Go v6 to v7",sidebar_label:"IBC-Go v6 to v7",sidebar_position:8,slug:"/migrations/v6-to-v7"},sidebar:"defaultSidebar",previous:{title:"IBC-Go v5 to v6",permalink:"/v9.0.x/migrations/v5-to-v6"},next:{title:"IBC-Go v7 to v7.1",permalink:"/v9.0.x/migrations/v7-to-v7_1"}},d={},c=[{value:"Chains",id:"chains",level:2},{value:"Light client registration",id:"light-client-registration",level:3},{value:"Tendermint registration",id:"tendermint-registration",level:4},{value:"Solo machine registration",id:"solo-machine-registration",level:4},{value:"Testing package API",id:"testing-package-api",level:3},{value:"IBC Apps",id:"ibc-apps",level:2},{value:"Relayers",id:"relayers",level:2},{value:"IBC Light Clients",id:"ibc-light-clients",level:2},{value:"<code>ClientState</code> interface changes",id:"clientstate-interface-changes",level:3},{value:"<code>Header</code> and <code>Misbehaviour</code>",id:"header-and-misbehaviour",level:3},{value:"<code>ConsensusState</code>",id:"consensusstate",level:3},{value:"Client keeper",id:"client-keeper",level:3},{value:"SDK message",id:"sdk-message",level:3},{value:"Solomachine",id:"solomachine",level:2},{value:"<code>ClientState</code>",id:"clientstate",level:3},{value:"<code>Header</code> and <code>Misbehaviour</code>",id:"header-and-misbehaviour-1",level:3},{value:"<code>SignBytes</code>",id:"signbytes",level:3},{value:"IBC module constants",id:"ibc-module-constants",level:3},{value:"Upgrading to Cosmos SDK 0.47",id:"upgrading-to-cosmos-sdk-047",level:2},{value:"Protobuf",id:"protobuf",level:3},{value:"App modules",id:"app-modules",level:3},{value:"Imports",id:"imports",level:3}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"migrating-from-ibc-go-v6-to-v7",children:"Migrating from ibc-go v6 to v7"}),"\n",(0,t.jsx)(n.p,{children:"This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.\nAny changes that must be done by a user of ibc-go should be documented here."}),"\n",(0,t.jsx)(n.p,{children:"There are four sections based on the four potential user groups of this document:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Chains"}),"\n",(0,t.jsx)(n.li,{children:"IBC Apps"}),"\n",(0,t.jsx)(n.li,{children:"Relayers"}),"\n",(0,t.jsx)(n.li,{children:"IBC Light Clients"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," ibc-go supports golang semantic versioning and therefore all imports must be updated to bump the version number on major releases."]}),"\n",(0,t.jsx)(n.h2,{id:"chains",children:"Chains"}),"\n",(0,t.jsx)(n.p,{children:"Chains will perform automatic migrations to remove existing localhost clients and to migrate the solomachine to v3 of the protobuf definition."}),"\n",(0,t.jsxs)(n.p,{children:["An optional upgrade handler has been added to prune expired tendermint consensus states. It may be used during any upgrade (from v7 onwards).\nAdd the following to the function call to the upgrade handler in ",(0,t.jsx)(n.code,{children:"app/app.go"}),", to perform the optional state pruning."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'import (\n  // ...\n  ibctmmigrations "github.com/cosmos/ibc-go/v7/modules/light-clients/07-tendermint/migrations"\n)\n\n// ...\n\napp.UpgradeKeeper.SetUpgradeHandler(\n  upgradeName,\n  func(ctx sdk.Context, _ upgradetypes.Plan, _ module.VersionMap) (module.VersionMap, error) {\n    // prune expired tendermint consensus states to save storage space\n    _, err := ibctmmigrations.PruneExpiredConsensusStates(ctx, app.Codec, app.IBCKeeper.ClientKeeper)\n    if err != nil {\n      return nil, err\n    }\n\n    return app.mm.RunMigrations(ctx, app.configurator, fromVM)\n  },\n)\n'})}),"\n",(0,t.jsx)(n.p,{children:"Checkout the logs to see how many consensus states are pruned."}),"\n",(0,t.jsx)(n.h3,{id:"light-client-registration",children:"Light client registration"}),"\n",(0,t.jsx)(n.p,{children:"Chains must explicitly register the types of any light client modules it wishes to integrate."}),"\n",(0,t.jsx)(n.h4,{id:"tendermint-registration",children:"Tendermint registration"}),"\n",(0,t.jsxs)(n.p,{children:["To register the tendermint client, modify the ",(0,t.jsx)(n.code,{children:"app.go"})," file to include the tendermint ",(0,t.jsx)(n.code,{children:"AppModuleBasic"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'import (\n  // ...\n+ ibctm "github.com/cosmos/ibc-go/v7/modules/light-clients/07-tendermint"\n)\n\n// ...\n\nModuleBasics = module.NewBasicManager(\n  ...\n  ibc.AppModuleBasic{},\n+ ibctm.AppModuleBasic{},\n  ...\n)\n'})}),"\n",(0,t.jsxs)(n.p,{children:["It may be useful to reference the ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/2825",children:"PR"})," which added the ",(0,t.jsx)(n.code,{children:"AppModuleBasic"})," for the tendermint client."]}),"\n",(0,t.jsx)(n.h4,{id:"solo-machine-registration",children:"Solo machine registration"}),"\n",(0,t.jsxs)(n.p,{children:["To register the solo machine client, modify the ",(0,t.jsx)(n.code,{children:"app.go"})," file to include the solo machine ",(0,t.jsx)(n.code,{children:"AppModuleBasic"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'import (\n  // ...\n+ solomachine "github.com/cosmos/ibc-go/v7/modules/light-clients/06-solomachine"\n)\n\n// ...\n\nModuleBasics = module.NewBasicManager(\n  ...\n  ibc.AppModuleBasic{},\n+ solomachine.AppModuleBasic{},\n  ...\n)\n'})}),"\n",(0,t.jsxs)(n.p,{children:["It may be useful to reference the ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/pull/2826",children:"PR"})," which added the ",(0,t.jsx)(n.code,{children:"AppModuleBasic"})," for the solo machine client."]}),"\n",(0,t.jsx)(n.h3,{id:"testing-package-api",children:"Testing package API"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"SetChannelClosed"})," utility method in ",(0,t.jsx)(n.code,{children:"testing/endpoint.go"})," has been updated to ",(0,t.jsx)(n.code,{children:"SetChannelState"}),", which will take a ",(0,t.jsx)(n.code,{children:"channeltypes.State"})," argument so that the ",(0,t.jsx)(n.code,{children:"ChannelState"})," can be set to any of the possible channel states."]}),"\n",(0,t.jsx)(n.h2,{id:"ibc-apps",children:"IBC Apps"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"No relevant changes were made in this release."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"relayers",children:"Relayers"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"No relevant changes were made in this release."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"ibc-light-clients",children:"IBC Light Clients"}),"\n",(0,t.jsxs)(n.h3,{id:"clientstate-interface-changes",children:[(0,t.jsx)(n.code,{children:"ClientState"})," interface changes"]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"VerifyUpgradeAndUpdateState"})," function has been modified. The client state and consensus state return values have been removed."]}),"\n",(0,t.jsxs)(n.p,{children:["Light clients ",(0,t.jsx)(n.strong,{children:"must"})," handle all management of client and consensus states including the setting of updated client state and consensus state in the client store."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"Initialize"})," method is now expected to set the initial client state, consensus state and any client-specific metadata in the provided store upon client creation."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"CheckHeaderAndUpdateState"})," method has been split into 4 new methods:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"VerifyClientMessage"})," verifies a ",(0,t.jsx)(n.code,{children:"ClientMessage"}),". A ",(0,t.jsx)(n.code,{children:"ClientMessage"})," could be a ",(0,t.jsx)(n.code,{children:"Header"}),", ",(0,t.jsx)(n.code,{children:"Misbehaviour"}),", or batch update. Calls to ",(0,t.jsx)(n.code,{children:"CheckForMisbehaviour"}),", ",(0,t.jsx)(n.code,{children:"UpdateState"}),", and ",(0,t.jsx)(n.code,{children:"UpdateStateOnMisbehaviour"})," will assume that the content of the ",(0,t.jsx)(n.code,{children:"ClientMessage"})," has been verified and can be trusted. An error should be returned if the ",(0,t.jsx)(n.code,{children:"ClientMessage"})," fails to verify."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"CheckForMisbehaviour"})," checks for evidence of a misbehaviour in ",(0,t.jsx)(n.code,{children:"Header"})," or ",(0,t.jsx)(n.code,{children:"Misbehaviour"})," types."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"UpdateStateOnMisbehaviour"})," performs appropriate state changes on a ",(0,t.jsx)(n.code,{children:"ClientState"})," given that misbehaviour has been detected and verified."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"UpdateState"})," updates and stores as necessary any associated information for an IBC client, such as the ",(0,t.jsx)(n.code,{children:"ClientState"})," and corresponding ",(0,t.jsx)(n.code,{children:"ConsensusState"}),". An error is returned if ",(0,t.jsx)(n.code,{children:"ClientMessage"})," is of type ",(0,t.jsx)(n.code,{children:"Misbehaviour"}),". Upon successful update, a list containing the updated consensus state height is returned."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"CheckMisbehaviourAndUpdateState"})," function has been removed from ",(0,t.jsx)(n.code,{children:"ClientState"})," interface. This functionality is now encapsulated by the usage of ",(0,t.jsx)(n.code,{children:"VerifyClientMessage"}),", ",(0,t.jsx)(n.code,{children:"CheckForMisbehaviour"}),", ",(0,t.jsx)(n.code,{children:"UpdateStateOnMisbehaviour"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["The function ",(0,t.jsx)(n.code,{children:"GetTimestampAtHeight"})," has been added to the ",(0,t.jsx)(n.code,{children:"ClientState"})," interface. It should return the timestamp for a consensus state associated with the provided height."]}),"\n",(0,t.jsxs)(n.p,{children:["Prior to ibc-go/v7 the ",(0,t.jsx)(n.code,{children:"ClientState"})," interface defined a method for each data type which was being verified in the counterparty state store.\nThe state verification functions for all IBC data types have been consolidated into two generic methods, ",(0,t.jsx)(n.code,{children:"VerifyMembership"})," and ",(0,t.jsx)(n.code,{children:"VerifyNonMembership"}),".\nBoth are expected to be provided with a standardised key path, ",(0,t.jsx)(n.code,{children:"exported.Path"}),", as defined in ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/main/spec/core/ics-024-host-requirements",children:"ICS 24 host requirements"}),". Membership verification requires callers to provide the marshalled value ",(0,t.jsx)(n.code,{children:"[]byte"}),". Delay period values should be zero for non-packet processing verification. A zero proof height is now allowed by core IBC and may be passed into ",(0,t.jsx)(n.code,{children:"VerifyMembership"})," and ",(0,t.jsx)(n.code,{children:"VerifyNonMembership"}),". Light clients are responsible for returning an error if a zero proof height is invalid behaviour."]}),"\n",(0,t.jsx)(n.p,{children:"See below for an example of how ibc-go now performs channel state verification."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'merklePath := commitmenttypes.NewMerklePath(host.ChannelPath(portID, channelID))\nmerklePath, err := commitmenttypes.ApplyPrefix(connection.GetCounterparty().GetPrefix(), merklePath)\nif err != nil {\n  return err\n}\n\nchannelEnd, ok := channel.(channeltypes.Channel)\nif !ok {\n  return sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "invalid channel type %T", channel)\n}\n\nbz, err := k.cdc.Marshal(&channelEnd)\nif err != nil {\n  return err\n}\n\nif err := clientState.VerifyMembership(\n  ctx, clientStore, k.cdc, height,\n  0, 0, // skip delay period checks for non-packet processing verification\n  proof, merklePath, bz,\n); err != nil {\n  return sdkerrors.Wrapf(err, "failed channel state verification for client (%s)", clientID)\n}\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"header-and-misbehaviour",children:[(0,t.jsx)(n.code,{children:"Header"})," and ",(0,t.jsx)(n.code,{children:"Misbehaviour"})]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"exported.Header"})," and ",(0,t.jsx)(n.code,{children:"exported.Misbehaviour"})," interface types have been merged and renamed to ",(0,t.jsx)(n.code,{children:"ClientMessage"})," interface."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"GetHeight"})," function has been removed from ",(0,t.jsx)(n.code,{children:"exported.Header"})," and thus is not included in the ",(0,t.jsx)(n.code,{children:"ClientMessage"})," interface"]}),"\n",(0,t.jsx)(n.h3,{id:"consensusstate",children:(0,t.jsx)(n.code,{children:"ConsensusState"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"GetRoot"})," function has been removed from consensus state interface since it was not used by core IBC."]}),"\n",(0,t.jsx)(n.h3,{id:"client-keeper",children:"Client keeper"}),"\n",(0,t.jsxs)(n.p,{children:["Keeper function ",(0,t.jsx)(n.code,{children:"CheckMisbehaviourAndUpdateState"})," has been removed since function ",(0,t.jsx)(n.code,{children:"UpdateClient"})," can now handle updating ",(0,t.jsx)(n.code,{children:"ClientState"})," on ",(0,t.jsx)(n.code,{children:"ClientMessage"})," type which can be any ",(0,t.jsx)(n.code,{children:"Misbehaviour"})," implementations."]}),"\n",(0,t.jsx)(n.h3,{id:"sdk-message",children:"SDK message"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"MsgSubmitMisbehaviour"})," is deprecated since ",(0,t.jsx)(n.code,{children:"MsgUpdateClient"})," can now submit a ",(0,t.jsx)(n.code,{children:"ClientMessage"})," type which can be any ",(0,t.jsx)(n.code,{children:"Misbehaviour"})," implementations."]}),"\n",(0,t.jsxs)(n.p,{children:["The field ",(0,t.jsx)(n.code,{children:"header"})," in ",(0,t.jsx)(n.code,{children:"MsgUpdateClient"})," has been renamed to ",(0,t.jsx)(n.code,{children:"client_message"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"solomachine",children:"Solomachine"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"06-solomachine"})," client implementation has been simplified in ibc-go/v7. In-place store migrations have been added to migrate solomachine clients from ",(0,t.jsx)(n.code,{children:"v2"})," to ",(0,t.jsx)(n.code,{children:"v3"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"clientstate",children:(0,t.jsx)(n.code,{children:"ClientState"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"ClientState"})," protobuf message definition has been updated to remove the deprecated ",(0,t.jsx)(n.code,{children:"bool"})," field ",(0,t.jsx)(n.code,{children:"allow_update_after_proposal"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'message ClientState {\n  option (gogoproto.goproto_getters) = false;\n\n  uint64 sequence                  = 1;\n  bool is_frozen                   = 2 [(gogoproto.moretags) = "yaml:\\"is_frozen\\""];\n  ConsensusState consensus_state   = 3 [(gogoproto.moretags) = "yaml:\\"consensus_state\\""];\n- bool allow_update_after_proposal = 4 [(gogoproto.moretags) = "yaml:\\"allow_update_after_proposal\\""];\n}\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"header-and-misbehaviour-1",children:[(0,t.jsx)(n.code,{children:"Header"})," and ",(0,t.jsx)(n.code,{children:"Misbehaviour"})]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"06-solomachine"})," protobuf message ",(0,t.jsx)(n.code,{children:"Header"})," has been updated to remove the ",(0,t.jsx)(n.code,{children:"sequence"})," field. This field was seen as redundant as the implementation can safely rely on the ",(0,t.jsx)(n.code,{children:"sequence"})," value maintained within the ",(0,t.jsx)(n.code,{children:"ClientState"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'message Header {\n  option (gogoproto.goproto_getters) = false;\n \n- uint64              sequence        = 1;\n- uint64              timestamp       = 2;\n- bytes               signature       = 3;\n- google.protobuf.Any new_public_key  = 4 [(gogoproto.moretags) = "yaml:\\"new_public_key\\""];\n- string              new_diversifier = 5 [(gogoproto.moretags) = "yaml:\\"new_diversifier\\""];\n+ uint64              timestamp       = 1;\n+ bytes               signature       = 2;\n+ google.protobuf.Any new_public_key  = 3 [(gogoproto.moretags) = "yaml:\\"new_public_key\\""];\n+ string              new_diversifier = 4 [(gogoproto.moretags) = "yaml:\\"new_diversifier\\""];\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Similarly, the ",(0,t.jsx)(n.code,{children:"Misbehaviour"})," protobuf message has been updated to remove the ",(0,t.jsx)(n.code,{children:"client_id"})," field."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'message Misbehaviour {\n  option (gogoproto.goproto_getters) = false;\n  \n- string           client_id         = 1 [(gogoproto.moretags) = "yaml:\\"client_id\\""];\n- uint64           sequence          = 2;\n- SignatureAndData signature_one     = 3 [(gogoproto.moretags) = "yaml:\\"signature_one\\""];\n- SignatureAndData signature_two     = 4 [(gogoproto.moretags) = "yaml:\\"signature_two\\""];\n+ uint64           sequence          = 1;\n+ SignatureAndData signature_one     = 2 [(gogoproto.moretags) = "yaml:\\"signature_one\\""];\n+ SignatureAndData signature_two     = 3 [(gogoproto.moretags) = "yaml:\\"signature_two\\""];\n}\n'})}),"\n",(0,t.jsx)(n.h3,{id:"signbytes",children:(0,t.jsx)(n.code,{children:"SignBytes"})}),"\n",(0,t.jsxs)(n.p,{children:["Most notably, the ",(0,t.jsx)(n.code,{children:"SignBytes"})," protobuf definition has been modified to replace the ",(0,t.jsx)(n.code,{children:"data_type"})," field with a new field, ",(0,t.jsx)(n.code,{children:"path"}),". The ",(0,t.jsx)(n.code,{children:"path"})," field is defined as ",(0,t.jsx)(n.code,{children:"bytes"})," and represents a serialized ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/main/spec/core/ics-024-host-requirements",children:"ICS-24"})," standardized key path under which the ",(0,t.jsx)(n.code,{children:"data"})," is stored."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'message SignBytes {\n  option (gogoproto.goproto_getters) = false;\n\n  uint64 sequence    = 1;\n  uint64 timestamp   = 2;\n  string diversifier = 3;\n- DataType data_type = 4 [(gogoproto.moretags) = "yaml:\\"data_type\\""];\n+ bytes path         = 4;\n  bytes data         = 5;\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"DataType"})," enum and all associated data types have been removed, greatly reducing the number of message definitions and complexity in constructing the ",(0,t.jsx)(n.code,{children:"SignBytes"})," message type. Likewise, solomachine implementations must now use the serialized ",(0,t.jsx)(n.code,{children:"path"})," value when constructing ",(0,t.jsx)(n.code,{children:"SignatureAndData"})," for signature verification of ",(0,t.jsx)(n.code,{children:"SignBytes"})," data."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'message SignatureAndData {\n  option (gogoproto.goproto_getters) = false;\n \n  bytes    signature = 1;\n- DataType data_type = 2 [(gogoproto.moretags) = "yaml:\\"data_type\\""];\n+ bytes    path      = 2;\n  bytes    data      = 3;\n  uint64   timestamp = 4;\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["For more information, please refer to ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/02-client-refactor-beta1/docs/architecture/adr-007-solomachine-signbytes.md",children:"ADR-007"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"ibc-module-constants",children:"IBC module constants"}),"\n",(0,t.jsxs)(n.p,{children:["IBC module constants have been moved from the ",(0,t.jsx)(n.code,{children:"host"})," package to the ",(0,t.jsx)(n.code,{children:"exported"})," package. Any usages will need to be updated."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'import (\n  // ...\n- host "github.com/cosmos/ibc-go/v7/modules/core/24-host"\n+ ibcexported "github.com/cosmos/ibc-go/v7/modules/core/exported"\n  // ...\n)\n\n- host.ModuleName\n+ ibcexported.ModuleName\n\n- host.StoreKey\n+ ibcexported.StoreKey\n\n- host.QuerierRoute\n+ ibcexported.QuerierRoute\n\n- host.RouterKey\n+ ibcexported.RouterKey\n'})}),"\n",(0,t.jsx)(n.h2,{id:"upgrading-to-cosmos-sdk-047",children:"Upgrading to Cosmos SDK 0.47"}),"\n",(0,t.jsxs)(n.p,{children:["The following should be considered as complementary to ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc2/UPGRADING.md",children:"Cosmos SDK v0.47 UPGRADING.md"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"protobuf",children:"Protobuf"}),"\n",(0,t.jsxs)(n.p,{children:["Protobuf code generation, linting and formatting have been updated to leverage the ",(0,t.jsx)(n.code,{children:"ghcr.io/cosmos/proto-builder:0.11.5"})," docker container. IBC protobuf definitions are now packaged and published to ",(0,t.jsx)(n.a,{href:"https://buf.build/cosmos/ibc",children:"buf.build/cosmos/ibc"})," via CI workflows. The ",(0,t.jsx)(n.code,{children:"third_party/proto"})," directory has been removed in favour of dependency management using ",(0,t.jsx)(n.a,{href:"https://docs.buf.build/introduction",children:"buf.build"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"app-modules",children:"App modules"}),"\n",(0,t.jsxs)(n.p,{children:["Legacy APIs of the ",(0,t.jsx)(n.code,{children:"AppModule"})," interface have been removed from ibc-go modules. For example, for"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"- // Route implements the AppModule interface\n- func (am AppModule) Route() sdk.Route {\n-   return sdk.Route{}\n- }\n-\n- // QuerierRoute implements the AppModule interface\n- func (AppModule) QuerierRoute() string {\n-   return types.QuerierRoute\n- }\n-\n- // LegacyQuerierHandler implements the AppModule interface\n- func (am AppModule) LegacyQuerierHandler(*codec.LegacyAmino) sdk.Querier {\n-   return nil\n- }\n-\n- // ProposalContents doesn't return any content functions for governance proposals.\n- func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {\n-   return nil\n- }\n"})}),"\n",(0,t.jsx)(n.h3,{id:"imports",children:"Imports"}),"\n",(0,t.jsx)(n.p,{children:"Imports for ics23 have been updated as the repository have been migrated from confio to cosmos."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'import (\n  // ...\n- ics23 "github.com/confio/ics23/go"\n+ ics23 "github.com/cosmos/ics23/go"\n  // ...\n)\n'})}),"\n",(0,t.jsx)(n.p,{children:"Imports for gogoproto have been updated."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'import (\n  // ...\n- "github.com/gogo/protobuf/proto"\n+ "github.com/cosmos/gogoproto/proto"\n  // ...\n)\n'})})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>r});var t=i(67294);const o={},s=t.createContext(o);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);