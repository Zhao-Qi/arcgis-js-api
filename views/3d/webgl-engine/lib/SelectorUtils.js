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

define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix","../../support/geometryUtils/boundedPlane"],function(e,r,t,i){function n(e){return function(r,n,u){return t.vec3.lerp(o,r,n,u),!i.extrusionContainsPoint(e,o)}}Object.defineProperty(r,"__esModule",{value:!0}),r.sliceFilterPredicate=n;var o=t.vec3f64.create()});