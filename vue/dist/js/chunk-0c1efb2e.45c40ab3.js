(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c1efb2e"],{"2ac9":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main-container"},[r("h3",{staticClass:"section-title"},[e._v("Procedures")]),r("b-container",{staticClass:"p-0",attrs:{fluid:""}},[r("b-row",{staticClass:"no-gutters"},[r("b-col",[e.isAllowed("activities.add_procedure")?r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.createModal",modifiers:{createModal:!0}}],staticClass:"my-3",staticStyle:{"border-radius":"15px"},attrs:{size:"lg",variant:"info"}},[r("b-icon",{attrs:{icon:"plus-circle-fill"}}),e._v(" New procedure ")],1):e._e()],1)],1)],1),r("b-card",{attrs:{"no-body":""}},[r("b-tabs",{attrs:{"content-class":"my-3",justified:"","active-nav-item-class":"font-weight-bold text-uppercase text-dark",card:""}},[e._l(e.procedureSections,(function(t){return r("b-tab",{key:t.type,attrs:{title:t.type},scopedSlots:e._u([{key:"title",fn:function(){return[r("strong",{staticStyle:{"font-variant-caps":"small-caps"}},[e._v(e._s(t.type))])]},proxy:!0}],null,!0)},[r("b-tabs",{attrs:{"content-class":"my-3",justified:"",small:"",vertical:"",pills:""}},e._l(t.subsections,(function(t){return r("b-tab",{key:t.type,scopedSlots:e._u([{key:"title",fn:function(){return[r("span",{staticStyle:{"font-variant-caps":"small-caps"}},[e._v(" "+e._s(t.type)+" ("+e._s(t.procedures.length)+") ")])]},proxy:!0}],null,!0)},[e._l(t.procedures,(function(t){return r("b-container",{key:t.title,staticClass:"text-dark py-2 px-0",staticStyle:{"font-size":"1.3em","border-top-style":"solid","border-width":"1px","border-color":"#007BFF"}},[r("b-row",{attrs:{"no-gutters":""}},[r("b-col",{staticClass:"hover-bg-grey hover-pointer",attrs:{id:t.title+"_file"},on:{click:function(r){return e.openPDF(t.title)}}},[r("strong",[e._v(e._s(t.title))])]),r("tooltip",{attrs:{target:t.title+"_file",msg:"Open the procedure PDF in a new tab"}}),r("b-col",{staticClass:"hover-bg-grey text-center",attrs:{cols:"1",id:t.title+"_info"}},[r("b-icon",{attrs:{icon:"info-circle"}})],1),r("b-tooltip",{attrs:{target:t.title+"_info",triggers:"hover",placement:"topleft"}},[r("strong",{staticClass:"text-primary"},[e._v(e._s(t.title))]),r("br"),e._v(" "+e._s(t.abstract)+" ")]),r("b-col",{staticClass:" hover-bg-grey hover-pointer text-center",attrs:{cols:"1",id:t.title+"_fav"},on:{click:function(r){return e.toggleToFavorites(t)}}},[e.favoriteProcedures.includes(t.title)?e._e():r("b-icon",{attrs:{icon:"star"}}),e.favoriteProcedures.includes(t.title)?r("b-icon",{attrs:{icon:"star-fill",variant:"warning"}}):e._e()],1),r("tooltip",{attrs:{target:t.title+"_fav",msg:"Add/remove from favorites"}}),e.isAllowed("activities.change_procedure")?r("b-col",{directives:[{name:"b-modal",rawName:"v-b-modal.editModal",modifiers:{editModal:!0}}],staticClass:"hover-bg-grey hover-pointer text-center",attrs:{cols:"1",id:t.title+"_edit"},on:{click:function(r){return e.editModal(t)}}},[r("b-icon",{attrs:{icon:"pencil-square",variant:"info"}})],1):e._e(),r("tooltip",{attrs:{target:t.title+"_edit",msg:"Edit the procedure"}})],1)],1)})),0===t.procedures.length?r("div",{staticClass:"text-center text-dark"},[e._v(" This subsection is empty. ")]):e._e()],2)})),1),0===t.subsections.length?r("div",{staticClass:"text-center text-dark"},[e._v(" This section is empty. ")]):e._e()],1)})),r("b-tab",{attrs:{title:"Favorites"},scopedSlots:e._u([{key:"title",fn:function(){return[r("b-icon",{staticClass:"mr-1",attrs:{icon:"star-fill",variant:"warning"}}),r("strong",{staticStyle:{"font-variant-caps":"small-caps"}},[e._v("Favorites")])]},proxy:!0}])},[e._l(e.favoriteProceduresObjects,(function(t){return r("b-container",{key:t.title,staticClass:"text-dark py-2 px-0",staticStyle:{"font-size":"1.3em","border-top-style":"solid","border-width":"1px","border-color":"#007BFF"}},[r("b-row",{attrs:{"no-gutters":""}},[r("b-col",{staticClass:"hover-bg-grey hover-pointer",attrs:{id:t.title+"_file_fav"},on:{click:function(r){return e.openPDF(t.title)}}},[e._v(" ["+e._s(t.type)+" > "+e._s(t.subtype)+"] "),r("strong",[e._v(e._s(t.title))])]),r("tooltip",{attrs:{target:t.title+"_file_fav",msg:"Open the procedure PDF in a new tab"}}),r("b-col",{staticClass:"hover-bg-grey text-center",attrs:{cols:"1",id:t.title+"_info_fav"}},[r("b-icon",{attrs:{icon:"info-circle"}})],1),r("b-tooltip",{attrs:{target:t.title+"_info_fav",triggers:"hover",placement:"topleft"}},[r("strong",{staticClass:"text-primary"},[e._v(e._s(t.title))]),r("br"),e._v(" "+e._s(t.abstract)+" ")]),r("b-col",{staticClass:" hover-bg-grey hover-pointer text-center",attrs:{cols:"1",id:t.title+"_fav_fav"},on:{click:function(r){return e.toggleToFavorites(t)}}},[e.favoriteProcedures.includes(t.title)?e._e():r("b-icon",{attrs:{icon:"star"}}),e.favoriteProcedures.includes(t.title)?r("b-icon",{attrs:{icon:"star-fill",variant:"warning"}}):e._e()],1),r("tooltip",{attrs:{target:t.title+"_fav_fav",msg:"Add/remove from favorites"}}),e.isAllowed("activities.change_procedure")?r("b-col",{directives:[{name:"b-modal",rawName:"v-b-modal.editModal",modifiers:{editModal:!0}}],staticClass:"hover-bg-grey hover-pointer text-center",attrs:{cols:"1",id:t.title+"_edit_fav"},on:{click:function(r){return e.editModal(t)}}},[r("b-icon",{attrs:{icon:"pencil-square",variant:"info"}})],1):e._e(),r("tooltip",{attrs:{target:t.title+"_edit_fav",msg:"Edit the procedure"}})],1)],1)})),0===e.favoriteProcedures.length?r("div",{staticClass:"text-center text-primary"},[r("strong",[e._v("Add")]),e._v(" some procedures "),r("strong",[e._v("to your favorites")]),e._v(" to see them here ! ")]):e._e()],2)],2)],1),r("b-modal",{attrs:{id:"createModal",title:"Upload a Procedure",centered:""},on:{ok:function(t){return t.preventDefault(),e.okCreate(t)},hidden:e.resetCreateModal}},[r("b-form",{ref:"createForm"},[r("b-form-group",{attrs:{label:"Title","label-for":"createdTitleInput"}},[r("b-form-input",{attrs:{id:"createdTitleInput",trim:"",required:""},model:{value:e.createdProcedure.title,callback:function(t){e.$set(e.createdProcedure,"title",t)},expression:"createdProcedure.title"}})],1),r("b-form-group",{attrs:{label:"Type","label-for":"createdTypeInput"}},[r("b-form-select",{attrs:{options:e.procedurePrimaryTypes,required:""},on:{change:e.refreshSubtypesOptions},scopedSlots:e._u([{key:"first",fn:function(){return[r("b-form-select-option",{attrs:{value:"",disabled:""}},[e._v("Select a procedure type")])]},proxy:!0}]),model:{value:e.createdProcedure.type,callback:function(t){e.$set(e.createdProcedure,"type",t)},expression:"createdProcedure.type"}})],1),r("b-form-group",{attrs:{label:"Subtype","label-for":"createdSubtypeInput"}},[r("b-form-select",{attrs:{options:e.subtypesOptions,disabled:!e.createdProcedure.type,required:""},scopedSlots:e._u([{key:"first",fn:function(){return[r("b-form-select-option",{attrs:{value:"",disabled:""}},[e._v("Select a procedure subtype")])]},proxy:!0}]),model:{value:e.createdProcedure.subtype,callback:function(t){e.$set(e.createdProcedure,"subtype",t)},expression:"createdProcedure.subtype"}})],1),r("b-form-group",{attrs:{label:"Abstract","label-for":"createdAbstractInput"}},[r("b-form-textarea",{attrs:{id:"createdAbstractInput",size:"sm","no-resize":""},model:{value:e.createdProcedure.abstract,callback:function(t){e.$set(e.createdProcedure,"abstract",t)},expression:"createdProcedure.abstract"}})],1),r("b-form-group",{attrs:{label:"File","label-for":"createdFileInput"}},[r("b-form-file",{attrs:{id:"createdFileInput",accept:".pdf",size:"md",placeholder:"Drop the procedure PDF file here","drop-placeholder":"Yosh, got it !","no-drop-placeholder":"Only PDF format is accepted",required:""},scopedSlots:e._u([{key:"file-name",fn:function(t){var o=t.names;return e._l(o,(function(t){return r("b-badge",{key:t,attrs:{pill:"",variant:"dark"}},[e._v(e._s(t))])}))}}]),model:{value:e.createdProcedure.file,callback:function(t){e.$set(e.createdProcedure,"file",t)},expression:"createdProcedure.file"}})],1)],1)],1),r("b-modal",{attrs:{id:"editModal",title:"Procedure Edit",centered:""},on:{ok:e.okEdit}},[r("form",[r("b-form-group",{attrs:{label:"File","label-for":"editedFileInput"}},[r("b-form-file",{attrs:{id:"editedFileInput",accept:".pdf",size:"md",placeholder:"Drop the procedure PDF file here","drop-placeholder":"Drop it !","no-drop-placeholder":"Only PDF files are accepted"},scopedSlots:e._u([{key:"file-name",fn:function(t){var o=t.names;return e._l(o,(function(t){return r("b-badge",{key:t,attrs:{pill:"",variant:"dark"}},[e._v(e._s(t))])}))}}]),model:{value:e.editedProcedure.file,callback:function(t){e.$set(e.editedProcedure,"file",t)},expression:"editedProcedure.file"}})],1)],1),e.isAllowed("activities.delete_procedure")?r("b-button",{staticClass:"ml-1",attrs:{size:"sm",variant:"danger"},on:{click:function(t){return e.deleteProcedure(e.editedProcedure)}}},[r("b-icon",{attrs:{icon:"trash"}}),e._v(" Delete procedure ")],1):e._e()],1),e.isUploading?r("b-progress",{attrs:{max:"100",variant:"primary","show-progress":"",animated:""}},[r("b-progress-bar",{attrs:{value:e.uploadProgress}},[e._v(" "+e._s(e.uploadProgress)+"% ")])],1):e._e()],1)},a=[],i=(r("7db0"),r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),r("5530")),s=r("ab5f"),c=r("7938"),n=r("8530"),l=r("d4ec"),d=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0;Object(l["a"])(this,e),this.title=t,this.type=r,this.subtype=o,this.abstract=a,this.file=i},u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-tooltip",{attrs:{target:e.target,triggers:"hover",delay:{show:800,hide:50},variant:"light"}},[e._v(" "+e._s(e.msg)+" ")])},p=[],f={name:"tooltip",props:["target","msg"]},b=f,v=r("2877"),h=Object(v["a"])(b,u,p,!1,null,null,null),g=h.exports,m=r("2f62"),y={components:{tooltip:g},data:function(){return{createdProcedure:new d,editedProcedure:new d,subtypesOptions:[],isUploading:!1,typesColorVariants:[{type:"Logistics",colorVariant:"dark"},{type:"Contacts",colorVariant:"warning"},{type:"Emergencies",colorVariant:"danger"}],createdSubtype:""}},computed:Object(i["a"])(Object(i["a"])(Object(i["a"])(Object(i["a"])({},Object(m["d"])("procedure",["procedures","procedureTypes","uploadProgress"])),Object(m["d"])("user",["favoriteProcedures"])),Object(m["c"])("procedure",{procedureSections:"proceduresByType",procedurePrimaryTypes:"procedurePrimaryTypes"})),Object(m["c"])("user",["isAllowed","favoriteProceduresObjects"])),methods:{editModal:function(e){this.editedProcedure=e},toggleToFavorites:function(e){console.log(e.title),this.$store.dispatch("user/toggleToFavorites",e)},refreshSubtypesOptions:function(){var e=this,t=this.procedureTypes.find((function(t){return t.primaryType===e.createdProcedure.type}));t&&(this.subtypesOptions=t.subtypes)},openPDF:function(e){var t=this;s["a"].getFile(e).then((function(e){var t=new Blob([e.data],{type:"application/pdf"}),r=URL.createObjectURL(t);return r})).then((function(t){window.open(t,e)})).catch((function(){n["a"].toastError(t,"Could not open PDF","Could not open the PDF you are looking for.")}))},checkTitle:function(e){return e.title.length>0},checkAbstract:function(e){return e.title.length>=0},checkProcedure:function(e){return""===e.abstract?!!this.checkTitle(e)&&(e.abstract="No abstract provided.",!0):this.checkTitle(e)&&this.checkAbstract(e)},checkCreateForm:function(){var e=this.$refs["createForm"].checkValidity()&&this.checkProcedure(this.createdProcedure);return e},okCreate:function(){this.checkCreateForm()?this.createProcedure(this.createdProcedure):c["a"].okMessage(this,"Invalid form")},createProcedure:function(e){var t=this;this.isUploading=!0,this.$store.dispatch("procedure/createProcedure",e).then((function(){t.$bvModal.hide("createModal"),n["a"].toastSuccess(t,"Procedure created","The procedure has been successfully created.")})).catch((function(){n["a"].toastError(t,"Could not create","Could not create the procedure.")})).then((function(){t.isUploading=!1}))},resetCreateModal:function(){this.createdProcedure=new d},okEdit:function(){this.checkProcedure(this.editedProcedure)&&this.editProcedure(this.editedProcedure)},editProcedure:function(e){var t=this;this.isUploading=!0,this.$store.dispatch("procedure/updateProcedure",e).then((function(){n["a"].toastSuccess(t,"Procedure updated","The procedure has been successfully updated.")})).catch((function(){n["a"].toastError(t,"Could not update","Could not update the procedure.")})).then((function(){t.isUploading=!1}))},deleteProcedure:function(e){var t=this;c["a"].confirmDelete(this,"Do you really want to remove this procedure from the database ?").then((function(r){r&&t.$store.dispatch("procedure/deleteProcedure",e).then((function(){t.$bvModal.hide("editModal"),n["a"].toastSuccess(t,"Procedure deleted","The procedure has been successfully deleted.")})).catch((function(){n["a"].toastError(t,"Could not delete","Could not delete the procedure.")}))}))},okCreateSubtype:function(){},reloadProcedures:function(){this.$store.dispatch("getProcedureState")}}},_=y,P=Object(v["a"])(_,o,a,!1,null,null,null);t["default"]=P.exports},7938:function(e,t,r){"use strict";var o=r("d4ec"),a=r("bee2"),i=function(){function e(){Object(o["a"])(this,e)}return Object(a["a"])(e,[{key:"confirmDelete",value:function(e,t){return e.$bvModal.msgBoxConfirm(t,{title:"Confirm Delete",size:"sm",buttonSize:"md",okVariant:"danger",okTitle:"YES",cancelTitle:"NO",footerClass:"p-2",centered:!0}).then((function(e){return e})).catch((function(e){return console.log(e)}))}},{key:"okMessage",value:function(e,t){return e.$bvModal.msgBoxOk(t,{title:"Confirm Delete",size:"sm",buttonSize:"md",okVariant:"primary",cancelTitle:"",footerClass:"p-2",hideHeader:!0,centered:!0}).catch((function(e){return console.log(e)}))}}]),e}();t["a"]=new i},8530:function(e,t,r){"use strict";var o=r("d4ec"),a=r("bee2"),i=function(){function e(){Object(o["a"])(this,e)}return Object(a["a"])(e,[{key:"toastSuccess",value:function(e,t,r){return e.$bvToast.toast(r,{title:t,variant:"success",solid:!0})}},{key:"toastInfo",value:function(e,t,r){return e.$bvToast.toast(r,{title:t,variant:"info",solid:!0})}},{key:"toastWarning",value:function(e,t,r){return e.$bvToast.toast(r,{title:t,variant:"warning",solid:!0})}},{key:"toastError",value:function(e,t,r){return e.$bvToast.toast(r,{title:t,variant:"danger",solid:!0})}}]),e}();t["a"]=new i}}]);
//# sourceMappingURL=chunk-0c1efb2e.45c40ab3.js.map