<template>
<div>
  <iframe v-if="!DEVELOPMENT" style="border:none;width:100%;height:calc(100vh - 56px);" src="home" onload="
    if(this.contentDocument.title.indexOf('404') >= 0)
      this.src='static/html/home.html'      
  "></iframe>
  <h1 v-if="DEVELOPMENT" class="centered">
    <h1>DEVELOPMENT MODE</h1>
    <h3 style="opacity:0.5">
      <table>
        <tr>- Fault overlay is disabled</tr>
        <tr>- Route & login checks are inactive</tr>
        <tr>- Dynamic banners are disabled</tr>
      </table>
    </h3>    
    <span v-if="connected!=true">
      Expecting GGPOSRV3 on: <code>{{ ENDPOINT }}</code>... {{ connected }}
      <span v-if="connected==false" style="color:red">FAILED.Refresh the page to retry connection</span>
    </span>    
  </h1>
</div>
</template>

<script>
import Utils from '../common/utils'
import { DEVELOPMENT , ENDPOINT } from "../common/config"
import { mapGetters } from "vuex";
  export default {    
    data : ()=>({
      DEVELOPMENT:DEVELOPMENT,
      ENDPOINT:ENDPOINT
    }),
    computed:{
      ...mapGetters([
        "connected"
      ]),
    },
    mounted(){
      Utils.setPageTitle(this.$t('title-home'))
    }
  }
</script>
