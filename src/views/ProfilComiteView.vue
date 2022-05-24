<template>
	<div>
		<h1>PROFIL DU COMITÉ</h1>
		<div class="bloc-details-img">
			<div class="div-img-personne">
				<img src="../assets/comite.jpeg" alt="" class="img-personne" />
			</div>
			<div class="container-details">
				<p><strong>Nom du comité : </strong> {{ comite.comiteName }}</p>
				<p>
					<i class="fa-solid fa-map-location-dot"></i
					><strong>Adresse du comité : </strong>{{ comite.adress }}
				</p>
				<p><strong>Telephone : </strong>{{ comite.phone }}</p>
				<p><strong>Email : </strong>{{ comite.email }}</p>
				<p><strong> Site web : </strong>{{ comite.webSite }}</p>
				<p><strong>Description : </strong>{{ comite.description }}</p>
				<p>
					<strong>Prénom du Président: </strong>{{ comite.firstnamePresident }}
				</p>
				<p>
					<strong>Nom du Président : </strong>{{ comite.lastnamePresident }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
const ProfilComiteView = {
	data() {
		return {
			comite: {},
		};
	},
	mounted() {
		this.showComite();
	},
	methods: {
		async showComite() {
			const promise = await fetch("http://127.0.0.1:8000/api/profilcomite", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log("profil", promise);

			let response = await promise.json();
			console.log("response", response);

			if (promise.status === 200) {
				this.comite = response.comite;
			}
		},
	},
};
export default ProfilComiteView;
</script>

<style scoped>
.container-details {
	padding: 25px;
	border: solid 2px #ffda3e;
	width: 50%;
	box-shadow: 30px -16px #ffda3e;
	border-radius: 15px;
}
.img-personne {
	height: 65vh;
	margin-left: 10px;
}
.bloc-details-img {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 70px;
	gap: 8%;
}
</style>
