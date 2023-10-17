<template>
  <TheSidebar> </TheSidebar>
  <div class="app-content">
    <TheHeader> </TheHeader>
    <TheContainer> </TheContainer>
  </div>
</template>

<script>
import TheHeader from "../src/layout/TheHeader.vue";
import TheSidebar from "../src/layout/TheSidebar.vue";
import TheContainer from "../src/layout/TheContainer.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheContainer,
    TheSidebar,
  },
};
</script>

<style>
#app {
  display: flex;
  * {
    padding: 0;
    margin: 0;
  }
}
.app-content {
  width: 100%;
}
</style>
