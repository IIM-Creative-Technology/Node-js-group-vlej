<template>
   <div>
        <div class="container">
                <input id="email" type="email" v-model="email" placeholder="email">
                <input id="password" type="password" v-model="password" placeholder="password">
                <button @click="submitForm()">CEST TIPAR</button>
        </div>
        <p id="error"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email:"",
            password:"",
        }
    },
methods: {
     async submitForm(){
            console.log('submitForm')
                let url = 'https://nodejsgroupvlej.azurewebsites.net/users/login';
                let req = await fetch(url,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });
                if(req.status == 200){
                    const res = await req.json();
                    localStorage.setItem('userToken', res.token);
                    document.getElementById("error").innerHTML="Vous êtes connecté ! Vous pouvez maintenant <a href=\"/\">accéder aux rooms</a>"
                } else {
                    console.log('error')
                    const res = await req.json();
                    document.getElementById("error").textContent=res.error
                }
            }
    },
}
</script>

<style>

</style>