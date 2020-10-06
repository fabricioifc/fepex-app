<template>
  <b-row>
    <loading-overlay
      :active="isLoading"
      :is-full-page="fullPage"
      :loader="loader"
    />
    <b-col cols="12" class="mb-3">
      <template>
        <b-breadcrumb class="mt-3" :items="navegacao_items"></b-breadcrumb>
      </template>
      <b-card :title="trabalho.titulo">
        <b-card-sub-title class="mb-2">
          <b-button
            :href="trabalho.link"
            variant="outline"
            target="_blank"
            class="btn-link"
          >
            <img
              alt="PDF"
              src="../assets/pdf.png"
              width="60"
              class="img-fluid img-thumbnail"
            />
          </b-button>
          <b-badge class="mr-1" variant="warning">
            {{ trabalho.categoria }}
          </b-badge>
          <b-badge class="mr-1" variant="info">
            {{ trabalho.tipo }}
          </b-badge>
        </b-card-sub-title>
        <hr />
        <b-card-text class="justify-content">
          {{ trabalho.resumo }}
        </b-card-text>

        <b-card-text class="mb-1">
          <strong>Alunos: </strong> <em>{{ trabalho.autores }}</em>
        </b-card-text>
        <b-card-text>
          <strong>Orientadores: </strong> <em>{{ trabalho.orientadores }}</em>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "TrabalhoItem",

  data() {
    return {
      key: "",
      isLoading: false,
      fullPage: false,
      loader: "bars",
      trabalho: {},
      navegacao_items: [
        { text: "Início", href: "/" },
        { text: "Trabalhos", to: { name: "TrabalhoList" } },
        { text: "Trabalho", href: `/trabalhos/${this.$route.params.id}` },
      ],
    };
  },

  created() {
    this.isLoading = true;

    const ref = firebase
      .firestore()
      .collection(`Trabalhos${this.$route.params.ano}`)
      .doc(this.$route.params.id);
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.key = doc.id;
          this.trabalho = doc.data();
          // console.log(this.trabalho);
        } else {
          console.log("No such document!");
        }
      })
      .then(() => {
        this.isLoading = false;
      });
  },
  methods: {},
};
</script>

<style scoped>
.justify-content {
  text-align: justify;
}
</style>
