// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.29/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","../../ChartTypes","../../ChartDataLabelsTypes","../../plots/Pie","../../plots/Donut","../../plots/Gauge","../../plots/Ring","../../plots/_TouchPlotEvents","../ChartPlots","./_RoundChartSeriesCalculator","./_GaugeChartSeriesCalculator","../utils/ChartDataLabelBuilder"],function(a,e,t,l,s,r,n,o,c,i,u,d,b){return{configureChart:function(a){var e=a.chart,t=a.visualProperties,l=a.chartType,s=a.themeSettings,r=a.viewModel;e.addPlot(i.PRIMARY,this._createPlot(t,s,r,l))},_createPlot:function(i,u,d,h){var p,C=l.hasLabel(i.dataLabels),L=l.hasValue(i.dataLabels),P=l.hasPercent(i.dataLabels),f=(C||L||P)&&h!==t.GAUGE?{labelStyle:i.dataLabelsStackedInColumns?"columns":i.dataLabelsInside?"inside":"outside",omitLabels:!i.dataLabelsStackedInColumns,labelFunc:function(a){return b.formatDataLabel(a,i)}}:{labels:!1};switch(h){case t.PIE:p=s;break;case t.DONUT:p=r;break;case t.GAUGE:p=n;break;case t.RING:p=o}return p?(p=a([p,c]),e.mixin({type:p,animate:d.animationAllowed},f)):null},calcSeries:function(a){switch(a.chartType){case t.GAUGE:return d.calcSeries(a);default:return u.calcSeries(a)}}}});