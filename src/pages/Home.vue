<template>
  <b-container>
    <b-row align-h="center">
      <b-button
        @click="irParaTrabalhos()"
        variant="light"
        align-self="center"
        class="d-xs-block d-sm-block d-md-block d-lg-none d-xl-none"
      >
        <b-icon icon="list" aria-hidden="true"></b-icon>
        Confira os Trabalhos dos nossos Alunos
      </b-button>
    </b-row>
    <hr class="d-xs-block d-sm-block d-md-block d-lg-none d-xl-none" />
    <b-row align-v="center">
      <b-col cols="12" class="text-center">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="5000"
          fade
          controls
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <div v-for="trabalho in dados" :key="trabalho.key">
            <b-carousel-slide
              :caption="trabalho.titulo"
              :text="`${trabalho.tipo} - ${trabalho.categoria}`"
            >
              <b-button
                :to="`/trabalhos/${trabalho.ano}/${trabalho.key}`"
                variant="warning"
                class="p-1"
                >Conheça esse Trabalho</b-button
              >
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  width="500"
                  height="300"
                  src="../assets/carousel-1.png"
                  alt="image slot"
                />
              </template>
            </b-carousel-slide>
          </div>
        </b-carousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "Home",
  data() {
    return {
      slide: 0,
      sliding: null,
      ref1: firebase.firestore().collection("Trabalhos2019"),
      ids: [],
      dados: [],
      quantidade: 5,
      ano: "2019",
    };
  },
  async created() {
    let trabalhos = await this.ref1.get();

    let size = trabalhos.size;
    console.log(this.getRandomIds(size));
    this.getRandomIds(size).forEach((index) => {
      let doc = trabalhos.docs[index].data();
      let id = trabalhos.docs[index].id;

      this.dados.push({
        key: id,
        titulo: this.getTituloReduzido(doc.titulo, 50),
        resumo: doc.resumo || "",
        autores: doc.autores || "",
        categoria: doc.categoria || "",
        link: doc.link || "",
        orientadores: doc.orientadores || "",
        tipo: doc.tipo || "",
        ano: this.ano,
      });
    });
  },
  methods: {
    getTituloReduzido(texto, tamanho) {
      return texto.length > tamanho
        ? `${texto.substring(0, tamanho)}...`
        : texto;
    },
    // pega 5 ids randomicos a partir da quantidade de trabalhos
    getRandomIds(quantidadeDeTrabalhos) {
      let ids = [];
      while (ids.length < 5) {
        let index = Math.floor(Math.random() * quantidadeDeTrabalhos);
        if (!ids.includes(index)) {
          ids.push(index);
        }
      }
      return ids;
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    irParaTrabalhos() {
      router.push({
        name: "TrabalhoList",
      });
    },
  },
};
</script>

<style>
.carousel-caption {
  top: 15%;
}

@media (max-width: 767px) {
  .carousel-caption h3 {
    font-size: 0.9rem;
  }
  .carousel-caption {
    top: 1%;
  }

  .carousel-caption p {
    display: none;
  }
}
</style>
