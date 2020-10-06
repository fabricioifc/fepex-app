<template>
  <b-row>
    <loading-overlay :active="isLoading" :is-full-page="fullPage" :loader="loader" />
    <b-col cols="12" class="p-0">
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

        <b-tabs align="center" active-nav-item-class="font-weight-bold text-info">
          <b-tab title="FEPEX - 2019" active>
              <b-table striped hover :items="items.filter((item) => item.ano == '2019')" :fields="fields" :keyword="keyword" responsive="sm">
                <template v-slot:cell(titulo)="data">
                  <b-button @click.stop="details(data.item)" variant="link" class="m-0 p-0">
                    {{data.item.titulo}}
                  </b-button>
                  <p><b-badge href="#" class="mr-1" variant="warning">
                      {{ data.item.categoria }}
                    </b-badge>
                    <b-badge href="#"  variant="danger">
                      {{ data.item.tipo }}
                    </b-badge></p>
                  
                </template>
            </b-table>
          </b-tab>
          <b-tab title="FEPEX - 2018">
            <b-table striped hover :items="items.filter((item) => item.ano == '2018')" :fields="fields" :keyword="keyword" responsive="sm">
                <template v-slot:cell(titulo)="data">
                  <b-button @click.stop="details(data.item)" variant="link" class="m-0 p-0">
                    {{data.item.titulo}}
                  </b-button>
                  <p><b-badge href="#" class="mr-1" variant="warning">
                      {{ data.item.categoria }}
                    </b-badge>
                    <b-badge href="#"  variant="danger">
                      {{ data.item.tipo }}
                    </b-badge></p>
                  
                </template>
            </b-table>
          </b-tab>
          <b-tab title="FEPEX - 2017">
            <b-table striped hover :items="items.filter((item) => item.ano == '2017')" :fields="fields" :keyword="keyword" responsive="sm">
                <template v-slot:cell(titulo)="data">
                  <b-button @click.stop="details(data.item)" variant="link" class="m-0 p-0">
                    {{data.item.titulo}}
                  </b-button>
                  <p><b-badge href="#" class="mr-1" variant="warning">
                      {{ data.item.categoria }}
                    </b-badge>
                    <b-badge href="#"  variant="danger">
                      {{ data.item.tipo }}
                    </b-badge></p>
                  
                </template>
            </b-table>
          </b-tab>
          <b-tab title="FEPEX - 2016">
            <b-table striped hover :items="items.filter((item) => item.ano == '2016')" :fields="fields" :keyword="keyword" responsive="sm">
                <template v-slot:cell(titulo)="data">
                  <b-button @click.stop="details(data.item)" variant="link" class="m-0 p-0">
                    {{data.item.titulo}}
                  </b-button>
                  <p><b-badge href="#" class="mr-1" variant="warning">
                      {{ data.item.categoria }}
                    </b-badge>
                    <b-badge href="#"  variant="danger">
                      {{ data.item.tipo }}
                    </b-badge></p>
                  
                </template>
            </b-table>
          </b-tab>
        </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "TrabalhoList",
  data() {
    return {
      isLoading: false,
      fullPage: false,
      loader: "bars",
      keyword: "",
      fields: [
        {
          key: "titulo",
          label: "Título do Projeto",
          sortable: true,
          class: "text-left",
        },
        { key: "actions", label: "", class: "text-center" },
      ],
      dados: [],
      errors: [],
      ref1: firebase.firestore().collection("Trabalhos2019"),
      ref2: firebase.firestore().collection("Trabalhos2018"),
      ref3: firebase.firestore().collection("Trabalhos2017"),
      ref4: firebase.firestore().collection("Trabalhos2016"),
    };
  },
  computed: {
    items() {
      return this.keyword
        ? this.dados.filter(
            (item) =>
              item.titulo.toLowerCase().includes(this.keyword.toLowerCase()) ||
              item.autores.toLowerCase().includes(this.keyword.toLowerCase()) ||
              item.orientadores
                .toLowerCase()
                .includes(this.keyword.toLowerCase()) ||
              item.resumo.toLowerCase().includes(this.keyword.toLowerCase())
          )
        : this.dados;
    },
  },
  created() {
    // this.isLoading = true;
    this.dados = [];

    this.ref1.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.addTrabalho(doc, "2019");
      });
    });
    this.ref2.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.addTrabalho(doc, "2018");
      });
    });
    this.ref3.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.addTrabalho(doc, "2017");
      });
    });
    this.ref4.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.addTrabalho(doc, "2016");
      });
    });
  },
  methods: {
    addTrabalho(doc, ano) {
      this.dados.push({
        key: doc.id,
        titulo: doc.data().titulo,
        resumo: doc.data().resumo || "",
        autores: doc.data().autores || "",
        categoria: doc.data().categoria || "",
        link: doc.data().link || "",
        orientadores: doc.data().orientadores || "",
        tipo: doc.data().tipo || "",
        ano: ano,
      });
    },
    details(trabalho) {
      router.push({
        name: "TrabalhoItem",
        params: { id: trabalho.key, ano: trabalho.ano },
      });
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
