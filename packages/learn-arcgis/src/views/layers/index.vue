<template>
	<div id="mapView" ref="mapRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

/* Widgets */
import WebMap from '@arcgis/core/WebMap';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Legend from '@arcgis/core/widgets/Legend';

/* Calcite Components */
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-combobox';
import '@esri/calcite-components/dist/components/calcite-combobox-item';
import '@esri/calcite-components/dist/components/calcite-icon';

/* Graphic */
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

/* FeatureLayer */
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

/* Language */
import * as intl from '@arcgis/core/intl'; //NOTE: 注意引入方式

/* Config */
import EsriConfig from '@arcgis/core/config';

const mapRef = ref();
let mapView = null,
	map = null;

const initMap = () => {
	EsriConfig.apiKey =
		'AAPK04c877a49a364174be41ac33b2cf83d1R-a7rMk13YyhdbxpNx7ne6XmaIWVCclzlKmLU6iYLc-ZvyE1i-CDXgRqBYJodyNB';

	/* Base Map */
	map = new Map({
		// basemap: 'arcgis/imagery', //dark-gray
		basemap: {
			style: {
				id: 'arcgis/imagery',
			},
		},
		ground: 'world-elevation',
	});

	/* Add a graphics layer */
	addGraphicsLayer();

	/* Web Map */
	const webMap = new WebMap({
		portalItem: {
			id: '41281c51f9de45edaf1c8ed44bb10e30',
		},
	});

	/* 2D */
	mapView = new MapView({
		map,
		container: mapRef.value,
		// center: [118.122284, 24.4915235],
		// zoom: 11,
		center: [-118.80543, 34.027],
		zoom: 13,
	});

	addFeatureLayer();

	updateMapLanguage('local');

	const scaleBar = new ScaleBar({
		view: mapView,
	});
	mapView.ui.add(scaleBar, 'bottom-left');
	const legend = new Legend({
		view: mapView,
	});
	mapView.ui.add(legend, 'bottom-right');

	mapView.ui._removeComponents(['attribution']); // 去掉arcgis的logo或标识
};

/**
 * Change Map Language
 * @param {*} e
 */
const updateMapLanguage = (languageCode) => {
	intl.setLocale(languageCode || 'zh-CN');

	mapView.map.basemap = {
		style: {
			id: 'arcgis/imagery',
			language: languageCode || 'zh-CN',
		},
	};
};

const addGraphicsLayer = () => {
	const graphicsLayer = new GraphicsLayer();
	map.add(graphicsLayer);

	/* Create a polygon geometry */
	const polygon = {
		type: 'polygon',
		rings: [
			[118.176004, 24.493944],
			[118.174802, 24.489492],
			[118.173772, 24.484571],
			[118.179181, 24.482696],
			[118.184504, 24.480587],
			[118.186564, 24.47965],
			[118.187852, 24.488867],
			[118.176777, 24.493788],
			[118.176004, 24.494178],
		],
	};

	const simpleFillSymbol = {
		type: 'simple-fill',
		color: [227, 139, 79, 0.8], // Orange, opacity 80%
		outline: {
			color: [255, 255, 255],
			width: 1,
		},
	};
	const polygonGraphic = new Graphic({
		geometry: polygon,
		symbol: simpleFillSymbol,
		attributes: {
			Name: 'Graphic',
			Description: 'I am a polygon',
		},
		popupTemplate: { title: '{Name}', content: '{Description}' },
	});
	graphicsLayer.add(polygonGraphic);
};

/**
 * Add feature layers
 */
const addFeatureLayer = () => {
	console.log('mapView', mapView);

	mapView.goTo({
		center: [-118.80543, 34.027],
		zoom: 13,
	});
	//Trailheads feature layer (points)
	const trailheadsLayer = new FeatureLayer({
		url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0',
	});

	map.add(trailheadsLayer);

	//Trails feature layer (lines)
	const trailsLayer = new FeatureLayer({
		url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0',
	});

	map.add(trailsLayer, 0);

	// Parks and open spaces (polygons)
	const parksLayer = new FeatureLayer({
		url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0',
	});

	map.add(parksLayer, 0);
};

onMounted(() => {
	initMap();
});
</script>

<style src="@esri/calcite-components/dist/calcite/calcite.css"></style>

<style scoped>
#mapView {
	width: 100%;
	height: 100vh;
}

#basemapStyles {
	width: 250px;
	padding: 10px;
}

#mapLanguage {
	width: 250px;
	padding: 10px;
}
</style>
