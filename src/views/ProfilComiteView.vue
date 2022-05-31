<template>
	<div>
		<header class="entete">
			<img src="../assets/logo.png" alt="" class="logo" />
		</header>

		<div class="bloc-details-img">
			<div class="div-img-personne">
				<img src="../assets/comite.jpeg" alt="" class="img-personne" />
			</div>
			<div class="container-details">
				<p><strong>Nom du comité : </strong> {{ comiteName }}</p>
				<p><strong>Adresse du comité : </strong>{{ adress }}</p>
				<p><strong>Contact : </strong>{{ phone }}</p>
				<p><strong>Email : </strong>{{ email }}</p>
				<p><strong>Site web : </strong>{{ webSite }}</p>
				<p><strong>Description : </strong>{{ description }}</p>
				<p><strong>Prénom du Président: </strong>{{ firstnamePresident }}</p>
				<p><strong>Nom du Président : </strong>{{ lastnamePresident }}</p>

				<button @click="openForm" class="btn updatebtn">
					Modifier les informations
				</button>
			</div>
		</div>
		<!---------- FORMULAIRE POP UP MODIFICATION DONNES COMITES -------------->
		<div class="div_form" id="popupForm">
			<form @submit.prevent="updateComite" class="form">
				<div class="form-group div-input">
					<label for=""><b>Nom du comité</b></label>
					<input type="text" class="form-control" id="" v-model="comiteName" />
				</div>
				<div class="form-group">
					<label for="inputPhone"><b>Téléphone</b></label>
					<input
						type="text"
						maxlength="10"
						minlength="10"
						class="form-control"
						id="inputPhone"
						@input="telephone"
						:value="phone"
					/>
				</div>
				<div class="form-group">
					<label for="inputEmail"><b>Email</b></label>
					<input
						type="text"
						class="form-control"
						id="inputEmail"
						v-model="email"
					/>
				</div>
				<div class="form-group">
					<label for="inputWebSite"><b>Site web</b></label>
					<input
						type="text"
						class="form-control"
						id="inputWebSite"
						v-model="webSite"
					/>
				</div>
				<div class="form-group">
					<label for="inputDescription"><b>Description</b></label>
					<input
						type="text"
						class="form-control"
						id="inputDescription"
						v-model="description"
					/>
				</div>

				<div class="form-group">
					<label for="inputFirstname"><b>Prénom et Nom du Président</b></label>
					<input
						type="text"
						class="form-control"
						id="inputFirstname"
						v-model="firstnamePresident"
					/>
				</div>
				<div class="form-group">
					<!-- <label for="inputLastname">Nom du Président</label> -->
					<input
						type="text"
						class="form-control"
						id="inputLastname"
						v-model="lastnamePresident"
					/>
				</div>
				<div class="btnForm">
					<button type="submit" @click="closeForm" class="btn updatebtn">
						Enregistrer les modifications
					</button>

					<button type="button" class="btn closebtn" @click="closeForm">
						Fermer
					</button>
				</div>
			</form>
		</div>

		<!----------- CONTAINER ASSOCIATIONS ------------>
		<div class="row bloc-assos-evens">
			<div class="card" style="width: 30rem">
				<img
					class="card-img-top"
					src="../assets/assoc.jpg"
					alt="Card image cap"
				/>
				<div class="card-body">
					<h5 class="card-title">LES ASSOCIATIONS</h5>
					<hr />

					<div class="card-text" v-for="assoc in detailsAssoc" :key="assoc.id">
						<p><b>Nom de l'association : </b>{{ assoc.nom }}</p>
						<p><b> Email : </b> {{ assoc.email }}</p>
						<p><b> Téléphone : </b>{{ assoc.telephone }}</p>

						<button class="btn updatebtn" @click="editform(assoc)">
							Modifier
						</button>
						<div id="formAssoc">
							<form
								v-if="editedAssoc.id === assoc.id && show == 'a'"
								@submit.prevent="updateAssoc(assoc.id)"
								class="form"
								:class="lol"
							>
								<div class="form-group div-input">
									<input
										type="text"
										class="form-control"
										id=""
										v-model="editedAssoc.nom"
									/>
									<input
										type="text"
										class="form-control"
										id=""
										v-model="editedAssoc.email"
									/>
									<input
										type="text"
										class="form-control"
										id=""
										v-model="editedAssoc.telephone"
									/>
								</div>

								<button type="submit" @click="closeFormAssoc">Valider</button>
							</form>
						</div>
						<!-- <div>
              {{ this.message }}
            </div> -->
						<hr />
					</div>
				</div>
			</div>
			<!----------- CONTAINER  EVENS  ------------>
			<div class="card" style="width: 30rem">
				<img
					class="card-img-top"
					src="../assets/evens.jpg"
					alt="Card image cap"
				/>
				<div class="card-body">
					<h5 class="card-title">LES EVENEMENTS</h5>
					<p class="card-text" v-for="event in events" :key="event.id">
						{{ event.eventname }}
						{{ event.eventdate }}
						{{ event.place }}
					</p>
					<!-- <button @click="downloadpdf">Télécharger la fiche</button> -->
				</div>
			</div>
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
			lol: true,
			detailsAssoc: [],
			events: [],
			message: "",
			show: "",
			editedAssoc: {},
		};
	},
	mounted() {
		this.showComite();
	},
	methods: {
		editform(assoc) {
			this.editedAssoc = assoc;
			this.show = "a";
		},
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

				this.detailsAssoc = response.assoc;

				this.events = response.detailsEvents;
			}
		},

		async updateComite() {
			const promise = await fetch("http://127.0.0.1:8000/api/profilcomite", {
				method: "PUT",
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

		async updateAssoc(id) {
			const promise = await fetch("http://127.0.0.1:8000/api/association", {
				method: "PUT",
				body: JSON.stringify({
					nom: this.editedAssoc.nom,
					email: this.editedAssoc.email,
					telephone: this.editedAssoc.telephone,
					id: id,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log(promise, "promise udpate Assoc");
			let res = await promise.json();

			if (promise.status === 200) {
				this.message = res.message;
			} else {
				console.log("c'est pas good");
			}
		},
		// FONCTION QUI PERMET D'ECRIRE QUE DES CHIFFRES DANS L'INPUT TEL QUI DE BASE EST DE TYPE TEXT
		telephone(e) {
			if (isNaN(e.target.value)) {
				e.target.value = this.tele;
				return;
			}

			this.tele = e.target.value;
			this.phone = this.tele;
		},

		// FONCTIONS POUR OUVRIR LE FORMULAIRE DE MODIFICATIONS

		openForm() {
			document.getElementById("popupForm").style.display = "block";
		},

		closeForm() {
			document.getElementById("popupForm").style.display = "none";
		},

		openFormAssoc() {
			document.getElementById("formAssoc").style.display = "block";
		},
		closeFormAssoc() {
			this.show = "";
		},
	},
};

export default ProfilComiteView;
</script>

<style scoped>
.entete {
	min-height: 80px;
	border-bottom: 4px solid black;
}

.logo {
	height: 7vh;
	margin: 20px;
}

.title-profil {
	text-align: left;
	margin-top: 30px;
	margin-left: 30px;
}
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
/* CONTAINER FORMULAIRE POPUP */
.div_form {
	display: none;
	padding: 30px;
	border: solid #ffda3e 3px;
	border-radius: 10px;
	width: 90%;
	position: absolute;
	top: 15%;
	left: 5%;
	background-color: white;
}

.btnForm {
	display: flex;
	justify-content: center;
	gap: 40px;
}
.updatebtn {
	background-color: #ffda3e;
}
.closebtn {
	background-color: black;
	color: white;
}

.bloc-assos-evens {
	display: flex;
	justify-content: center;
	margin: 110px 20px 0px 30px;
	gap: 10%;
	font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
		"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
