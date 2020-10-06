import VueRouter from "vue-router";
import TrabalhoList from "@/components/TrabalhoList";
import TrabalhoItem from "@/components/TrabalhoItem";
import Home from "@/components/Home";

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
