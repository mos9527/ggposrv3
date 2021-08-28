<template>
  <v-app>
    <v-card>
      <v-app-bar>
        <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!authenticated" to="/login" icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn to="/" icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn v-if="authenticated" to="/channels" icon>
          <v-icon>mdi-controller-classic</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid >
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <div class="overlay" v-if="!connected">
      {{ connected == undefined ? '连接中' : '连接失败'}}
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "authenticated",
      "connected"
      // ...
    ]),
  },
};
</script>
