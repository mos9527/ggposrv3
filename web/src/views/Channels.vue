<template>
  <v-container class="pa-8" fluid>
    <h1 class="mb-5">{{ $t('title-channels') }}</h1>
      <v-row v-for="channel in channels" :key="channel.name">
        <v-card style="width:100%;margin-top:1vh" :to="'/channel/?name=' + channel.name">
          <v-img
            :src="'/static/banners/' + channel.name + '.png'"
            class="subheading white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            aspect-ratio="6"
          >
            <v-chip :key="channelsUpdate" class="ma-5 float-right" :color="channel_current == channel.name ? 'red' : 'primary'" label text-color="white">
              {{ $t('channels-online-player-count', [channel.online]) }}
            </v-chip>
            <v-card-title style="margin-bottom:0" v-text="channel.desc"></v-card-title>
          </v-img>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Utils from '../common/utils';
import { REFRESH_CHANNELS } from "../store/actions.local";
export default {
  data : () => ({
    channelsUpdate : 0,
    sub : undefined
  }),
  computed: {
    ...mapGetters(["channels","channel_current"]),
  },
  mounted() {
    Utils.setPageTitle(this.$t('title-channels'))
    this.$store.dispatch(REFRESH_CHANNELS)
    this.sub = this.$store.subscribeAction((action) => {
      if(action.type == REFRESH_CHANNELS)
        this.channelsUpdate++      
    })
  },
  destory(){
    this.sub()
  }
};
</script>
