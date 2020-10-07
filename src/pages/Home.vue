<template>
  <b-container>
    <b-row align-v="center">
      <b-col cols="12" class="text-center">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          fade
          controls
          indicators
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
                class=""
                >Conheça esse Trabalho</b-button
              >
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  width="300"
                  height="100"
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

export default {
  name: "Home",
  data() {
    return {
      slide: 0,
      sliding: null,
      ref1: firebase.firestore().collection("Trabalhos2019"),
      dados: [],
      quantidade: 5,
      ano: "2019",
    };
  },
  async created() {
    let trabalhos = await this.ref1.get();

    let size = trabalhos.size;
    for (let i = 0; i < this.quantidade; i++) {
      let index = Math.floor(Math.random() * trabalhos.size);
      let doc = trabalhos.docs[index].data();
      let id = trabalhos.docs[index].id;
      this.dados.push({
        key: id,
        titulo: doc.titulo,
        resumo: doc.resumo || "",
        autores: doc.autores || "",
        categoria: doc.categoria || "",
        link: doc.link || "",
        orientadores: doc.orientadores || "",
        tipo: doc.tipo || "",
        ano: this.ano,
      });
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style>
.carousel-caption {
  /* position: absolute; */
  top: 25%;
}
.carousel-text {
  color: brown;
}
</style>