<template>
<div>
  <iframe style="border:none;width:100%;height:calc(100vh - 56px);" src="/static/html/home.html"></iframe>
</div>
</template>

<script>
import Utils from '../common/utils'
  export default {    
    mounted(){
      Utils.setPageTitle(this.$t('title-home'))
    }
  }
</script>
