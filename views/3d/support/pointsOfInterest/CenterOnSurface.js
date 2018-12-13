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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/now","../../../../core/accessorSupport/decorators","../../../../core/libs/gl-matrix-2/gl-matrix","../../../../geometry/Point","../debugFlags","../earthUtils","../mathUtils","../PropertiesPool","./PointOfInterest"],function(e,t,r,i,a,n,o,s,c,u,l,d,p){Object.defineProperty(t,"__esModule",{value:!0});var f=Array,h=function(e){function t(t){var r=e.call(this,t)||this;return r.propertiesPool=new d.default({location:s,renderLocation:f},r),r._dirtyTimeStamp=0,r.currentSurfaceAltitude=0,r.latestSurfaceAltitude=0,r.distance=0,r.renderLocation=o.vec3f64.create(),r}r(t,e),p=t,t.prototype.initialize=function(){var e=this;this._frameWorker=this.resourceController.registerFrameWorker(function(){return e.measureSurfaceAltitude()},function(){return e.needsUpdate()}),this.measureSurfaceAltitude()},t.prototype.destroy=function(){this._frameWorker&&(this._frameWorker.remove(),this._frameWorker=null)},Object.defineProperty(t.prototype,"location",{get:function(){var e=this.propertiesPool.get("location");return this.renderCoordsHelper.fromRenderCoords(this.renderLocation,e,this.state.spatialReference),e},enumerable:!0,configurable:!0}),t.prototype.update=function(e){this._setDirty(),this.updateCenterOnSurface()},t.prototype.forceUpdate=function(){this.measureSurfaceAltitude(),this.updateCenterOnSurface()},t.prototype.hasPendingUpdates=function(){return this._dirtyTimeStamp>0},Object.defineProperty(t.prototype,"estimatedSurfaceAltitude",{get:function(){return this.latestSurfaceAltitude},enumerable:!0,configurable:!0}),t.prototype._setDirty=function(){this._dirtyTimeStamp=this._dirtyTimeStamp||a()},t.prototype.needsUpdate=function(){return this._dirtyTimeStamp>0&&a()-this._dirtyTimeStamp>=this.altitudeEstimationInterval},t.prototype.measureSurfaceAltitude=function(){this.latestSurfaceAltitude=this.estimateSurfaceAltitudeAtCenter(),this.updateCenterOnSurface(),this._dirtyTimeStamp=0},t.prototype.updateCenterOnSurface=function(){var e=y,t=this.calculateSurfaceIntersection(this.currentSurfaceAltitude,e),r=this.currentSurfaceAltitude!==this.latestSurfaceAltitude;!t&&r&&(t=this.calculateSurfaceIntersection(this.latestSurfaceAltitude,e))&&(this.currentSurfaceAltitude=this.latestSurfaceAltitude);var i=S;if(t&&this.latestSurfaceAltitudeChangesDistanceSignificantly(e,i)&&(o.vec3.copy(e,i),this.currentSurfaceAltitude=this.latestSurfaceAltitude),t){var a=o.vec3.distance(this.state.camera.eye,e);a!==this._get("distance")&&this._set("distance",a)}else{var n=this.state.camera;o.vec3.scale(e,n.viewForward,this._get("distance")),o.vec3.add(e,e,n.eye)}var s=this._get("renderLocation");s[0]===e[0]&&s[1]===e[1]&&s[2]===e[2]||this._set("renderLocation",o.vec3.copy(this.propertiesPool.get("renderLocation"),e))},t.prototype.calculateSurfaceIntersection=function(e,t){var r=this.state.camera;if(!this.renderCoordsHelper.intersectManifold(r.ray,e,t))return!1;if(this.state.isGlobal){var i=u.earthRadius+e,a=o.vec3.squaredLength(r.eye),n=a<i*i,s=o.vec3.distance(r.eye,t);if(n&&s>u.earthRadius/4){var c=i-Math.sqrt(a);return o.vec3.scale(t,r.viewForward,c),o.vec3.add(t,t,r.eye),!0}}else{var d=this.surface.ready&&this.surface.extent;d&&(t[0]=l.clamp(t[0],d[0],d[2]),t[1]=l.clamp(t[1],d[1],d[3]))}return!0},t.prototype.latestSurfaceAltitudeChangesDistanceSignificantly=function(e,t){if(this.latestSurfaceAltitude===this.currentSurfaceAltitude||null==e)return!1;if(this.calculateSurfaceIntersection(this.latestSurfaceAltitude,t)){var r=this.state.camera.eye,i=o.vec3.distance(r,e),a=o.vec3.distance(r,t),n=Math.abs(a-i);if(c.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS)return!0;if(n/i>p.RELATIVE_ALTITUDE_CHANGE_THRESHOLD)return!0}return!1};var p;return t.RELATIVE_ALTITUDE_CHANGE_THRESHOLD=.05,i([n.property({constructOnly:!0})],t.prototype,"resourceController",void 0),i([n.property({constructOnly:!0})],t.prototype,"altitudeEstimationInterval",void 0),i([n.property({readOnly:!0})],t.prototype,"distance",void 0),i([n.property({constructOnly:!0})],t.prototype,"estimateSurfaceAltitudeAtCenter",void 0),i([n.property({readOnly:!0,dependsOn:["renderLocation"]})],t.prototype,"location",null),i([n.property({readOnly:!0})],t.prototype,"renderLocation",void 0),t=p=i([n.subclass("esri.views.3d.support.CenterOnSurface")],t)}(n.declared(p.PointOfInterest));t.CenterOnSurface=h;var y=o.vec3f64.create(),S=o.vec3f64.create();t.default=h});