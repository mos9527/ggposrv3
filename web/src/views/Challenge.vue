<template>
  <v-container class="pa-8" flex>
    <h1>{{ $t("prompt-challenge") }}</h1>
    <v-container
      app
      v-if="player1Status || player2Status"
      color="transparent"
      inset
    >
      <v-container style="display: flex; flex-direction: column">
        <div v-if="canceled" class="overlay on-element">
          {{ $t("challenge-became-not-available") }}
        </div>
        <v-container v-if="player1Status" class="mb-0 pa-0">
          <p style="float: left">
            <b>P<sub>1</sub></b
            >：{{ player1Status.username }}
          </p>
          <p style="float: right">
            <strong class="pr-2">
              <v-icon :color="player1Status.emulator ? 'green' : 'red'"
                >mdi-switch</v-icon
              >
            </strong>
            <strong class="pr-2">
              <v-icon
                :color="player1Status.status == 'PLAYING' ? 'green' : 'red'"
                >mdi-state-machine</v-icon
              >
              {{ player1Status.status }}
            </strong>
            <strong class="pr-2">
              <v-icon :color="player1Status.side == 'PLAYER1' ? 'green' : 'red'"
                >mdi-account</v-icon
              >
              {{ player1Status.side }}
            </strong>
          </p>
        </v-container>

        <v-container v-if="player2Status" class="mb-0 pa-0">
          <p style="float: left">
            <b>P<sub>2</sub></b
            >：{{ player2Status.username }}
          </p>
          <p style="float: right">
            <strong class="pr-2">
              <v-icon :color="player2Status.emulator ? 'green' : 'red'"
                >mdi-switch</v-icon
              >
            </strong>
            <strong class="pr-2">
              <v-icon
                :color="player2Status.status == 'PLAYING' ? 'green' : 'red'"
                >mdi-state-machine</v-icon
              >
              {{ player2Status.status }}
            </strong>
            <strong class="pr-2">
              <v-icon :color="player2Status.side == 'PLAYER2' ? 'green' : 'red'"
                >mdi-account</v-icon
              >
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
    <!-- Controls -->
    <v-container>
      <v-btn
        v-if="!canceled && !this.spectating"
        class="pr-4"
        color="error"
        style="width: 100%"
        v-on:click="cancel_challenge"
        >{{ $t("challenge-cancel") }}</v-btn
      >
      <v-btn
        v-if="canceled"
        class="pr-4"
        style="width: 100%;z-index:100"
        :to="`/channel/?name=${channel_current}`"
        >{{ $t("common-back-to",[this.channel_current]) }}</v-btn
      >
    </v-container>
    <!-- Logs -->
    <v-container class="log-view pt-0">
      <div
        v-for="log in logs"
        :key="log.id"
        :style="'color:' + logColors[log.level]"
        class="log-message"
      >
        <div v-if="!log.islink">
          [{{ log.level }}] {{ Utils.getDateString(log.ts) }} {{ log.msg }}
        </div>
        <div v-if="log.islink && !canceled">
          <v-btn
            style="width: 100%; height: 48px"
            :key="statusUpdateKey"
            :disabled="spectating && !getIsReadyForSpectating()"
            color="primary"
            v-on:click="launchPrecursor($event)"
          >
            {{
              spectating && !getIsReadyForSpectating()
                ? $t("challenge-waiting-for-player")
                : $t("challenge-join-match")
            }}
          </v-btn>
        </div>
      </div>
      <div style="display: flex">
        <v-text-field
          :placeholder="
            opponent
              ? $t('chat-private-message')
              : $t('chat-channel-message') + ' Ctrl+Enter'
          "
          v-model="chatMessage"
          @keydown.enter="
            (e) => {
              if (e.ctrlKey) send(opponent);
            }
          "
        ></v-text-field>
      </div>
    </v-container>
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
  PRIVMSG as PRIVMSG_L,
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
  SPECTATE,
} from "../store/actions.remote";
export default {
  props: ["challenging", "challenger", "spectating"],
  data: () => ({
    logs: [],
    logId: 0,
    logColors: { D: "blue", I: "green", E: "red" },

    chatMessage: undefined,

    quark: undefined,
    spectators: [],
    player1Status: {},
    player2Status: {},
    statusUpdateKey: 0,

    canceled: false,

    sub: undefined,
    Utils: Utils,
  }),
  methods: {
    scrollToLast() {
      var chats = this.$el.getElementsByClassName("log-message");
      var last = chats[chats.length - 1];
      if (last) last.scrollIntoView({ behavior: "smooth" });
    },
    getIsReadyForSpectating() {
      return (
        this.player1Status &&
        this.player2Status &&
        this.player1Status.emulator &&
        this.player2Status.emulator
      );
    },
    getChannelObject(channel) {
      for (var chn of this.channels) if (chn.name == channel) return chn;
    },
    launchPrecursor(e) {
      console.log(this.channels);
      e.currentTarget.classList.remove("primary");
      var channel = this.getChannelObject(this.channel_current);
      var url = `${channel.rom},${this.ggpo_host}:${this.ggpo_port}@${this.quark}`;
      if (this.opponent) /* We're in a match */ url = `moscade://match,${url}`;
      if (this.spectating)
        /* We're spectating */
        url = `moscade://spectate,${url}`;
      console.log("[CHALLENGE] Opening MOSCADE URI", url);
      window.open(url);
    },
    log(level, msg, islink = false) {
      this.logs.push({
        id: this.logId++,
        ts: new Date().getTime(),
        level: level,
        msg: msg,
        islink: islink,
      });
      setTimeout(this.scrollToLast, 100);
    },
    send(isPM) {
      if (isPM) {
        this.$store
          .dispatch(PRIVMSG_L, {
            username: this.opponent,
            message: this.chatMessage,
          })
          .then(() => {
            console.log("[CHAT] PM Sent:", this.chatMessage);
            this.chatMessage = "";
          })
          .catch((code) => {
            this.showError(
              `${this.$t("chat-private-message-send-failed")} ${code}`
            );
          });
      } else {
        this.$store.dispatch(CHAT_CHANNEL_L, this.chatMessage).then(() => {
          console.log("[CHAT] Channel chat:", this.chatMessage);
          this.chatMessage = "";
        });
      }
    },
    spectate() {
      this.log("I", this.$t("challenge-spectate-match", [this.spectating]));
      this.$store.dispatch(WATCH_CHALLENGE_L, this.spectating).catch((e) => {
        this.log("E", this.$t("challenge-spectate-match-failed", [e]));
        this.canceled = true;
      });
    },
    cancel_challenge() {
      this.$store
        .dispatch(CANCEL_CHALLENGE_L, this.opponent)
        .then(() => {
          this.log("E", this.$t("challenge-canceled-by-remote"));
          this.canceled = true;
        })
        .catch((e) => {
          this.log("E", this.$t("challenge-cancel-failed", [e]));
          this.canceled = true;
        });
    },
    send_challenge() {
      /* challenges our opponent */
      this.log("D", this.$t("challenge-challenging-opponent", [this.opponent]));
      this.$store
        .dispatch(SEND_CHALLENGE_L, this.opponent)
        .then(() => {
          this.log("I", this.$t("challenge-challenge-sent"));
        })
        .catch((e) => {
          this.log("E", this.$t("challenge-challenging-opponent-failed", [e]));
          this.canceled = true;
        });
    },
    accept_challenge() {
      /* accept current challenge */
      this.log(
        "D",
        this.$t("challenge-challenge-accept-from", [this.opponent])
      );
      this.$store.dispatch(ACCEPT_CHALLENGE_L, this.opponent).catch((e) => {
        this.log("E", this.$t("challenge-failed-to-accept-from", [e]));
        this.canceled = true;
      });
    },
    onload() {
      this.log("D", this.$t("challenge-hello-message", [this.username]));
      if (!this.sub) {
        this.sub = this.$store.subscribeAction((action) => {
          if (action.type == SPECTATE) {
            this.spectators = action.payload;
          }
          if (action.type == WATCH_CHALLENGE) {
            this.quark = action.payload.quark;
            this.log(
              "I",
              this.$t("challenge-quark-for-spectating", [action.payload.quark])
            );
            this.log("I", this.quark, true);
            this.statusUpdateKey += 1;
          }
          if (action.type == CHAT_CHANNEL || action.type == INGAME_CHAT) {
            this.log(
              "I",
              this.$t("challenge-chat-new-message", [
                action.type == CHAT_CHANNEL
                  ? this.$t("chat-channel-message")
                  : this.$t("chat-ingame-message"),
                action.payload.username,
                action.payload.message,
              ])
            );
          }
          if (action.type == PRIVMSG) {
            this.log(
              "I",
              this.$t("challenge-chat-pm", [
                action.payload.sender,
                action.payload.message,
              ])
            );
          }
          if (
            action.type == CANCEL_CHALLENGE ||
            action.type == PART_CHANNEL ||
            action.type == DECLINE_CHALLENGE
          ) {
            this.log("E", this.$t("challenge-became-not-available"));
            if (
              this.player1Status.status == "PLAYING" ||
              this.player2Status.status == "PLAYING"
            )
              this.log("E", this.$t("challenge-cancel-reason-client-quit"));
            else
              this.log(
                "E",
                this.$t("challenge-cancel-reason-unknown", [action.type])
              );
            this.canceled = true;
            this.statusUpdateKey += 1;
          }
          if (action.type == ACCEPT_CHALLENGE) {
            this.quark = action.payload;
            this.log("I", this.$t("challenge-quark-for-match", [this.quark]));
            this.log("I", this.quark, true);
            this.statusUpdateKey += 1;
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
            if (this.player1Status && this.player2Status)
              Utils.setPageTitle(
                this.$t("title-challenge", [
                  this.player1Status.username,
                  this.player2Status.username,
                ])
              );
            this.statusUpdateKey += 1;
          }
        });
      }
      if (this.challenging) this.send_challenge();
      if (this.challenger) this.accept_challenge();
      if (this.spectating) this.spectate();
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
      "ggpo_port",
    ]),
    opponent() {
      return this.challenging ? this.challenging : this.challenger;
    },
  },
  destroy() {
    if (this.sub) this.sub(); // unsubscribe from actions
  },
  mounted() {
    Utils.setPageTitle(this.$t("challenge-waiting-for-player"));
    if (this.connected) this.onload();
  },
  watch: {
    connected() {
      if (this.connected) this.onload();
    },
  },
};
</script>
