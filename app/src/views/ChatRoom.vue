<template>
  <div class="about">
    <h1>This is an about page</h1>
      <div class="container">
          <div class="row " style="margin: 50px">
              <div class="col-9">
                  <div id="chat" style="width:100%; border: black solid 1px; height: 500px;overflow: auto;">
                  <div v-for="message in messages"  :key="message.msg">
                   {{message.id}} {{message.msg}}
                  </div>
                  </div>
                  <div class="row" style="margin-top: 20px">
                      <div class="col-10">
                          <input type="text" class="form-control" id="chatinput" placeholder="message here">
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
      info:{},
      messages:[],
    }
  },
  async created() {
    this.socket.on('message'+this.$route.params.id, (data) => {
           this.messages.push(data)
      });
      const id = this.$route.params.id
      const url = `http://127.0.0.1:3000/chatroom/${id}`;
      await fetch(url)
  },
  methods: {
    sendMessage() {
        this.socket.emit('message', {
            msg: 'message'
        });
    }
  },
  
}
</script>