<template>
  <div class="about">
    <h1>This is an about page</h1>
      <div class="container">
          <div class="row " style="margin: 50px">
              <div class="col-9">
                  <div id="chat" style="width:100%; border: black solid 1px; height: 500px;overflow: auto;">
                  <div v-for="message in messages"  :key="message.msg">
                   {{message.user_id}} {{message.message}}
                  </div>
                  </div>
                  <div class="row" style="margin-top: 20px">
                      <div class="col-10">
                          <input type="text" v-model="msgToSend" class="form-control" id="chatinput" placeholder="message here">
                      </div>
                      <div class="col-2">
                          <button id="submit" class="btn btn-primary" @click="sendMessage()">send</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import io from 'socket.io-client';
export default {
  data(){
    return{
      socket : io('http://localhost:3000'),
      messages:[],
      msgToSend:'',
      info:{}
    }
  },
  async created() {
    this.socket.on('message'+this.$route.params.id, (data) => {
      this.info= data
      this.messages.push(data)
      });
      const id = this.$route.params.id
      const url = `https://celebrated-trifle-667406.netlify.app/chatroom/${id}`;
      await fetch(url)
  },
  async mounted() {
    const id = this.$route.params.id
    let url = 'https://celebrated-trifle-667406.netlify.app/messages/rooms/'+id;
    let response = await fetch(url);
    const messages = await response.json();
    this.$set(this.$data, "messages"  ,messages)
  },
  methods: {
    async sendMessage() {
        this.socket.emit('message', {
            message: this.msgToSend
        });
        const url = 'https://celebrated-trifle-667406.netlify.app/messages';
          await fetch(url,{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ user_id:  this.info.id ,message: this.msgToSend, idroom:this.$route.params.id})
        });
    }
  },
  
}
</script>