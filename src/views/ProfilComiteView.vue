<template>
	<div>
		<h1>PROFIL DU COMITÉ</h1>
		<div class="bloc-details-img">
			<div class="div-img-personne">
				<img src="../assets/comite.jpeg" alt="" class="img-personne" />
			</div>
			<div class="container-details">
				<p><strong>Nom du comité : </strong> {{ comiteName }}</p>
				<p>
					<i class="fa-solid fa-map-location-dot"></i
					><strong>Adresse du comité : </strong>{{ adress }}
				</p>
				<p><strong>Telephone : </strong>{{ phone }}</p>
				<p><strong>Email : </strong>{{ email }}</p>
				<p><strong> Site web : </strong>{{ webSite }}</p>
				<p><strong>Description : </strong>{{ description }}</p>
				<p><strong>Prénom du Président: </strong>{{ firstnamePresident }}</p>
				<p><strong>Nom du Président : </strong>{{ lastnamePresident }}</p>
			</div>
			<button @click="editComite">Modifier les informations</button>
		</div>
		<div>
			<form @submit.prevent="updateComite">
				<div class="form-group">
					<label for="">Nom du comité</label>
					<input type="text" class="form-control" id="" v-model="comiteName" />
				</div>
				<div class="form-group">
					<label for="inputPhone">Téléphone</label>
					<input
						type="phone"
						class="form-control"
						id="inputPhone"
						v-model="phone"
					/>
				</div>
				<div class="form-group">
					<label for="inputEmail">Email</label>
					<input
						type="text"
						class="form-control"
						id="inputEmail"
						v-model="email"
					/>
				</div>
				<div class="form-group">
					<label for="inputWebSite">Site web</label>
					<input
						type="text"
						class="form-control"
						id="inputWebSite"
						v-model="webSite"
					/>
				</div>
				<div class="form-group">
					<label for="inputDescription">Description</label>
					<input
						type="text"
						class="form-control"
						id="inputDescription"
						v-model="description"
					/>
				</div>

				<div class="form-group">
					<label for="inputFirstname">Prénom du Président</label>
					<input
						type="text"
						class="form-control"
						id="inputFirstname"
						v-model="firstnamePresident"
					/>
				</div>
				<div class="form-group">
					<label for="inputLastname">Nom du Président</label>
					<input
						type="text"
						class="form-control"
						id="inputLastname"
						v-model="lastnamePresident"
					/>
				</div>

				<button type="submit" class="btn btn-primary">
					Enregistrer les modifications
				</button>
			</form>
		</div>
	</div>
</template>

<script>
const ProfilComiteView = {
	data() {
		return {
			comiteName: "",
			adress: "",
			phone: "",
			email: "",
			webSite: "",
			description: "",
			firstnamePresident: "",
			lastnamePresident: "",
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
				this.comiteName = response.comite.comiteName;
				this.adress = response.comite.adress;
				this.phone = response.comite.phone;
				this.email = response.comite.email;
				this.webSite = response.comite.webSite;
				this.description = response.comite.description;
				this.firstnamePresident = response.comite.firstnamePresident;
				this.lastnamePresident = response.comite.lastnamePresident;
			}
		},

		async updateComite() {
			const promise = await fetch("http://127.0.0.1:8000/api/profilcomite", {
				method: "POST",
				body: JSON.stringify({
					comiteName: this.comiteName,
					phone: this.phone,
					email: this.email,
					webSite: this.webSite,
					description: this.description,
					firstnamePresident: this.firstnamePresident,
					lastnamePresident: this.lastnamePresident,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});

			let res = await promise.json();
			console.log("update", res);
			if (promise.status === 200) {
				console.log("c'est good");
			} else {
				console.log("c'est pas good");
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
