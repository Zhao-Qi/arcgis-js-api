// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/extendsHelper","../../../../core/promiseUtils","../../../../core/promiseUtils","../../../../geometry/Point","../Container","../../engine/webgl/TileData","./enums","./Utils","./WGLRendererInfo"],function(e,t,o,r,s,h,p,i,n,d,u,a){Object.defineProperty(t,"__esModule",{value:!0});var l=function(i){function e(e){var t=i.call(this)||this;return t._rendererInfo=new a,t._pointToCallbacks=new Map,t._highlightIDs=new Set,t._invisibleFeatures=new Set,t._displayWidth=0,t._displayHeight=0,t._highlightOptionsUpToDate=!1,t.layer=null,t.highlightOptions=e.highlightOptions,t.tileInfoView=e.tileInfoView,t.layer=e.layer,t._layerView=e.layerView,t}return r(e,i),e.prototype.dispose=function(){this.removeAllChildren();for(var e=0,t=this.children;e<t.length;e++){t[e].dispose()}},e.prototype.disposeWebGLResources=function(){for(var e=0,t=this.children;e<t.length;e++){t[e].clear()}},e.prototype.displayWidth=function(){return this._displayWidth},Object.defineProperty(e.prototype,"displayHeight",{get:function(){return this._displayHeight},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"highlightOptions",{get:function(){return this._highlightOptions},set:function(e){this._highlightOptions=e,this._highlightOptionsUpToDate=!1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visualVariablesInfo",{get:function(){return this._visualVariablesInfo},set:function(e){this._visualVariablesInfo=e,this.requestRender()},enumerable:!0,configurable:!0}),e.prototype.hitTest=function(e,t){var i=this,r=[e,t];return s.create(function(e,t){i._pointToCallbacks.set(r,{resolve:e,reject:t}),i.requestRender()},function(){i._pointToCallbacks.has(r)&&i._pointToCallbacks.delete(r)})},e.prototype.highlight=function(e){var t=this;return t.addHighlight(e),{remove:function(){t.removeHighlight(e)}}},e.prototype.setHighlight=function(e){this._highlightIDs.clear(),this.addHighlight(e)},e.prototype.setVisibility=function(e,t){e||(e=[]),t||(t=[]);for(var i=this._invisibleFeatures,r=0,s=e;r<s.length;r++){var n=s[r];i.has(n)&&i.delete(n)}for(var a=0,l=t;a<l.length;a++){var o=l[a];i.add(o)}for(var h=0,p=this.children;h<p.length;h++){var d=p[h];d.data&&d.setVisibility(e,t)}},e.prototype.addHighlight=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];this._highlightIDs.add(r)}this._buildHLList()},e.prototype.removeHighlight=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];this._highlightIDs.delete(r)}this._buildHLList()},e.prototype.whenAttached=function(){var t=this;return this.attached?s.resolve():s.create(function(e){return t.once("attached",function(){return e()})})},e.prototype.getMaterialItems=function(a){var l=this;return this.whenAttached().then(function(){var e=a;if(l.stage&&e&&0!==e.length){for(var t=[],i=l.stage.painter.textureManager,r=0,s=e;r<s.length;r++){var n=s[r];t.push(i.rasterizeItem(n.symbol,n.glyphIds))}return h.all(t).then(function(e){return e.map(function(e,t){return{id:t,mosaicItem:e}})})}})},e.prototype.onTileData=function(e,t){var i=!(!this.layer.labelingInfo||!this.layer.labelingInfo.length),r=t.addOrUpdate&&n.decode(t.addOrUpdate),s=o({},t,{addOrUpdate:r});e.setData(s,i,this.layer.labelsVisible),e.resetVisibility(this._invisibleFeatures),e.buildHLList(this._highlightIDs),this.contains(e)||this.addChild(e),this.requestRender(),this._layerView&&this._layerView.view.labelManager.requestUpdate()},e.prototype.onTileError=function(e){e.clear(),e.buildHLList(this._highlightIDs),this.contains(e)||this.addChild(e),this.requestRender()},e.prototype.addChild=function(e){var t=i.prototype.addChild.call(this,e);return this.layer.labelingInfo&&this._layerView&&this._layerView.view.labelManager.addTile(this.layer.uid,e),this._buildHLList(),t},e.prototype.removeChild=function(e){var t=i.prototype.removeChild.call(this,e);return this.layer.labelingInfo&&this._layerView&&this._layerView.view.labelManager.removeTile(this.layer.uid,e.key.id),this._buildHLList(),t},e.prototype.renderChildren=function(e){var i=this,t=this.stage.painter;this._updateTilesTransform(e.state,this.tileInfoView.getClosestInfoForScale(e.state.scale).level),this._updateHighlightOptions(),this._rendererInfo.updateVisualVariables(this._visualVariablesInfo.vvRanges,e.state);var r=this.tileInfoView.getClosestInfoForScale(e.state.scale).level,s=this.tileInfoView.tileInfo.scaleToZoom(e.state.scale),n=o({},e,{rendererInfo:this._rendererInfo,requiredLevel:r,displayLevel:s,context:this.stage.context,painter:this.stage.painter});this._rendererInfo.updateVisualVariables(this._visualVariablesInfo.vvRanges,n.state),this.sortChildren(function(e,t){return e.key.level-t.key.level!=0?e.key.level-t.key.level:e.key.row-t.key.row!=0?e.key.row-t.key.row:e.key.col-t.key.col});var a=n.drawPhase;if(a&(d.WGLDrawPhase.LABEL|d.WGLDrawPhase.LABEL_ALPHA)){var l=this.layer;if(!(l.labelsVisible&&l.labelingInfo&&0<l.labelingInfo.length))return;this._updateTilesTransform(n.state,n.requiredLevel)}t.draw(n,this.children,a,this._painterOptions),0<this._highlightIDs.size&&t.highlight(n,this.children),0!==this._pointToCallbacks.size&&(this._pointToCallbacks.forEach(function(e,t){e.resolve(i._hitTest(n,t[0],t[1]))}),this._pointToCallbacks.clear())},e.prototype._hitTest=function(e,t,i){var r=this.stage,s=r.painter,n=r.context,a=e.requiredLevel,l=[0,0];e.state.toMap(l,[t,i]);var o=e.state.clone(),h=o.viewpoint.clone();return h.targetGeometry=new p(l[0],l[1],e.state.spatialReference),o.viewpoint=h,o.size=[u.C_HITTEST_SEARCH_SIZE,u.C_HITTEST_SEARCH_SIZE],this._updateTilesTransform(o,a),s.hitTest({globalOpacity:1,painter:s,context:n,drawPhase:d.WGLDrawPhase.HITTEST,pixelRatio:e.pixelRatio,displayLevel:e.displayLevel,rendererInfo:this._rendererInfo,requiredLevel:a,state:o,stationary:e.stationary},this.children)},e.prototype._updateTilesTransform=function(e,t){for(var i=0,r=this.children;i<r.length;i++){var s=r[i],n=this.tileInfoView.tileInfo.lods[s.key.level].resolution,a=n/(e.resolution*e.pixelRatio);s.setTransform(e,a),s.setLabelTransform(e,n)}},e.prototype._updateHighlightOptions=function(){if(!this._highlightOptionsUpToDate&&this.parent){var e=this.stage.painter,t=this._highlightOptions;if(e){var i=t.color.toRgba();i[0]/=255,i[1]/=255,i[2]/=255;var r=i.slice();i[3]*=t.fillOpacity,r[3]*=t.haloOpacity,e.setHighlightOptions({fillColor:i,outlineColor:r,outlineWidth:2,outerHaloWidth:.3,innerHaloWidth:.3,outlinePosition:0}),this._highlightOptionsUpToDate=!0}}},e.prototype._buildHLList=function(){for(var e=0,t=this.children;e<t.length;e++){t[e].buildHLList(this._highlightIDs)}this.requestRender()},e}(i.Container);t.default=l});