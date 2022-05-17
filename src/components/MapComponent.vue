<template>
	<div>
		<l-map style="height: 500px" :zoom="zoom" :center="center">
			<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
			<l-marker
				v-for="comitee in comitees"
				:key="comitee.id"
				:lat-lng="[comitee.latitude, comitee.longitude]"
			>
				<l-popup
					><strong>Nom du comité : </strong> {{ comitee.comiteName }}<br />
					<strong>Adresse : </strong>{{ comitee.adress }}<br />
					<strong>Contact : </strong>{{ comitee.phone }}<br /><br />
					<button>Voir les détails</button>
				</l-popup>
			</l-marker>
		</l-map>
	</div>
</template>

<script>
// Inmportation des compsants de leafleats
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
const MapComponent = {
	components: {
		LMap,
		LTileLayer,
		LMarker,
		LPopup,
	},

	data() {
		return {
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			attribution:
				'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			zoom: 15,
			center: [43.7101728, 7.2619532],
			comitees: [],
		};
	},

	mounted() {
		this.getComiteesList();
	},

	methods: {
		zoomUpdated(zoom) {
			this.zoom = zoom;
			console.log(this.markers);
		},

		centerUpdated(center) {
			this.center = center;
		},

		async getComiteesList() {
			const promise = await fetch("http://127.0.0.1:8000/api/publics");
			console.log(promise);

			let response = await promise.json();
			console.log(response);

			if (promise.status === 200) {
				this.comitees = response.comites;
			}
		},
	},
};
export default MapComponent;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
	width: 50%;
	height: 50%;
}
</style>
