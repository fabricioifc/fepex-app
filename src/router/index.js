import VueRouter from "vue-router";
import TrabalhoList from "@/pages/TrabalhoList";
import TrabalhoItem from "@/pages/TrabalhoItem";
import Home from "@/pages/Home";

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/trabalhos",
      name: "TrabalhoList",
      component: TrabalhoList,
    },
    {
      path: "/trabalhos/:ano/:id",
      name: "TrabalhoItem",
      component: TrabalhoItem,
    },
  ],
});
