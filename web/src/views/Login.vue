<template>
  <div class="auth-page">
    <div class="container page">
      <v-form
        @submit.prevent="onSubmit(username, password)"
        lazy-validation
        ref="form"        
      >
        <v-text-field
          class="form-control"
          type="text"
          v-model="username"
          placeholder="用户名"
        />
        <v-text-field
          class="form-control"
          type="password"
          v-model="password"
          placeholder="密码"
        />
        <v-btn
          :disabled="!check"
          type="submit"
          class="btn btn-lg btn-primary float-right"
          >登陆</v-btn
        >
      </v-form>
      <v-container style="color:red">{{errormessage}}</v-container>
    </div>
  </div>
</template>

<script>
import { AUTH } from "../store/actions.local";
export default {
  name: "Login",
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
        this.errormessage = `登陆失败：${code}`
      });
    },
  },
  computed: {
    check() {
      return this.username;
      // return this.username && this.password;
    },
  },
};
</script>