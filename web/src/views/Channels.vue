<template>
  <v-container class="pa-8" fluid>
    <h1 class="mb-5">{{ $t('title-channels') }}</h1>
      <v-row v-for="channel in channels" :key="channel.name">
        <v-card style="width:100%;margin-top:1vh;z-index:2;overflow:hidden;height:100px" :to="'/channel/?name=' + channel.name">
          <video
            :src="DEVELOPMENT ? '' : '/banners/' + channel.name"
            class="hero-video" autoplay loop muted
          >  
           <!-- No video banners will be loaded when in development -->
          </video>
          <v-container class="hero-content">
            <span class="float-left ma-4 mt-9 headline font-weight-bold" style="position:absolute" >{{channel.desc}}</span>
            <v-chip :key="channelsUpdate" class="ma-4 mt-9 float-right" :color="channel_current == channel.name ? 'red' : 'primary'" label text-color="white">
                {{ $t('channels-online-player-count', [channel.online]) }}
            </v-chip>            
          </v-container>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Utils from '../common/utils';
import { REFRESH_CHANNELS } from "../store/actions.local";
import { DEVELOPMENT } from "../common/config"
export default {
  data : () => ({
    channelsUpdate : 0,
    sub : undefined,
    DEVELOPMENT : DEVELOPMENT
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
