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
      <b-card>
        <b-card-title>
          {{ board.titulo }}
          <b-button
            :href="board.link"
            variant="outline-danger"
            target="_blank"
            class="float-right"
          >
            <img alt="PDF" src="../assets/pdf.png" width="40" />
          </b-button>
        </b-card-title>
        <b-card-sub-title class="mb-2">
          <b-badge class="mr-1" variant="warning">
            {{ board.categoria }}
          </b-badge>
          <b-badge class="mr-1" variant="info">
            {{ board.tipo }}
          </b-badge>
        </b-card-sub-title>
        <hr />
        <b-card-text class="justify-content">
          {{ board.resumo }}
        </b-card-text>

        <b-card-text class="mb-1">
          <strong>Alunos: </strong> <em>{{ board.autores }}</em>
        </b-card-text>
        <b-card-text>
          <strong>Orientadores: </strong> <em>{{ board.orientadores }}</em>
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
      board: {},
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
          this.board = doc.data();
          // console.log(this.board);
        } else {
          console.log("No such document!");
        }
      })
      .then(() => {
        this.isLoading = false;
      });
  },
  methods: {
    editboard(id) {
      router.push({
        name: "EditBoard",
        params: { id: id },
      });
    },
    deleteboard(id) {
      firebase
        .firestore()
        .collection("boards")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "BoardList",
          });
        })
        .catch((error) => {
          alert("Error removing document: ", error);
        });
    },
  },
};
</script>

<style scoped>
.justify-content {
  text-align: justify;
}
</style>
