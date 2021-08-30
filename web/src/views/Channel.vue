<template>
  <v-container class="pa-8" flex style="overflow: hidden">
    <!-- User list -->
    <h1 class="mb-5" style="overflow: hidden;" :key="challengeUpdateKey">{{ getChannelObject(this.name).desc }}</h1>
    <v-slide-group multiple show-arrows class="pa-2">
      <v-slide-item v-for="user in channel_users" :key="user.name">
        <v-btn
          class="mx-2 text-none"
          :color="badgeColor[user.status]"
          active-class="purple white--text"
          rounded
          :disabled="user.name == username"
          v-on:click="userMenu"
          :username="user.name"
        >
          <!-- Dont challenge / PM yourself -->
          {{ user.name }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
    <v-divider></v-divider>
    <!-- Chat container -->
    <v-container style="height: calc(100vh - 350px); overflow: scroll">
      <v-container class="chat pa-0 mt-2" v-for="chat in chats" :key="chat.ts">
        <!-- MESSAGE chat card -->
        <v-container
          v-if="!chat.isChallenge"
          :class="chat.isPM ? 'chat-emphasize-1' : ''"
        >
          <div class="pl-3 text-overline">
            {{ chat.sender ? chat.sender : chat.username }} {{ chat.isPM ? `→ ${chat.recipient}` : ""
            }}<small class="ml-2">{{ Utils.getDateString(chat.ts) }}</small>
          </div>
          <div class="pl-3 text--primary">{{ chat.message }}</div>
        </v-container>
        <!-- CHALLENGE chat card -->
        <v-container :key="challengeUpdateKey" v-if="chat.isChallenge" :class="challenge_available[chat.username] ? 'chat-emphasize-2' : 'chat-emphasize-1'">
          <div class="pl-3 text-overline">
            {{ chat.username }}
            <small class="ml-2">{{ Utils.getDateString(chat.ts) }}</small>
          </div>
          <h1 class="pl-3 text--primary font-weight-black">{{challenge_available[chat.username] ? '发起挑战' : '挑战已失效'}}</h1>
          <v-container style="text-align:center">
            <v-btn
              style="width: 40%"
              color="primary"
              class="font-weight-black mr-2"
              :disabled="!challenge_available[chat.username]"
              :to='`/challenge?challenger=${chat.username}`'
            >
              {{ $t('common-accept') }}
            </v-btn>
            <v-btn
             style="width: 40%" 
             class="font-weight-bold" 
             :disabled="!challenge_available[chat.username]"
             v-on:click="()=>decline_challenge(chat.username)"
            >
              {{ $t('common-decline') }}
            </v-btn></v-container
          >
        </v-container>
      </v-container>
    </v-container>
    <!-- Error dialog -->
    <v-dialog v-model="showErrorDialog">
      <v-alert
        class="ma-0"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        {{ errorMessage }}
      </v-alert>
    </v-dialog>
    <!-- Usermenu dialog -->
    <v-dialog v-model="showUserMenu" v-if="selectedUserStatus">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="showUserMenu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedUser }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-subheader>{{ $t('chat-private-message') }}</v-subheader>
        <v-text-field class="pl-4 pr-4 mt-0" v-model="messagePM"></v-text-field>
        <v-container class="text-center">
          <v-btn
            style="width: 50%"
            color="primary"
            plain
            class="font-weight-black"
            v-on:click="
              () => {
                showUserMenu = false;
                send((isPM = true));
              }
            "
          >
            {{ $t('common-send') }}
          </v-btn>
          <v-btn
            style="width: 50%"
            color="primary"
            plain
            class="font-weight-bold"
            v-if="selectedUserStatus.status=='AVAILABLE'"
            :to="'/challenge?challenging=' + selectedUser"
            :disabled="channel_current=='lobby'"
          >
            {{ channel_current=='lobby' ?  '大厅内无法挑战' : '挑战' }}
          </v-btn>
          <v-btn
            style="width: 50%"
            color="green"
            plain
            class="font-weight-bold"
            v-if="selectedUserStatus.status=='PLAYING' || selectedUserStatus.status=='SPECTATING'"
            :to="'/challenge?spectating=' + selectedUser"
          >
            {{ $t('common-spectate') }}
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-footer color="transparent" height="72" inset>
      <v-text-field
        class="pr-4"
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
        v-model="message"
        @keydown.enter="
          (e) => {
            if (e.ctrlKey) send();
          }
        "
      ></v-text-field>
      <v-btn v-on:click="send" icon> <v-icon>mdi-send</v-icon> {{ $t('common-send') }} </v-btn>
    </v-footer>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  JOIN_CHANNEL,
  REFRESH_USERS,
  CHAT_CHANNEL as CHAT_CHANNEL_L,
  PRIVMSG as PRIVMSG_L,
  DECLINE_CHALLENGE,
  REFRESH_HISTROY
} from "../store/actions.local";
import { CANCEL_CHALLENGE, CHAT_CHANNEL, PART_CHANNEL, PRIVMSG, SEND_CHALLENGE } from "../store/actions.remote";
import Utils from "../common/utils";
export default {
  props: ["name"],
  data: () => ({
    chats: [
      // {
      //   isChallenge: true,
      //   username: "mos9257",
      //   ts: 0,
      // },
    ],
    badgeColor:{'PLAYING':'red','AVAILABLE':'green','AWAY':'grey','SPECTATING':'blue'},
    challenge_available : {},
    challengeUpdateKey:0,

    message: "",
    messagePM: "",
    sub: undefined,

    showUserMenu: false,
    selectedUser: undefined,
    selectedUserStatus:undefined,

    showErrorDialog: false,
    errorMessage: "",

    Utils: Utils,
  }),
  methods: {    
    getChannelObject(channel){
      for (var chn of this.channels)
        if (chn.name==channel) return chn      
    },
    showError(message) {
      this.errorMessage = message;
      this.showErrorDialog = true;
    },
    userMenu(e) {
      console.log(e)
      this.selectedUser = e.currentTarget.getAttribute('username')
      for(var user of this.channel_users){ 
        if (user.name==this.selectedUser) {          
          this.selectedUserStatus = user
          break
        }
      }    
      this.showUserMenu = true;
    },
    onMessage(payload, isPM = false, isChallenge = false) {
      this.chats.push({
        isPM: isPM,
        isChallenge: isChallenge,        
        ts: new Date().getTime(),
        ...payload
      });      
    },
    scrollToLast() {
      var chats = this.$el.getElementsByClassName("chat");
      var last = chats[chats.length - 1];
      if (last) last.scrollIntoView({ behavior: "smooth" });
    },
    send(isPM = false) {
      if (isPM == true) {
        this.$store
          .dispatch(PRIVMSG_L, {
            username: this.selectedUser,
            message: this.messagePM,
          })
          .then(() => {
            console.log("[CHAT] PM Sent:", this.messagePM);
            this.messagePM = "";
          })
          .catch((code) => {
            this.showError(this.$t('chat-message-send-failed', [code]));
          });
      } else {
        this.$store.dispatch(CHAT_CHANNEL_L, this.message).then(() => {
          console.log("[CHAT] Sent:", this.message);
          this.message = "";
        });
      }
    },
    join() {
      if (this.channel_current != this.name) {
        this.$store
          .dispatch(JOIN_CHANNEL, this.name)
          .then(() => {
            // joined! lets see who else is here too
            this.$store.dispatch(REFRESH_USERS);
            this.challengeUpdateKey++
          })
          .catch(() => {
            // failed to join,heading back...
            // this.$router.push("/channels");
          });
      }
    },
    unset_challenge(username){
      console.log('[CHALLENGE] Mark challenge as cancled,from:',username)
      // handles when the challenge gets canceled (seesh) or one disconnected
      this.challenge_available[username] = false //  mark challenge as canceled
      this.challengeUpdateKey++
    },
    decline_challenge(username){
      this.$store.dispatch(DECLINE_CHALLENGE,username).then(()=>{
        this.unset_challenge(username)
      }).catch(()=>{
        this.unset_challenge(username)
      })
    },
    onload() {
      if (!this.sub) {
        this.sub = this.$store.subscribeAction((action) => {
          if (action.type == CHAT_CHANNEL || action.type == PRIVMSG)
            this.onMessage(
              action.payload,
              action.type == PRIVMSG,
              false
            );
          if (action.type == SEND_CHALLENGE)
            {
              this.challenge_available[action.payload] = true // mark challenge as still available from this client
              this.onMessage({username:action.payload}, false, true);
            }
          if (action.type == CANCEL_CHALLENGE || action.type == PART_CHANNEL){
            var username = action.payload.username ? action.payload.username : action.payload
            this.unset_challenge(username)
            }
        });
      }
      this.$store.dispatch(REFRESH_HISTROY,this.name).then((d=>{
        console.log('[CHAT] Updated current chats:',d)
        this.chats=d
      }))      
      this.join();
      this.$store.dispatch(REFRESH_USERS);
    },
  },
  computed: {
    ...mapGetters([      
      "channels",
      "channel_current",
      "channel_users",
      "username",
      "connected",
    ]),
  },
  destroy() {
    if (this.sub) this.sub(); // unsubscribe from actions
  },
  mounted() {
    Utils.setPageTitle(this.$t('title-channel',[this.name]))
    if (this.connected) this.onload();
  },
  watch: {
    connected() {
      if (this.connected) this.onload();
    }
  },
};
</script>
