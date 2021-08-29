<template>
  <v-container class="pa-0" flex style="overflow: hidden">
    <v-container app v-if="player1Status || player2Status" color="transparent" inset>
      <v-container style="display:flex;flex-direction:column">
        <div v-if="canceled" class="overlay on-element">
          挑战已失效
        </div>
        <v-container v-if="player1Status" class="mb-0 pa-0">
          <p style="float:left">
            <b>P<sub>1</sub></b>：{{ player1Status.username }}
          </p>
          <p style="float:right">
            <strong class="pr-2">
              <v-icon :color="player1Status.emulator ? 'green' : 'red'">mdi-switch</v-icon>
            </strong>            
            <strong class="pr-2">
              <v-icon :color="player1Status.status=='PLAYING' ? 'green' : 'red'">mdi-state-machine</v-icon>
              {{ player1Status.status }}
            </strong>
            <strong class="pr-2">
              <v-icon :color="player1Status.side=='PLAYER1' ? 'green' : 'red'">mdi-account</v-icon>
              {{ player1Status.side }}
            </strong>
          </p>
        </v-container>

        <v-container v-if="player2Status" class="mb-0 pa-0">
          <p style="float:left">
            <b>P<sub>2</sub></b>：{{ player2Status.username }}
          </p>
          <p style="float:right">
            <strong class="pr-2">
              <v-icon :color="player2Status.emulator ? 'green' : 'red'">mdi-switch</v-icon>
            </strong>            
            <strong class="pr-2">
              <v-icon :color="player2Status.status=='PLAYING' ? 'green' : 'red'">mdi-state-machine</v-icon>
              {{ player2Status.status }}
            </strong>
            <strong class="pr-2">
              <v-icon :color="player2Status.side=='PLAYER2' ? 'green' : 'red'">mdi-account</v-icon>
              {{ player2Status.side }}
            </strong>
          </p>
        </v-container>
      </v-container>
    <!-- User list -->
    <v-slide-group multiple show-arrows class="pa-2">
      <v-slide-item v-for="user in spectators" :key="user">
        <v-chip class="mx-2 text-none"> {{ user }} </v-chip>
      </v-slide-item>
    </v-slide-group>      
      <!-- Player status -->      
      <v-divider class="mt-0"></v-divider>
    </v-container>
    <v-container class="log-view pt-0">
      <div
        v-for="log in logs"
        :key="log.id"
        :style="'color:' + logColors[log.level]"
      >
        <div v-if="!log.islink" >[{{ log.level }}] {{ Utils.getDateString(log.ts) }} {{ log.msg }}</div>
        <div v-if="log.islink" > 
           <v-btn style="width:100%;height:48px" color="primary" v-on:click="launchPrecursor($event)"> JOIN GAME </v-btn>
        </div>
      </div>
      <div style="display:flex"><v-text-field placeholder="公屏消息" v-model="chatMessage" @keydown.enter="(e) => { if (e.ctrlKey) send() }"></v-text-field>
      </div>
    </v-container>
    <!-- Log box -->
    <v-footer app color="transparent" inset>
      <v-container>
        <v-btn
          v-if="!canceled"
          class="pr-4"
          color="error"
          style="width: 100%"
          v-on:click="cancel_challenge"
          >取消挑战</v-btn
        >
        <v-btn
          v-if="canceled"
          class="pr-4"
          style="width: 100%"
          :to="`/channel/?name=${channel_current}`"
          >返回 {{ channel_current }}</v-btn
        >
      </v-container>
    </v-footer>
    <!-- Controls -->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  ACCEPT_CHALLENGE as ACCEPT_CHALLENGE_L,
  CANCEL_CHALLENGE as CANCEL_CHALLENGE_L,
  SEND_CHALLENGE as SEND_CHALLENGE_L,
  WATCH_CHALLENGE as WATCH_CHALLENGE_L,
  CHAT_CHANNEL as CHAT_CHANNEL_L,
} from "../store/actions.local";
import Utils from "../common/utils";
import {
  ACCEPT_CHALLENGE,
  DECLINE_CHALLENGE,
  CANCEL_CHALLENGE,
  PART_CHANNEL,
  STATUS,
  CHAT_CHANNEL,
  INGAME_CHAT,
  PRIVMSG,
  WATCH_CHALLENGE,
  SPECTATE
} from "../store/actions.remote";
export default {
  name: "Challenge",
  props: ["challenging", "challenger","spectating"],
  data: () => ({
    logs: [],
    logId:0,
    logColors: { D: "blue", I: "green", E: "red" },

    chatMessage : undefined,

    quark : undefined,
    spectators : [],
    player1Status: {},
    player2Status: {},
    statusUpdateKey: 0,

    canceled: false,

    sub: undefined,
    Utils: Utils,
  }),
  methods: {
    getChannelObject(channel){
      for (var chn of this.channels)
        if (chn.name==channel) return chn
    },
    launchPrecursor(e){
      console.log(this.channels)
      e.currentTarget.classList.remove('primary')
      var channel = this.getChannelObject(this.channel_current)
      var url = `${channel.rom},${this.ggpo_host}:${this.ggpo_port}@${this.quark}`
      if (this.opponent) /* We're in a match */        
        url = `moscade://match,${url}`
      if (this.spectating) /* We're spectating */      
        url = `moscade://spectate,${url}`
      console.log('[CHALLENGE] Opening MOSCADE URI',url)
      window.open(url)
    },
    log(level, msg , islink=false) {
      this.logs.push({ id:this.logId++, ts: new Date().getTime() , level: level, msg: msg ,islink:islink});
    },
    send(){
      this.$store.dispatch(CHAT_CHANNEL_L, this.chatMessage).then(() => {
          console.log("[CHAT] Sent:", this.chatMessage);
          this.chatMessage = "";
        });
    },
    spectate(){
      this.log('I',`观战 ${this.spectating} 的比赛`)
      this.$store.dispatch(WATCH_CHALLENGE_L,this.spectating).catch((e)=>{
        this.log('E',`观战失败：${e}`)
        this.canceled = true
      })
    },
    cancel_challenge() {
      this.$store
        .dispatch(CANCEL_CHALLENGE_L, this.opponent)
        .then(() => {
          this.log("E", "挑战已被取消");
          this.canceled = true;
        })
        .catch((e) => {
          this.log("E", `挑战取消失败:${e}`);
          this.canceled = true;
        });
    },
    send_challenge() {
      /* challenges our opponent */
      this.log("D", `挑战 ${this.opponent}`);
      this.$store
        .dispatch(SEND_CHALLENGE_L, this.opponent)
        .then(() => {
          this.log("I", "已发送挑战邀请");
        })
        .catch((e) => {
          this.log("E", `邀请失败：${e}`);
          this.canceled = true;
        });
    },
    accept_challenge() {
      /* accept current challenge */
      this.log("D", `接受 ${this.opponent} 的挑战`);
      this.$store
        .dispatch(ACCEPT_CHALLENGE_L, this.opponent)        
        .catch((e) => {
          this.log("E", `接受失败：${e}`);
          this.canceled = true;
        });
    },
    onload() {
      this.log("D", `${this.username} 已加入`);
      if (!this.sub) {
        this.sub = this.$store.subscribeAction((action) => {
          if ( action.type == SPECTATE ){
            this.spectators = action.payload
          }
          if ( action.type == WATCH_CHALLENGE ) {
            this.quark = action.payload.quark
            this.log("I",`观战 QUARK: ${action.payload.quark}`)
            this.log("I",this.quark,true) 
          }
          if ( action.type == CHAT_CHANNEL || action.type == INGAME_CHAT ){
            this.log("I",`[${action.type == CHAT_CHANNEL ? '公屏' : '游戏内'}] ${action.payload.username} : ${action.payload.message}`)
          }
          if ( action.type == PRIVMSG ){
            this.log("I",`[私信] ${action.payload.sender} : ${action.payload.message}`)
          }
          if (
            action.type == CANCEL_CHALLENGE ||
            action.type == PART_CHANNEL ||
            action.type == DECLINE_CHALLENGE
          ) {
            this.log("E", `挑战已失效：${action.type}`);
            this.canceled = true;
          }
          if (action.type == ACCEPT_CHALLENGE) {
            this.quark = action.payload;            
            this.log("I", `比赛 QUARK:${this.quark}`);            
            this.log("I",this.quark,true)            
          }
          if (action.type == STATUS) {
            if (this.player1Status)
              if (action.payload.username == this.player1Status.username)
                this.player1Status = action.payload;
              else if (action.payload.side == "PLAYER1")
                this.player1Status = action.payload;
            /* update for P1 */
            if (this.player2Status)
              if (action.payload.username == this.player2Status.username)
                this.player2Status = action.payload;
              else if (action.payload.side == "PLAYER2")
                this.player2Status = action.payload;
            /* update for P2 */
            this.statusUpdateKey += 1;
          }
        });
      }
      if (this.challenging) this.send_challenge();
      if (this.challenger) this.accept_challenge();
      if (this.spectating) this.spectate()
    },
  },
  computed: {
    ...mapGetters([
      "channel_current",
      "channel_users",
      "channels",
      "username",
      "connected",
      "ggpo_host",
      "ggpo_port"
    ]),
    opponent() {
      return this.challenging ? this.challenging : this.challenger;
    },
  },
  destroy() {
    if (this.sub) this.sub(); // unsubscribe from actions
  },
  mounted() {
    if (this.connected) this.onload();
  },
  watch: {
    connected() {
      if (this.connected) this.onload();
    },
  },
};
</script>
