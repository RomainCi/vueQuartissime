<template>
	<!-- CSS only -->
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
		crossorigin="anonymous"
	/>

	<!-- /************************* Bouton voir map ********************/ -->
	<div class="home">
		<div class="div-btn-open-carte">
			<button
				type="button"
				class="btn btn-secondary btn-circle btn-xl"
				@click="showMap"
			>
				Voir la carte
			</button>
		</div>

		<!-- /************************* Ecran d'accueil ********************/ -->
		<div id="imgmap" class="img-acceuil">
			<video
				type="video/mp4"
				autoplay
				:src="carteImg"
				class="img-carte"
			></video>

			<img src="../assets/imeuble.png" alt="" class="immeuble" />
		</div>

		<div v-if="map" class="map">
			<map-component />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import MapComponent from "@/components/MapComponent.vue";
import carteImg from "@/assets/carte.mp4";

export default {
	name: "HomeView",
	components: {
		MapComponent,
	},
	data() {
		return {
			carteImg: carteImg,
			map: false,
		};
	},

	methods: {
		showMap() {
			this.map = true;
			/* afficheDetails = false; */
			let mapimg = document.getElementById("imgmap");
			mapimg.classList.add("hidden");
		},
	},
};
</script>

<style scoped>
.div-btn-open-carte {
	display: flex;
	justify-content: left;
	margin-left: 10px;
}
.img-carte {
	height: 60vh;
	margin-top: 52px;
}
.immeuble {
	text-align: right;
	height: 65vh;
	margin-top: -10px;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
	/* Styles pour cette Media Queries */

	.immeuble {
		display: none;
	}
}

.img-acceuil {
	display: flex;
	justify-content: right;
	gap: 20%;
}

/* button page principale pour afficher la carte */

@media (min-width: 768px) {
	.button-53 {
		padding: 0.75rem 3rem;
		font-size: 1.25rem;
	}
}
.map {
	display: flex;
	justify-content: center;
}
.hidden {
	display: none;
}
</style>
