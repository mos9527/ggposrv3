<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container class="pa-0" fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <v-footer app>
        <v-bottom-navigation grow horizontal style="height:auto;width:100%;background-color:transparent;box-shadow:none">
          <v-btn style="flex: 1" v-if="DEVELOPMENT || !authenticated" to="/login">
            <v-icon>mdi-account</v-icon> {{ $t("title-login") }}
          </v-btn>
          <v-btn style="flex: 1" to="/">
            <v-icon>mdi-home</v-icon> {{ $t("title-home") }}
          </v-btn>
          <v-btn style="flex: 1" v-if="DEVELOPMENT || authenticated" to="/channels">
            <v-icon>mdi-controller-classic</v-icon> {{ $t("title-channels") }}
          </v-btn>
        </v-bottom-navigation >
      </v-footer>
    </v-main>
    <div
      class="overlay"
      :class="connected == false ? 'overlay-fatal' : ''"
      v-if="!connected && !DEVELOPMENT"
    >
      {{
        connected == undefined
          ? $t("common-conncecting")
          : $t("common-connection-unavailable")
      }}
    </div>
    <audio id="player" autoplay hidden></audio>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { DEVELOPMENT } from "./common/config"
import { AUTH } from "./store/actions.local";
export default {
  data:()=>({
    'DEVELOPMENT':DEVELOPMENT,    
  }),
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "authenticated",
      "connected",
      // ...
    ]),
  },
  mounted(){
    if (DEVELOPMENT)
      this.$store.dispatch(AUTH, { username: Date.now().toString(36) , password:'GGPOSRV3Development' })    
  }
};
</script>
