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
        <v-container style="display: flex">
          <v-btn style="flex: 1" v-if="!authenticated" to="/login">
            <v-icon>mdi-account</v-icon> {{ $t("title-login") }}
          </v-btn>
          <v-btn style="flex: 1" to="/">
            <v-icon>mdi-home</v-icon> {{ $t("title-home") }}
          </v-btn>
          <v-btn style="flex: 1" v-if="authenticated" to="/channels">
            <v-icon>mdi-controller-classic</v-icon> {{ $t("title-channels") }}
          </v-btn>
        </v-container>
      </v-footer>
    </v-main>
    <div
      class="overlay1"
      :class="connected == false ? 'overlay-fatal' : ''"
      v-if="!connected"
    >
      {{
        connected == undefined
          ? $t("common-conncecting")
          : $t("common-connection-unavailable")
      }}
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "authenticated",
      "connected",
      // ...
    ]),
  },
};
</script>
