<template>
  <div>
      <button id="create" @click="create()">create</button>
      <div class="formType" style="margin-top:50px">
        <input type="number" placeholder="room id">
        <button @click="joinRoom()" type="submit">join</button>
      </div>
      <ul id="roomlist">
          <h1>liste de conversation:</h1>
          <div v-for="room in rooms"  :key="room.id">
            Rooom : {{room.id}} / {{room.user_id}}
            <router-link :to="{ path: `/chatroom/${room.id}`}" >Chat room</router-link>
            <button @click="deleteRoom(room.id)">delete</button>
          </div>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data(){
    return{
      rooms:[]
    }
  },
  mounted() {
    this.getroom()
  },
  methods: {
    async getroom(){
      let url = 'https://celebrated-trifle-667406.netlify.app/rooms';
      const response = await fetch(url);
      const responseJsoned = await response.json();
      console.log(responseJsoned)
      this.$set(this.$data, 'rooms', responseJsoned)
      },
        async create(){
            const url = 'https://celebrated-trifle-667406.netlify.app/rooms';
            await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ user_id: []})
            })
            this.getroom();
        },
        async deleteRoom(id){
            const url = `https://celebrated-trifle-667406.netlify.app/rooms/${id}`;
            await fetch(url,{
                method: 'DELETE',
            })
            this.getroom();
        },
        async joinRoom (){
          const val = document.querySelector('input').value;
          const url = `https://celebrated-trifle-667406.netlify.app/rooms/${val}`;
          const response = await fetch(url,{
              method: 'GET',
          });
          const room = await response.json();
          const userId =  Math.floor(Math.random() * 5)
          if(!room[0].user_id.includes(userId)){
              await fetch(url,{
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ user_id: userId})
          })
          this.getroom();
          } else{
              console.log("error", userId, room[0].user_id )
          }
      },
  },
}
</script>

