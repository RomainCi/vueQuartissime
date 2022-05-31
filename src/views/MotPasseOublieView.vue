<template>
  <div>
    <h1>Mot passe oublie</h1>

    <form @submit.prevent="submitForm">
      <label for="email">email</label>
      <input type="email" v-model="user.email" />
      <button>valider</button>
    </form>
  </div>
</template>

<script>
const MotpasseOublieView = {
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const promise = await fetch("http://127.0.0.1:8000/api/forgetpassword", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(promise);
      let res = await promise.json();
      console.log(res);
    },
  },
};
export default MotpasseOublieView;
</script>

<style>
</style>