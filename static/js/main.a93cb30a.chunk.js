(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{127:function(e,t,n){},155:function(e,t,n){},248:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),c=n(27),a=n.n(c),o=(n(155),n(156),n(258)),s=n(264),l=n(104),d=n(23),j=n(18),b=n(146),h=n(251),u=n(265),O=n(259),p=n(77),f=n(252),x=n(260),v=n(262),m=n(253),g=n(267),S=n(268),y=n(254),w=n(255),k=n(256),C=n(28),E=new C.Icon({iconUrl:"./robber.png",iconSize:[25,25]}),A=new C.Icon({iconUrl:"./jail.png",iconSize:[25,25]}),I=new C.Icon({iconUrl:"./police.png",iconSize:[25,25]}),z=new C.Icon({iconUrl:"./exit.png",iconSize:[25,25]}),N=n(269),D=n(112),T=n.n(D),U=(n(127),n(6)),G=function(){var e=Object(i.useState)(-1),t=Object(j.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)(-1),a=Object(j.a)(c,2),o=a[0],s=a[1],l=Object(i.useState)({}),d=Object(j.a)(l,2),C=d[0],D=d[1],G=Object(i.useState)(),L=Object(j.a)(G,2),B=L[0],F=L[1],R=Object(i.useState)({}),H=Object(j.a)(R,2),P=H[0],J=H[1],M=Object(i.useState)(!1),Y=Object(j.a)(M,2),Z=Y[0],q=Y[1],V=Object(i.useState)(new Set),W=Object(j.a)(V,2),K=W[0],Q=W[1],X=Object(i.useState)(),$=Object(j.a)(X,2),_=$[0],ee=$[1],te=Object(i.useState)(),ne=Object(j.a)(te,2),ie=ne[0],re=ne[1],ce=Object(i.useState)(),ae=Object(j.a)(ce,2),oe=ae[0],se=ae[1],le=Object(i.useState)(!1),de=Object(j.a)(le,2),je=de[0],be=de[1],he=Object(i.useState)(!1),ue=Object(j.a)(he,2),Oe=ue[0],pe=ue[1],fe=Object(i.useState)(!1),xe=Object(j.a)(fe,2),ve=xe[0],me=xe[1],ge=Object(i.useState)(),Se=Object(j.a)(ge,2),ye=Se[0],we=Se[1],ke=Object(i.useState)(0),Ce=Object(j.a)(ke,2),Ee=Ce[0],Ae=Ce[1],Ie=Object(i.useState)(0),ze=Object(j.a)(Ie,2),Ne=ze[0],De=ze[1],Te=Object(i.useState)(""),Ue=Object(j.a)(Te,2),Ge=Ue[0],Le=Ue[1],Be=function(e){var t=new FileReader;return t.onload=function(e){var t,n;if((null===(t=e.target)||void 0===t?void 0:t.result)&&"string"===typeof(null===(n=e.target)||void 0===n?void 0:n.result)){var i,r=JSON.parse(null===(i=e.target)||void 0===i?void 0:i.result);q(!0),D(r)}else q(!1),b.b.error("Failed to read file!")},t.readAsText(e),!1},Fe=function(){r(-1),s(-1),ee(void 0),J({}),F(void 0),se(void 0),Q(new Set);try{if(void 0===C.timeHorizon)throw Error("invalid data in json file");Ae(C.timeHorizon),De(C.timeHorizon);var e={};for(var t in J(C.position),C.position){var n=parseInt(t,10);if(void 0===C.position[t])throw Error("invalid data in json file");e[n]=C.position[t]}J(e);var i=new Set;for(var c in C.defenders){var a=C.defenders[c].toString();if(void 0===C.position[a])throw Error("invalid data in json file");i.add(C.defenders[c])}ee(i),re(i);var o=new Set;for(var l in C.exits){var d=C.exits[l].toString();if(void 0===C.position[d])throw Error("invalid data in json file");o.add(C.exits[l])}se(o);var j=C.attacker.toString();if(void 0===C.position[j])throw Error("invalid data in json file");r(C.attacker),s(C.attacker);var h={};for(var u in C.graph){var O=parseInt(u,10),p=0;for(var f in C.graph[u])p=C.graph[u][f],void 0===h[O]&&(h[O]=new Set),h[O].add(p),O!==p&&function(){var e=O.toString(),t=p.toString();if(void 0===C.position[e]||void 0===C.position[t])throw Error("invalid data in json file");var n=[C.position[e][0],C.position[e][1],C.position[t][0],C.position[t][1]];Q((function(e){return new Set(e).add(n)}))}()}ye&&ye.setView(C.position[C.attacker],13),F(h)}catch(x){b.b.error("Failed to render graph, invalid data in json file")}},Re=function(){r(o),be(!1),pe(!1),me(!1),ee(ie),Ae(Ne)},He=function(){-1!==n&&T.a.create({baseURL:Ge,headers:{"Content-type":"application/json"}}).get("api/reset").then((function(e){console.log(e),e.data.success?be(!0):b.b.error("Error server response")})).catch((function(e){b.b.error("Unable to connect to server")}))},Pe=function(){return Object(U.jsxs)("div",{style:{marginTop:20},children:[Object(U.jsx)("h1",{children:"Upload "}),Object(U.jsx)(h.a,{children:Object(U.jsxs)(u.b,{direction:"vertical",children:[Object(U.jsx)(O.a,{accept:"application/json",maxCount:1,beforeUpload:Be,children:Object(U.jsx)(p.a,{icon:Object(U.jsx)(N.a,{}),children:"Upload (Max: 1)"})}),Object(U.jsx)(p.a,{type:"primary",onClick:Fe,disabled:!Z,children:"Render Graph"}),Object(U.jsx)(f.a,{children:Object(U.jsxs)(u.b,{children:[Object(U.jsx)(p.a,{type:"primary",onClick:He,disabled:!Z||je,children:"Play"}),Object(U.jsx)(p.a,{danger:!0,type:"primary",onClick:Re,disabled:!Z,children:"Reset Game"})]})}),je&&Object(U.jsx)(f.a,{children:Object(U.jsxs)("h3",{children:["Time Left: ",Ee]})})]})})]})};return Object(U.jsx)("div",{children:Object(U.jsxs)(f.a,{children:[Object(U.jsxs)(h.a,{span:9,children:[Object(U.jsx)(Pe,{}),Object(U.jsx)("br",{}),Object(U.jsx)(x.a,{children:Object(U.jsx)(x.a.Item,{label:"API URL",children:Object(U.jsx)(v.a,{onChange:function(e){Le(e.currentTarget.value)},value:Ge})})}),Object(U.jsx)("br",{}),Object(U.jsx)("h1",{children:"Instuctions "}),Object(U.jsxs)("ul",{children:[Object(U.jsx)("li",{children:"Upload the json file you get when create graph and render graph"}),Object(U.jsx)("li",{children:"Input the server URL. Server template can be found in the link below."}),Object(U.jsx)("li",{children:'If your server is hosted on local machine, and your url is localhost, please disable "block insecure private network requests" if you are using chrome via "chrome://flags/#block-insecure-private-network-requests"'}),Object(U.jsx)("li",{children:'In addition, please add "http://" before "localhost" if your url is localhost. E.g. "http://localhost:8000"'}),Object(U.jsx)("li",{children:"Click Play to start playing"}),Object(U.jsx)("li",{children:"Double click on the map to select the next node the move"}),Object(U.jsx)("li",{children:"Click on the node to view the node number based on the json graph"}),Object(U.jsx)("li",{children:"For more details and server template, visit: https://github.com/limkaraik/NSG-Server-Template"}),Object(U.jsx)("li",{children:"Sample server and json file can be found here: https://github.com/limkaraik/NSG-sample-server"})]})]}),Object(U.jsx)(h.a,{span:15,children:Object(U.jsxs)(m.a,{center:[51.505,-.09],whenCreated:we,zoom:13,doubleClickZoom:!1,scrollWheelZoom:!0,style:{width:800,height:650,marginLeft:100,marginTop:20},children:[Object(U.jsx)(g.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),P&&Object.keys(P).map((function(e,t){return Object(U.jsx)(S.a,{center:P[e],fillOpacity:.7,interactive:!0,eventHandlers:{dblclick:function(t){var i;i=parseInt(e,10),!je||Oe||ve||B&&B[n].has(i)&&T.a.create({baseURL:Ge,headers:{"Content-type":"application/json"}}).get("api/move?node=".concat(i)).then((function(e){var t=e.data,n=t.success,c=t.defenders;if(console.log("Response Data",e.data),n){var a=new Set(c);console.log("New Defenders Position",a),ee(a),r(i);var o=Ee-1;Ae(o),a&&a.has(i)?(pe(!0),b.b.info("You have lost :-(")):oe&&oe.has(i)?(me(!0),b.b.success("You have won!")):0===o&&(me(!0),b.b.info("You have lost :-("))}}))},click:function(e){}},children:Object(U.jsxs)(y.a,{children:["Node ",e]})},e)})),K.size>0&&Array.from(K).map((function(e,t){return Object(U.jsx)(w.a,{positions:[[e[0],e[1]],[e[2],e[3]]]},t)})),oe&&Array.from(oe).map((function(e,t){return Object(U.jsx)(k.a,{position:P[e],interactive:!1,icon:Oe&&e===n?A:z},t)})),_&&Array.from(_).map((function(e,t){return Object(U.jsx)(k.a,{position:P[e],interactive:!1,icon:Oe&&e===n?A:I},t)})),-1!==n&&Object(U.jsx)(k.a,{position:P[n],icon:Oe?A:E,interactive:!1})]})})]})})},L=n(263),B=n(266),F=n(261),R=n(257),H=function(){var e=Object(i.useState)(1),t=Object(j.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)(new Set),a=Object(j.a)(c,2),o=a[0],s=a[1],l=Object(i.useState)(new Set),d=Object(j.a)(l,2),O=d[0],x=d[1],v=Object(i.useState)(),y=Object(j.a)(v,2),C=y[0],A=y[1],N=Object(i.useState)(!1),D=Object(j.a)(N,2),T=D[0],G=D[1],H=Object(i.useState)(new Set),P=Object(j.a)(H,2),J=P[0],M=P[1],Y=Object(i.useState)(new Set),Z=Object(j.a)(Y,2),q=Z[0],V=Z[1],W=Object(i.useState)(),K=Object(j.a)(W,2),Q=K[0],X=K[1],$=Object(i.useState)(10),_=Object(j.a)($,2),ee=_[0],te=_[1];document.onkeyup=function(e){"a"===e.key&&G(!T)};var ne=function(){Object(R.a)({dblclick:function(e){var t=[e.latlng.lat,e.latlng.lng];1===n?s((function(e){return new Set(e).add(t)})):2===n&&s((function(e){var n=new Set(e);return n.forEach((function(e){e[0]===t[0]&&e[1]===t[1]&&(n.delete(e),x((function(e){var n=new Set(e);return n.forEach((function(e){return e[0]===t[0]&&e[1]===t[1]||e[2]===t[0]&&e[3]===t[1]?n.delete(e):e})),n})),M((function(t){var n=new Set(t);return n.delete(e),n})),V((function(t){var n=new Set(t);return n.delete(e),n})),Q&&Q[0]===e[0]&&Q[1]===e[1]&&X(void 0))})),n}))},click:function(e){var t=[e.latlng.lat,e.latlng.lng];3===n||4===n?o.forEach((function(e){if(e[0]===t[0]&&e[1]===t[1])if(!1===T)A(t),b.b.info("Source Node Selected");else if(void 0===C)b.b.error("Select the Source Node First");else if(3!==n||C[0]===t[0]&&C[1]===t[1])4===n&&x((function(e){var n=new Set(e);return n.forEach((function(e){return e[0]===t[0]&&e[1]===t[1]&&e[2]===C[0]&&e[3]===C[1]||e[2]===t[0]&&e[3]===t[1]&&e[0]===C[0]&&e[1]===C[1]?n.delete(e):e})),n}));else{var i=[C[0],C[1],t[0],t[1]];x((function(e){return new Set(e).add(i)}))}})):5===n||6===n?o.forEach((function(e){e[0]===t[0]&&e[1]===t[1]&&M(5===n?function(t){return new Set(t).add(e)}:function(t){var n=new Set(t);return n.delete(e),n})})):7===n||8===n?o.forEach((function(e){e[0]===t[0]&&e[1]===t[1]&&V(7===n?function(t){return new Set(t).add(e)}:function(t){var n=new Set(t);return n.delete(e),n})})):9===n&&o.forEach((function(e){e[0]===t[0]&&e[1]===t[1]&&X(e)}))}});return null},ie=function(e){G(e)},re=function(e){r(e.target.value)},ce=function(){s(new Set),x(new Set),M(new Set),V(new Set),X(void 0),A(void 0)},ae=function(){var e={graph:{},position:{},defenders:new Array,attacker:-1,exits:new Array,timeHorizon:ee},t=1;o.forEach((function(n){e.position[t]=n,e.graph[t]=[t],J.has(n)&&e.defenders.push(t),q.has(n)&&e.exits.push(t),Q&&Q[0]===n[0]&&Q[1]===n[1]&&(e.attacker=t),t++})),O.forEach((function(t){var n=0,i=0;for(var r in e.position){var c=e.position[r];c[0]===t[0]&&c[1]===t[1]?n=parseInt(r,10):c[0]===t[2]&&c[1]===t[3]&&(i=parseInt(r,10))}if(0!==n&&0!==i){var a=e.graph[n];a.push(i),(a=e.graph[i]).push(n)}}));var n=document.createElement("a");n.href=URL.createObjectURL(new Blob([JSON.stringify(e,null,2)],{type:"application/json"})),n.setAttribute("download","data.json"),document.body.appendChild(n),n.click(),document.body.removeChild(n)},oe=function(e){te(e)},se=function(){return Object(U.jsxs)("div",{style:{marginTop:20},children:[Object(U.jsx)("h1",{children:"Select Action "}),Object(U.jsxs)(u.b,{direction:"vertical",children:[Object(U.jsx)(f.a,{children:Object(U.jsx)(L.a.Group,{onChange:re,value:n,optionType:"button",buttonStyle:"solid",children:Object(U.jsxs)(u.b,{direction:"vertical",children:[Object(U.jsxs)(f.a,{children:[Object(U.jsx)(L.a.Button,{value:1,style:{width:150},children:"Add Nodes"}),Object(U.jsx)(L.a.Button,{value:2,style:{width:150},children:"Delete Nodes"})]}),Object(U.jsxs)(f.a,{children:[Object(U.jsx)(L.a.Button,{value:3,style:{width:150},children:"Add Edges"}),Object(U.jsx)(L.a.Button,{value:4,style:{width:150},children:"Delete Edges"}),Object(U.jsx)(B.a,{defaultChecked:!1,checkedChildren:"Target",unCheckedChildren:"Source",onChange:ie,checked:T,style:{marginLeft:20,marginTop:5}})]}),Object(U.jsxs)(f.a,{children:[Object(U.jsx)(L.a.Button,{value:5,style:{width:150},children:"Add Defenders"}),Object(U.jsx)(L.a.Button,{value:6,style:{width:150},children:"Delete Defenders"})]}),Object(U.jsxs)(f.a,{children:[Object(U.jsx)(L.a.Button,{value:7,style:{width:150},children:"Add Exits"}),Object(U.jsx)(L.a.Button,{value:8,style:{width:150},children:"Delete Exits"})]}),Object(U.jsx)(f.a,{children:Object(U.jsx)(L.a.Button,{value:9,style:{width:150},children:"Set Attacker"})})]})})}),Object(U.jsx)(f.a,{children:Object(U.jsxs)(u.b,{children:[Object(U.jsx)("h3",{children:"Time Horizon"}),Object(U.jsx)(F.a,{min:1,max:100,defaultValue:10,onChange:oe,value:ee})]})})]}),Object(U.jsx)(f.a,{style:{marginTop:20},children:Object(U.jsxs)(u.b,{children:[Object(U.jsx)(p.a,{type:"primary",onClick:ae,children:"Generate Graph"}),Object(U.jsx)(p.a,{danger:!0,type:"primary",onClick:ce,children:"Reset"})]})}),Object(U.jsx)("br",{}),Object(U.jsx)("h1",{children:"Instuctions "}),Object(U.jsxs)("ul",{children:[Object(U.jsx)("li",{children:"Double click on the map to add or delete nodes"}),Object(U.jsx)("li",{children:"To add or delete edges, click to select the source node, then toggle the switch to select target node.(edges are undirected*) "}),Object(U.jsx)("li",{children:"You can press 'a' on the keyboard to toggle the switch when adding edges "}),Object(U.jsx)("li",{children:"Click on the nodes to add or delete Defenders/Exits"}),Object(U.jsx)("li",{children:"Click on the nodes to set Attacker"}),Object(U.jsx)("li",{children:"For more details and server template, visit: https://github.com/limkaraik/NSG-Server-Template"}),Object(U.jsx)("li",{children:"Sample server and json file can be found here: https://github.com/limkaraik/NSG-sample-server"})]})]})};return Object(U.jsx)("div",{children:Object(U.jsxs)(f.a,{children:[Object(U.jsx)(h.a,{span:9,children:Object(U.jsx)(se,{})}),Object(U.jsx)(h.a,{span:15,children:Object(U.jsxs)(m.a,{center:[51.505,-.09],zoom:13,doubleClickZoom:!1,scrollWheelZoom:!0,style:{width:800,height:650,marginLeft:100,marginTop:20},children:[Object(U.jsx)(g.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(U.jsx)(ne,{}),o.size>0&&Array.from(o).map((function(e,t){return Object(U.jsx)(S.a,{center:e,fillOpacity:.7,interactive:!0,eventHandlers:{dblclick:function(e){},click:function(e){}}},t)})),O.size>0&&Array.from(O).map((function(e,t){return Object(U.jsx)(w.a,{positions:[[e[0],e[1]],[e[2],e[3]]]},t)})),J.size>0&&Array.from(J).map((function(e,t){return Object(U.jsx)(k.a,{position:e,interactive:!1,icon:I},t)})),q.size>0&&Array.from(q).map((function(e,t){return Object(U.jsx)(k.a,{position:e,interactive:!1,icon:z},t)})),Q&&Object(U.jsx)(k.a,{position:Q,icon:E,interactive:!1})]})})]})})},P=o.a.Header,J=o.a.Content,M=o.a.Footer,Y=function(){return Object(U.jsx)(l.a,{children:Object(U.jsxs)(o.a,{className:"layout",children:[Object(U.jsx)(P,{children:Object(U.jsxs)(s.a,{theme:"dark",mode:"horizontal",children:[Object(U.jsxs)(s.a.Item,{children:["Play",Object(U.jsx)(l.b,{to:"/NSG-Demo/"})]},"1"),Object(U.jsxs)(s.a.Item,{children:["Create",Object(U.jsx)(l.b,{to:"/NSG-Demo/create"})]},"2")]})}),Object(U.jsxs)(J,{style:{padding:"0 50px"},children:[Object(U.jsx)(d.a,{exact:!0,path:"/NSG-Demo/",component:G}),Object(U.jsx)(d.a,{exact:!0,path:"/NSG-Demo/create",component:H})]}),Object(U.jsx)(M,{style:{textAlign:"center"},children:"Game Demo \xa92021 Created Lim Kar Aik"})]})})};var Z=function(){return Object(U.jsx)("div",{className:"App",children:Object(U.jsx)(Y,{})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,270)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),i(e),r(e),c(e),a(e)}))};a.a.render(Object(U.jsx)(r.a.StrictMode,{children:Object(U.jsx)(Z,{})}),document.getElementById("root")),q()}},[[248,1,2]]]);
//# sourceMappingURL=main.a93cb30a.chunk.js.map