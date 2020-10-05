<template>
  <b-row>
    <b-col cols="12">
      <b-input-group size="sm" class="mt-3 mb-3">
        <b-form-input v-model="keyword" placeholder="Procurar..." type="text">
        </b-form-input>
        <b-input-group-append>
          <b-button
            size="sm"
            variant="link"
            class="mb-2"
            :disabled="!keyword"
            @click="keyword = ''"
          >
            <b-icon
              icon="backspace"
              aria-hidden="true"
              variant="danger"
            ></b-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <b-table striped hover :items="items" :fields="fields" :keyword="keyword">
        <template v-slot:cell(actions)="data">
          <b-button @click.stop="details(data.item)" variant="primary"
            >Details</b-button
          >
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "BoardList",
  data() {
    return {
      keyword: "",
      fields: [
        { key: "titulo", label: "Título", sortable: true, class: "text-left" },
        { key: "actions", label: "Action", class: "text-center" },
      ],
      dados: [],
      errors: [],
      ref: firebase.firestore().collection("Trabalhos2019"),
    };
  },
  computed: {
    items() {
      return this.keyword
        ? this.dados.filter(
            (item) =>
              item.titulo.toLowerCase().includes(this.keyword.toLowerCase()) ||
              item.autores.toLowerCase().includes(this.keyword.toLowerCase()) ||
              item.resumo.toLowerCase().includes(this.keyword.toLowerCase())
          )
        : this.dados;
    },
  },
  created() {
    this.ref.onSnapshot((querySnapshot) => {
      this.dados = [];
      querySnapshot.forEach((doc) => {
        this.dados.push({
          key: doc.id,
          titulo: doc.data().titulo,
          resumo: doc.data().resumo,
          autores: doc.data().autores,
        });
      });
    });
  },
  methods: {
    details(board) {
      router.push({ name: "ShowBoard", params: { id: board.key } });
    },
  },
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>
