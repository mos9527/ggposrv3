<template>
  <div class="auth-page">    
    <div style="position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);" class="container page">
      <h1 class="mb-2">{{$t('prompt-login',[this.$store.getters.servername])}}</h1>
      
      <v-form
        @submit.prevent="onSubmit(username, password)"
        lazy-validation
        ref="form"        
      >
        <v-text-field
          class="form-control"
          type="text"
          v-model="username"
          :placeholder="$t('login-username')"
        />
        <v-text-field
          class="form-control"
          type="password"
          v-model="password"
          :placeholder="$t('login-password')"
        />
        <v-btn
          :disabled="!check"
          type="submit"
          class="btn btn-lg btn-primary float-right"
          >{{ this.$t('login-action') }}</v-btn
        >
      </v-form>
      <v-container style="color:red">{{errormessage}}</v-container>
    </div>
  </div>
</template>

<script>
import Utils from '../common/utils';
import { AUTH } from "../store/actions.local";
export default {  
  data: () => ({    
    username: '',
    password: '',
    errormessage : ''
  }),
  methods: {
    onSubmit(username, password) {
      this.$store.dispatch(AUTH, { username, password }).then(() => {
        this.$router.push("/channels");
      }).catch(code=>{
        this.username = ''
        this.password = ''
        this.errormessage = this.$t('login-failed', [code])
      });
    },
  },
  computed: {    
    check() {
      return this.username;
      // return this.username && this.password;
    },
  },
  mounted(){
    Utils.setPageTitle(this.$t('title-login'))
  }
};
</script>