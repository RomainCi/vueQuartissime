<template>
	<!-- /********************** MAP ***********************/ -->
	<div v-if="!afficheDetails" id="map" class="page-map">
		<l-map style="height: 80vh; width: 80vw" :zoom="zoom" :center="center">
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
					<button
						type="button"
						class="btn btn-warning btn-detail"
						@click="showdetailsComite(comitee.id)"
					>
						Voir les détails
					</button>
				</l-popup>
			</l-marker>
		</l-map>
	</div>

	<!-- /********************** DÉTAILS COMITE ********************* */ -->

	<div v-else-if="afficheDetails">
		<p>{{ details.name }}</p>
		<p>{{ details.adress }}</p>
		<p>{{ details.phone }}</p>
	</div>
</template>

/* ******************* SCRIPT ************************** */
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
			zoom: 14,
			center: [43.7101728, 7.2619532],
			comitees: [],
			details: {},
			afficheDetails: false,
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

		/* ********************* RÉCUPÉRATION DES COMITES ************* */
		async getComiteesList() {
			const promise = await fetch("http://127.0.0.1:8000/api/publics");
			console.log(promise);

			let response = await promise.json();
			console.log(response);

			if (promise.status === 200) {
				this.comitees = response.comites;
			}
		},

		/****************** RÉCUPÉRATION DES DÉTAILS D'UN COMITÉ ************/
		async showdetailsComite(id) {
			const promise = await fetch("http://127.0.0.1:8000/api/publics/" + id);
			console.log("test", promise);

			let response = await promise.json();
			console.log("response", response);

			if (promise.status === 200) {
				this.details = response.detailsComite;
			}

			this.afficheDetails = true;
			/* let map = document.getElementById("map");
			map.classList.add("hidden");

			let det = document.getElementsById("det");
			det.classList.remove("hidden"); */
		},
	},
};
export default MapComponent;
</script>

/****************** STYLE ************/
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-page {
	display: flex;
	flex-direction: row;
}
/* .hidden {
	display: none;
} */
</style>
