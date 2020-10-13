<template>
  <b-container id="container" class="shadow">
    <b-row class="mb-5">
    <loading-overlay
      :active="isLoading"
      :is-full-page="fullPage"
      :loader="loader"
    />
      <b-col cols="12">
        <b-button-group class="mt-2">
          <b-button
          squared 
          :pressed="ano == anoAtual" 
          :variant="ano == anoAtual ? 'success' : 'secondary'" 
          class="mr-1" 
          :key="ano" v-for="ano in anos" :title="ano" @click="getTrabalhosAno(ano)">
          <b-icon :icon="ano === anoAtual ? 'check-circle' : 'circle'" aria-hidden="true"></b-icon>
          {{ano}}
        </b-button>
      </b-button-group>
    </b-col>
    <b-col cols="12">        
      <b-input-group size="md" class="mt-3 mb-3">
        <b-form-input v-model="keyword" placeholder="Procurar..." type="text">
        </b-form-input>
        <b-input-group-append>
          <b-button
            size="md"
            variant="link"
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

      <!-- :items="items.filter((item) => item.ano == '2019')" -->
      <b-table
        small
        striped
        hover
        :items="items"
        :fields="fields"
        :keyword="keyword"
        responsive="sm"
      >
        <template v-slot:cell(titulo)="data">
          <b-link @click.stop="details(data.item)" class="text-dark small">
            {{ data.item.titulo }}
          </b-link>
          <h6 class="d-sm-none">
            <b-badge class="mr-1" variant="dark">
              {{ data.item.ano }}
            </b-badge>
            <b-badge class="mr-1" variant="warning">
              {{ data.item.categoria }}
            </b-badge>
            <b-badge class="mr-1" variant="info">
              {{ data.item.tipo }}
            </b-badge>
          </h6>
        </template>
        <template v-slot:cell(categoria)="data">
          <b-badge href="#" class="mr-1" variant="warning">
            {{ data.item.categoria }}
          </b-badge>
        </template>
        <template v-slot:cell(tipo)="data">
          <b-badge href="#" class="mr-1" variant="info">
            {{ data.item.tipo }}
          </b-badge>
        </template>
      </b-table>
    </b-col>
  </b-row>
  </b-container>
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
      anos: [2020, 2019, 2018, 2017, 2016],
      anoAtual: 2020,
      fields: [
        {
          key: "ano",
          label: "Ano",
          sortable: true,
          class: "align-middle font-weight-bold d-none d-sm-table-cell",
        },
        {
          key: "titulo",
          label: "Título do Projeto",
          sortable: true,
          class: "text-left",
        },
        {
          key: "categoria",
          label: "Categoria",
          sortable: true,
          class: "d-none d-sm-table-cell",
        },
        {
          key: "tipo",
          label: "Tipo",
          sortable: true,
          class: "d-none d-sm-table-cell",
        },

        // { key: "actions", label: "", class: "text-center" },
      ],
      dados: [],
      errors: [],
      // ref1: firebase.firestore().collection("Trabalhos2020"),
      // ref2: firebase.firestore().collection("Trabalhos2019"),
      // ref3: firebase.firestore().collection("Trabalhos2018"),
      // ref4: firebase.firestore().collection("Trabalhos2017"),
      // ref5: firebase.firestore().collection("Trabalhos2016"),
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
  async created() {
    this.isLoading = true;
    this.dados = [];

    this.getTrabalhosAno(this.anos[0])

    // const t1 = await this.ref1.get();
    // const t2 = await this.ref2.get();
    // const t3 = await this.ref3.get();
    // const t4 = await this.ref4.get();
    // const t5 = await this.ref5.get();

    // Promise.all([t1])
    //   .then((snapshot) => {
    //     snapshot.forEach((query, index) => {
    //       let anos = ["2020", "2019", "2018", "2017", "2016"];
    //       let cores = ["success", "secondary", "primary", "light"];
    //       query.forEach((doc) => {
    //         this.addTrabalho(doc, anos[index], cores[index]);
    //       });
    //     });
    //   })
    //   .then(() => {
    //     this.isLoading = false;
    //   })
    //   .catch((error) => {
    //     this.isLoading = false;
    //     console.log(error);
    //   });

    // this.ref1.onSnapshot((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     this.addTrabalho(doc, "2019", "primary");
    //   });
    //   this.isLoading = false;
    // });
    // this.ref2.onSnapshot((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     this.addTrabalho(doc, "2018", "success");
    //   });
    // });
    // this.ref3.onSnapshot((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     this.addTrabalho(doc, "2017", "info");
    //   });
    // });
    // this.ref4.onSnapshot((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     this.addTrabalho(doc, "2016", "warning");
    //   });
    // });
  },
  methods: {
    addTrabalho(doc, ano, color) {
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
        // _rowVariant: color,
        _cellVariants: { ano: color },
      });
    },
    details(trabalho) {
      router.push({
        name: "TrabalhoItem",
        params: { id: trabalho.key, ano: trabalho.ano },
      });
    },
    async getTrabalhosAno(ano) {
      try {
        this.isLoading = true;
        this.anoAtual = ano;
        this.keyword = ''
        
        const ref = firebase.firestore().collection(`Trabalhos${ano}`)
        const dados = await ref.get();
        this.dados = []
        
        dados.forEach((doc) => {
          this.addTrabalho(doc, ano, "info");
        });
        
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
};
</script>

<style scoped>
.table {
  width: 96%;
  margin: 0 auto;
}
#container {
  background-color: #ffffff;
}
</style>
