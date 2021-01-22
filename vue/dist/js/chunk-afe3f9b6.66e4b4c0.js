(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afe3f9b6"],{"06a1":function(t,e,s){"use strict";var r=s("09c7"),a=s.n(r);a.a},"09c7":function(t,e,s){},1330:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main-container"},[s("b-card",{staticClass:"text-dark text-center",attrs:{"header-tag":"header","footer-tag":"footer"},scopedSlots:t._u([{key:"header",fn:function(){return[s("h2",{staticStyle:{"font-variant-caps":"small-caps"}},[t._v(t._s(t.experiment.title))]),s("expBadge",{attrs:{status:t.experiment.status}})]},proxy:!0},{key:"footer",fn:function(){return[s("b-button",{attrs:{variant:"info",disabled:""}},[s("b-icon",{attrs:{icon:"pencil-square"}}),t._v(" Edit")],1)]},proxy:!0}])},[s("b-card-text",{staticClass:"p-3"},[s("b-row",[s("b-col",[s("strong",[t._v("Supervised by")]),s("br"),t._v(" "+t._s(t.experiment.supervisor)+" ")]),s("b-col",[s("img",{staticClass:"mb-3",attrs:{src:t.defaultExperimentLogo,alt:"Experiment logo",width:"250px"}}),s("br")]),s("b-col",[s("strong",[t._v("Carried by")]),s("br"),t._l(t.experiment.operators,(function(e){return s("div",{key:e},[t._v(t._s(e))])}))],2)],1),s("b-container",{staticClass:"mb-2 py-3"},[s("h4",[t._v("Abstract")]),t._v(" "+t._s(t.experiment.abstract)+" ")]),s("b-container",{staticClass:"mb-2 py-3"},[s("h4",[t._v("Description")]),t._v(" "+t._s(t.experiment.description)+" ")]),s("b-container",{staticClass:"my-2 py-3",staticStyle:{"border-top-style":"solid","border-top-width":"1px"}},[s("h4",[t._v("Protocol")]),s("ul",t._l(t.experiment.procedures,(function(e){return s("li",{key:e.nick,staticClass:"hover-pointer hover-bg-grey",on:{click:function(s){return t.openPDF(e.title)}}},[t._v(" ["+t._s(e.type)+" > "+t._s(e.subtype)+"] "),s("strong",[t._v(t._s(e.title))])])})),0)]),s("b-container",{staticClass:"my-2 py-3",staticStyle:{"border-top-style":"solid","border-top-width":"1px"}},[s("h4",[t._v("Data")]),s("b-row",[s("b-col",{attrs:{cols:"6"}},[s("h5",[s("b-icon",{attrs:{icon:"file-earmark-richtext",variant:"primary"}}),t._v(" Textsheets")],1),s("ul",t._l(t.experiment.data.textsheets,(function(e){return s("li",{key:e.title,staticClass:"my-3"},[s("router-link",{attrs:{to:"/experiments/"+t.experiment.title+"/data/textsheets/"+e.title}},[t._v(" "+t._s(e.title)+" ")]),s("br"),s("strong",[t._v("Created:")]),t._v(" "+t._s(e.creationDate)+" "),s("strong",[t._v("by:")]),t._v(" "+t._s(e.creator)),s("br"),s("strong",[t._v("Last modified:")]),t._v(" "+t._s(e.lastModifiedDate)+" "),s("strong",[t._v("by:")]),t._v(" "+t._s(e.lastUser)+" ")],1)})),0),s("router-link",{attrs:{to:"/experiments/"+t.experiment.title+"/data/textsheets/new-entry"}},[s("b-button",{staticClass:"m-1",attrs:{variant:"primary",size:"sm"}},[s("b-icon",{attrs:{icon:"file-earmark-plus"}}),t._v(" New textsheet")],1)],1)],1),s("b-col",{attrs:{cols:"6"}},[s("h5",[s("b-icon",{attrs:{icon:"file-earmark-spreadsheet",variant:"success"}}),t._v(" Spreadsheets")],1),s("ul"),s("router-link",{attrs:{to:"/"}},[s("b-button",{staticClass:"m-1",attrs:{variant:"success",size:"sm",disabled:""}},[s("b-icon",{attrs:{icon:"file-earmark-plus"}}),t._v(" New spreadsheet")],1)],1)],1)],1)],1)],1)],1)],1)},a=[],n=(s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),s("5530")),i=s("f80e"),o=s("ab5f"),c=s("2f62"),l={components:{expBadge:i["a"]},data:function(){return{}},computed:Object(n["a"])(Object(n["a"])({},Object(c["d"])("experiment",["defaultExperimentLogo"])),{},{experiment:function(){return this.$store.getters["experiment/getExperimentByTitle"](this.$route.params.experimentTitle)}}),methods:{openPDF:function(t){o["a"].getFile(t).then((function(t){var e=new Blob([t.data],{type:"application/pdf"}),s=URL.createObjectURL(e);return s})).then((function(e){window.open(e,t)}))}}},p=l,u=(s("06a1"),s("2877")),b=Object(u["a"])(p,r,a,!1,null,"ea15e95a",null);e["default"]=b.exports},f80e:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{class:["badge",{"badge-primary":"planned"===t.status},{"badge-warning":"ongoing"===t.status},{"badge-success":"complete"===t.status},{"badge-danger":"aborted"===t.status}]},[t._v(t._s(t.status)+" ")])},a=[],n={name:"expBadge",props:["status"]},i=n,o=s("2877"),c=Object(o["a"])(i,r,a,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-afe3f9b6.66e4b4c0.js.map