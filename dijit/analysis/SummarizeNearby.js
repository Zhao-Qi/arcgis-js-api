// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dojo/fx/easing","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","./TrafficTime","dojo/i18n!../../nls/jsapi","dojo/text!./templates/SummarizeNearby.html"],function(e,t,s,i,a,r,n,o,h,l,u,c,y,m,d,p,_,g,S,f,b,v,L,T,N,M,w,k,C,A,U,O,j,x,B,F,P,I,D,R){var H=t([g,S,f,b,v,B,x],{declaredClass:"esri.dijit.analysis.SummarizeNearby",templateString:R,widgetsInTemplate:!0,sumNearbyLayer:null,summaryLayers:null,summaryFields:null,nearType:null,outputLayerName:null,summarizeMetric:!0,summaryLayer:null,groupByField:null,minorityMajority:!1,percentPoints:!1,distances:null,units:null,shapeUnits:null,sumShape:!0,enableTravelModes:!0,i18n:null,toolName:"SummarizeNearby",helpFileName:"SummarizeNearby",resultParameter:"resultLayer",constructor:function(e){this._pbConnects=[],this._statsRows=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects,this._driveTimeClickHandles&&this._driveTimeClickHandles.length>0&&(i.forEach(this._driveTimeClickHandles,a.disconnect),this._driveTimeClickHandles=null)},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,D.bufferTool),s.mixin(this.i18n,D.driveTimes),s.mixin(this.i18n,D.summarizeNearbyTool)},postCreate:function(){this.inherited(arguments),d.add(this._form.domNode,"esriSimpleForm"),this._breakValuesInput.set("validator",s.hitch(this,this.validateDistance)),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_handleShowCreditsClick:function(e){if(e.preventDefault(),this._form.validate()){var t,i={};t=this.summaryLayers[this._layersSelect.get("value")],i.summaryLayer=r.toJson(P.constructAnalysisInputLyrObj(t)),i.nearType=this.get("nearType"),i.sumNearbyLayer=r.toJson(P.constructAnalysisInputLyrObj(this.sumNearbyLayer)),i.summaryFields=r.toJson(this.get("summaryFields")),i.distances=r.toJson(this.get("distances")),i.units=this._distanceUnitsSelect.get("value"),this._trafficTimeWidget.get("checked")&&(i.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(i.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(i.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),i.sumShape=this._sumMetricCheck.get("checked"),("esriGeometryPoint"!==t.geometryType||"esriGeometryMultipoint"!==t.geometryType)&&(i.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(i.groupByField=this._groupBySelect.get("value")),i.returnBoundaries=this.get("returnBoundaries"),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,i).then(s.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))}},_handleSaveBtnClick:function(){if(this._form.validate()){if(!this._sumMetricCheck.get("checked")&&0===this.get("summaryFields").length)return void this._showMessages(this.i18n.statsRequiredMsg);this._saveBtn.set("disabled",!0);var e,t,s,i={},a={};e=this.summaryLayers[this._layersSelect.get("value")],i.summaryLayer=r.toJson(P.constructAnalysisInputLyrObj(e)),s=this._nearTypeSelect.getOptions(this._nearTypeSelect.get("value")),i.nearType=s.travelMode?r.toJson(s.travelMode):this._nearTypeSelect.get("value"),i.sumNearbyLayer=r.toJson(P.constructAnalysisInputLyrObj(this.sumNearbyLayer)),i.summaryFields=r.toJson(this.get("summaryFields")),i.distances=this.get("distances"),i.units=this._distanceUnitsSelect.get("value"),this._trafficTimeWidget.get("checked")&&(i.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(i.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),i.returnBoundaries=this.get("returnBoundaries"),this.returnFeatureCollection||(i.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),i.sumShape=this._sumMetricCheck.get("checked"),("esriGeometryPoint"!==e.geometryType||"esriGeometryMultipoint"!==e.geometryType)&&(i.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(i.groupByField=this._groupBySelect.get("value"),this.resultParameter=["resultLayer","groupBySummary"],i.minorityMajority=this.get("minorityMajority"),i.percentShape=this.get("percentPoints")),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),i.context=r.toJson(t)),a.jobParams=i,this._saveBtn.set("disabled",!1),a.itemParams={description:l.substitute(this.i18n.itemDescription,{sumNearbyLayerName:this.sumNearbyLayer.name,summaryLayerName:e.name}),tags:l.substitute(this.i18n.itemTags,{sumNearbyLayerName:this.sumNearbyLayer.name,summaryLayerName:e.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(a.itemParams.folder=this.get("folderId")),this.execute(a)}},_initializeShapeUnits:function(e){this._prevGeometryType&&this._prevGeometryType===e||(this._shapeUnitsSelect.removeOption(this._shapeUnitsSelect.getOptions()),u.set(this._shapeUnitsSelect.domNode,"display","esriGeometryPoint"===e||"esriGeometryMultipoint"===e?"none":""),"esriGeometryPolygon"===e?(this._shapeUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm},{value:"SquareMeters",label:this.i18n.sqMeters},{value:"Hectares",label:this.i18n.hectares},{value:"Acres",label:this.i18n.acres}]),"Kilometers"!==this.units||this.shapeUnits?"Kilometers"===this.get("shapeUnits")&&this.set("shapeUnits","SquareKilometers"):this.shapeUnits="SquareKilometers"):"esriGeometryPolyline"===e&&(this._shapeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters},{value:"Yards",label:this.i18n.yards}]),"Kilometers"!==this.units||this.shapeUnits?"SquareKilometers"===this.get("shapeUnits")&&this.set("shapeUnits","Kilometers"):this.shapeUnits="Kilometers"),this._shapeUnitsSelect.set("value",this.get("shapeUnits")),this._prevGeometryType=e)},_handleLayerChange:function(e){var t;"browse"===e?(this._isAnalysisSelect=!1,this._browsedlg.show()):"browselayers"===e?(this.showGeoAnalyticsParams&&(m=this._browseLyrsdlg.browseItems.get("query"),m.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",m)),this._isAnalysisSelect=!1,this._browseLyrsdlg.show()):(t=this.summaryLayers[e],t&&(this.sumNearbyLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:t.name,sumNearbyLayerName:this.sumNearbyLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this._initializeShapeUnits(t.geometryType),"esriGeometryPolygon"===t.geometryType&&(c.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),c.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),("esriGeometryPoint"===t.geometryType||"esriGeometryMultipoint"===t.geometryType)&&(c.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),c.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===t.geometryType&&(c.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),c.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")),this.set("groupBySelect",this.groupByField),this._removeStatsRows(),this._createStatsRow()))},_handleAttrSelectChange:function(e){var t,i,a;"0"!==e&&(t=this.get("statisticSelect"),"0"!==t.get("value")&&(t.get("isnewRowAdded")||(i=t.get("removeTd"),u.set(i,"display","block"),a=t.get("referenceWidget"),s.hitch(a,a._createStatsRow()),a._sumMetricCheck.set("disabled",!1),t.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(e,t,i){var a,r,n;this.get("attributeSelect")&&(a=this.get("attributeSelect"),"0"!==a.get("value")&&"0"!==i&&(this.get("isnewRowAdded")||(r=this.get("removeTd"),u.set(r,"display","block"),n=this.get("referenceWidget"),s.hitch(n,n._createStatsRow()),n._sumMetricCheck.set("disabled",!1),this.set("isnewRowAdded",!0))))},_handleDistValueChange:function(){this.set("outputLayerName")},_handleDistUnitsChange:function(e){this.set("outputLayerName"),this.set("units",e)},_handleShapeUnitsChange:function(e){this.set("shapeUnits",e)},_handleDistanceTypeChange:function(e){this.set("nearType",e);var t,s,i;i=this._nearTypeSelect.getOptions(this._nearTypeSelect.get("value")),j.isDefined(i)?(t="Time"===i.units,s="Time"===i.units&&"driving"===i.modei18nKey):(t=-1!==e.indexOf("Time"),s="DrivingTime"===e),u.set(this._useTrafficRow,"display",s?"":"none"),this._trafficTimeWidget.set("disabled",!s),this._trafficTimeWidget.set("reset",!s),t?(this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}]),this.set("units",this._distanceUnitsSelect.get("value"))):(this.get("units")&&this.set("units",this.get("units")),this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._distanceUnitsSelect.set("value",this.units)),this.set("outputLayerName")},_handleGroupBySelectChange:function(e){var t="0"===e;d.toggle(this._minmajorityLabel,"esriAnalysisTextDisabled",t),d.toggle(this._percentPointsLabel,"esriAnalysisTextDisabled",t),this._percentPointsCheck.set("disabled",t),this._minmajorityCheck.set("disabled",t)},_save:function(){},_buildUI:function(){var e;P.initHelpLinks(this.domNode,this.showHelp),u.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.get("showSelectAnalysisLayer")&&(!this.get("sumNearbyLayer")&&this.get("sumNearbyLayers")&&this.set("sumNearbyLayer",this.sumNearbyLayers[0]),P.populateAnalysisLayers(this,"sumNearbyLayer","sumNearbyLayers")),this.distances?this._breakValuesInput.set("value",this.distances.toString().replace(/,/g," ")):(this.distances=[],this.distances.push(this._breakValuesInput.get("value"))),P.populateTravelModes({selectWidget:this._nearTypeSelect,addStraightLine:!0,widget:this,enableTravelModes:this.get("enableTravelModes")}),this.sumNearbyLayer&&(c.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.summarizeDefine,{sumNearbyLayerName:this.sumNearbyLayer.name})),"esriGeometryPoint"!==this.sumNearbyLayer.geometryType&&(this.set("enableTravelModes",!1),this._updateTravelModes(!1))),this.units&&this._distanceUnitsSelect.set("value",this.units),this.summaryLayers&&(i.forEach(this.summaryLayers,function(e,t){e!==this.sumNearbyLayer&&(this._layersSelect.addOption({value:t,label:e.name}),this.summaryLayer&&this.summaryLayer===e&&this._layersSelect.set("value",t))},this),e=this.summaryLayers[this._layersSelect.get("value")],e&&(!this.outputLayerName&&this.sumNearbyLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:e.name,sumNearbyLayerName:this.sumNearbyLayer.name})),c.set(this._addStatsLabel,"innerHTML",l.substitute(this.i18n.addStats,{summaryLayerName:e.name})),this._initializeShapeUnits(e.geometryType),this.shapeUnits&&this._shapeUnitsSelect.set("value",this.shapeUnits),"esriGeometryPolygon"===e.geometryType&&(c.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),c.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),("esriGeometryPoint"===e.geometryType||"esriGeometryMultipoint"===e.geometryType)&&(c.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),c.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===e.geometryType&&(c.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),c.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")))),P.addReadyToUseLayerOption(this,[this._analysisSelect,this._layersSelect]),this.outputLayerName&&this._outputLayerInput.set("value",this.outputLayerName),!this.sumShape&&this.summaryFields&&this._sumMetricCheck.set("checked",this.sumShape),this._createStatsRow(),i.forEach(this.summaryFields,function(e){var t=e.split(" ");this._currentAttrSelect.set("value",t[0]),s.hitch(this._currentAttrSelect,this._handleAttrSelectChange,t[0])(),this._currentStatsSelect.set("value",t[1]),s.hitch(this._currentStatsSelect,this._handleStatsValueUpdate,"value","",t[1])()},this),u.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(e){this.folderStore=e,P.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.set("groupBySelect",this.groupByField),this.minorityMajority&&this._minmajorityCheck.set("checked",this.minorityMajority),this.percentPoints&&this._percentPointsCheck.set("checked",this.percentPoints),this._handleDistanceTypeChange("StraightLine"),this._loadConnections()},validateDistance:function(){var e,t,a,r,n=this,o=[];return this.set("distances"),e=s.trim(this._breakValuesInput.get("value")).split(" "),"StraightLine"!==this._nearTypeSelect.get("value")&&(r=P.getMaxInputByMode({type:this._nearTypeSelect.get("value").replace("-",""),units:this._distanceUnitsSelect.get("value")})),0===e.length?!1:(i.forEach(e,function(e){return e=p.parse(e),isNaN(e)?(o.push(0),!1):e>r?(o.push(0),!1):(t=p.format(e,{locale:"root"}),j.isDefined(t)?j.isDefined(t)||(t=p.format(e,{locale:"en-us"})):t=p.format(e,{locale:"en"}),j.isDefined(t)&&(a=s.trim(t).match(/\D/g)),void(a&&i.forEach(a,function(e){o.push("."===e||","===e?1:"-"===e&&"polygon"===n.inputType?1:0)})))}),-1!==i.indexOf(o,0)?(this._breakValuesInput.focus(),!1):!0)},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1)),this._driveTimeClickHandles=[],this._driveTimeClickHandles.push(a.connect(this._nearTypeSelect,"onChange",s.hitch(this,"_handleDistanceTypeChange"))),this.watch("enableTravelModes",s.hitch(this,function(e,t,s){this._updateTravelModes(s)}))},_createStatsRow:function(){var t,i,r,n,o,h,l,u;return u=this.summaryLayers[this._layersSelect.get("value")],t=y.create("tr",null,this._afterStatsRow,"before"),r=y.create("td",{style:{width:"45%",maxWidth:"100px"}},t),i=y.create("td",{style:{width:"55%",maxWidth:"104px"}},t),n=new w({maxHeight:200,"class":"esriLeadingMargin1 mediumInput esriTrailingMargin05 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},y.create("select",null,r)),this.set("attributes",{selectWidget:n,summaryLayer:u}),o=new w({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},y.create("select",null,i)),this.set("statistics",{selectWidget:o}),n.set("statisticSelect",o),a.connect(n,"onChange",this._handleAttrSelectChange),l=y.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},t),h=y.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+e.toUrl("./images/close.gif")+"' border='0''/>"},l),a.connect(h,"onclick",s.hitch(this,this._handleRemoveStatsBtnClick,t)),this._statsRows.push(t),o.set("attributeSelect",n),o.set("removeTd",l),o.set("isnewRowAdded",!1),o.set("referenceWidget",this),o.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=o,this._currentAttrSelect=n,!0},_handleRemoveStatsBtnClick:function(e){this._removeStatsRow(e),0===this.get("summaryFields").length&&(this._sumMetricCheck.set("disabled",!0),this._sumMetricCheck.set("checked",!0))},_removeStatsRows:function(){i.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_removeStatsRow:function(e){i.forEach(L.findWidgets(e),function(e){e.destroyRecursive()}),y.destroy(e)},_handleAnalysisLayerChange:function(e){"browse"===e?(this._isAnalysisSelect=!0,this._browsedlg.show()):"browselayers"===e?(this.showGeoAnalyticsParams&&(m=this._browseLyrsdlg.browseItems.get("query"),m.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",m)),this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(this.sumNearbyLayer=this.sumNearbyLayers[e],this._updateAnalysisLayerUI(!0))},_handleBrowseItemsSelect:function(e){e&&e.selection&&P.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.sumNearbyLayers:this.summaryLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:this._browsedlg,widget:this}).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_updateAnalysisLayerUI:function(e){var t,s,a=this.summaryLayers[this._layersSelect.get("value")],r=this._layersSelect.get("value");e&&this.get("sumNearbyLayer")&&a&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:a.name,sumNearbyLayerName:this.sumNearbyLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.summaryLayers&&this.sumNearbyLayer&&(t=i.some(this._layersSelect.getOptions(),function(e){return"browse"===e.value},this),s=i.some(this._layersSelect.getOptions(),function(e){return"browselayers"===e.value},this),this._layersSelect.removeOption(this._layersSelect.getOptions()),i.forEach(this.summaryLayers,function(e,t){var s=!0;e.url&&this.sumNearbyLayer.url&&e.url!==this.sumNearbyLayer.url?s=!1:this.sumNearbyLayer===e||e.analysisReady&&this.sumNearbyLayer.analysisReady||(s=!1),s||(this._layersSelect.addOption({value:t,label:e.name}),r===t&&this._layersSelect.set("value",t))},this),(this.get("showReadyToUseLayers")||this.get("showBrowseLayers")||t||s)&&this._layersSelect.addOption({type:"separator",value:""}),this.get("showReadyToUseLayers")&&t&&this._layersSelect.addOption({value:"browse",label:this.i18n.browseAnalysisTitle}),this.get("showBrowseLayers")&&s&&this._layersSelect.addOption({value:"browselayers",label:this.i18n.browseLayers}))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setSumNearbyLayersAttr:function(e){this.sumNearbyLayers=e},_setSumNearbyLayerAttr:function(e){this.sumNearbyLayer=e},_setSummaryLayersAttr:function(e){this.summaryLayers=e},_setSummaryLayerAttr:function(e){this.summaryLayer=e},_setLayersAttr:function(){this.summaryLayers=[]},_setAttributesAttr:function(e){if(e.summaryLayer){var t,s,a;t=e.summaryLayer,s=e.selectWidget,a=t.fields,s.addOption({value:"0",label:this.i18n.attribute}),i.forEach(a,function(e){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)&&s.addOption({value:e.name,label:j.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this)}},_setStatisticsAttr:function(e){var t=e.selectWidget;t.addOption({value:"0",label:this.i18n.statistic}),t.addOption({value:"SUM",label:this.i18n.sum}),t.addOption({value:"MIN",label:this.i18n.minimum}),t.addOption({value:"MAX",label:this.i18n.maximum}),t.addOption({value:"MEAN",label:this.i18n.average}),t.addOption({value:"STDDEV",label:this.i18n.standardDev})},_setSummaryFieldsAttr:function(e){this.summaryFields=e},_getSummaryFieldsAttr:function(){var e="",t=[];return m(".statsSelect",this.domNode).forEach(function(s){var i,a;i=L.byNode(s),a=i.get("attributeSelect"),"0"!==a.get("value")&&"0"!==i.get("value")&&(e+=a.get("value")+" "+i.get("value")+";",t.push(a.get("value")+" "+i.get("value")))}),t},_setGroupBySelectAttr:function(e){var t=this.summaryLayers[this._layersSelect.get("value")],s=j.isDefined(t)?t.fields:[];this._groupBySelect.getOptions().length>0&&this._groupBySelect.removeOption(this._groupBySelect.getOptions()),this._groupBySelect.addOption({value:"0",label:this.i18n.attribute}),i.forEach(s,function(e){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeString","esriFieldTypeDate"],e.type)&&e.name!==t.objectIdField&&this._groupBySelect.addOption({value:e.name,label:j.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this),e&&this._groupBySelect.set("value",e),this._handleGroupBySelectChange(this._groupBySelect.get("value"))},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setNearTypeAttr:function(e){this.nearType=e},_getNearTypeAttr:function(){return this.nearType},_setDistancesAttr:function(e){if(e)this.distances=e;else if(this._breakValuesInput&&this._breakValuesInput.get("value")){var t=s.trim(this._breakValuesInput.get("value")).split(" "),a=[];i.forEach(t,function(e){a.push(p.parse(e))}),this.distances=a}},_getDistancesAttr:function(){return this.distances},_setUnitsAttr:function(e){this.units=e},_getUnitsAttr:function(){return this.units},_setShapeUnitsAttr:function(e){this.shapeUnits=e},_getShapeUnitsAttr:function(){return this.shapeUnits},_getSumShapeAttr:function(){return this._sumMetricCheck.get("checked")},_setSumShapeAttr:function(e){this.sumShape=e},_setMinorityMajorityAttr:function(e){this.minorityMajority=e},_getMinorityMajorityAttr:function(){return this._minmajorityCheck&&(this.minorityMajority=this._minmajorityCheck.get("checked")),this.minorityMajority},_setPercentPointsAttr:function(e){this.percentPoints=e},_getPercentPointsAttr:function(){return this._percentPointsCheck&&(this.percentPoints=this._percentPointsCheck.get("checked")),this.percentPoints},_setEnableTravelModesAttr:function(e){this._set("enableTravelModes",e)},_getReturnBoundariesAttr:function(){return this._returnBdrycCheck&&(this.returnBoundaries=this._returnBdrycCheck.get("checked")),this.returnBoundaries},_setReturnBoundariesAttr:function(e){this.returnBoundaries=e},validateServiceName:function(e){return P.validateServiceName(e,{textInput:this._outputLayerInput})},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))},_showMessages:function(e){c.set(this._bodyNode,"innerHTML",e),n.fadeIn({node:this._errorMessagePane,easing:_.quadIn,onEnd:s.hitch(this,function(){u.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),n.fadeOut({node:this._errorMessagePane,easing:_.quadOut,onEnd:s.hitch(this,function(){u.set(this._errorMessagePane,{display:"none"})})}).play()},_updateTravelModes:function(e){var t=this._nearTypeSelect.getOptions();i.forEach(t,function(t){"StraightLine"!==t.value&&(t.disabled=!e)}),this._nearTypeSelect.updateOption(t)}});return o("extend-esri")&&s.setObject("dijit.analysis.SummarizeNearby",H,O),H});