<template>
  <v-container fluid>
      <v-row v-for="channel in channels" :key="channel.name">
        <v-card style="width:100%;margin-top:1vh" :to="'/channel/?name=' + channel.name">
          <v-img
            :src="'/static/card/' + channel.name + '.png'"
            class="subheading white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            aspect-ratio="6"
          >
            <v-chip class="ma-5 float-right" :color="channel_current == channel.name ? 'red' : 'primary'" label text-color="white">
              在线：{{ channel.online }}
            </v-chip>
            <v-card-title style="margin-bottom:0" v-text="channel.desc"></v-card-title>
          </v-img>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { REFRESH_CHANNEL } from "../store/actions.local";
export default {
  name: "Channels",
  methods: {
    refresh() {
      this.$store.dispatch(REFRESH_CHANNEL);
    },
  },
  computed: {
    ...mapGetters(["channels","channel_current"]),
  },
  created() {
    this.refresh();
  },
};
</script>
