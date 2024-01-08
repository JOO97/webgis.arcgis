<template>
	<div id="mapView" ref="mapRef" />

	<div id="basemapStyles" class="esri-widget">
		<calcite-label>Basemap style</calcite-label>
		<calcite-combobox
			id="styleCombobox"
			selection-mode="single"
			clear-disabled
			v-event:calciteComboboxChange="updateBaseMapStyle"
		>
			<calcite-combobox-item
				v-for="item in styleOptions"
				:value="item.value"
				:text-label="item.label"
			/>
		</calcite-combobox>

		<!-- <calcite-button>Button</calcite-button> -->
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import WebMap from '@arcgis/core/WebMap';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Legend from '@arcgis/core/widgets/Legend';

import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-combobox';
import '@esri/calcite-components/dist/components/calcite-combobox-item';
import '@esri/calcite-components/dist/components/calcite-icon';

// import SceneView from '@arcgis/core/views/SceneView';

import EsriConfig from '@arcgis/core/config';

import { styleOptions } from './config';

const mapRef = ref();
let mapView = null;

const initMap = () => {
	EsriConfig.apiKey =
		'AAPK04c877a49a364174be41ac33b2cf83d1R-a7rMk13YyhdbxpNx7ne6XmaIWVCclzlKmLU6iYLc-ZvyE1i-CDXgRqBYJodyNB';

	/* Base Map */
	const map = new Map({
		basemap: 'arcgis/imagery', //dark-gray
		ground: 'world-elevation',
	});

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
		center: [118.122284, 24.4915235],
		zoom: 11,
	});

	const scaleBar = new ScaleBar({
		view: mapView,
	});
	mapView.ui.add(scaleBar, 'bottom-left');
	const legend = new Legend({
		view: mapView,
	});
	mapView.ui.add(legend, 'bottom-right');

	const basemapStylesDiv = document.getElementById('basemapStyles');
	mapView.ui.add(basemapStylesDiv, 'top-right');
	// const styleCombobox = document.getElementById('styleCombobox');
	// styleCombobox.addEventListener('calciteComboboxChange', (event) => {
	// 	updateBaseMapStyle(event.target.value);
	// });

	/* 3D */
	// const sceneView = new SceneView({
	// 	map,
	// 	container: mapRef.value,
	// 	camera: {
	// 		position: {
	// 			x: 118.122284, //Longitude
	// 			y: 24.4915235, //Latitude
	// 			z: 4000, //Meters
	// 		},
	// 		tilt: 75,
	// 	},
	// });
	// sceneView.ui._removeComponents(['attribution']); // 去掉arcgis的logo或标识

	mapView.ui._removeComponents(['attribution']); // 去掉arcgis的logo或标识
};

/**
 * 更新底图样式
 * @param {*} e
 */
const updateBaseMapStyle = (e) => {
	mapView.map.basemap = e.target.value;
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
</style>
