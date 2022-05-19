<template>
   <div>
        <div class="container formType">
                <input id="name" type="text" v-model="name" placeholder="name">
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
            name:"",
            email:"",
            password:"",
        }
    },
methods: {
     async submitForm(){
        let url = 'http://127.0.0.1:3000/users/register';
        let req = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.name,
                email: this.email,
                password: this.password
            })
        });
        const res = await req.json();
        console.log(res);
        if(req.status == 200){
            document.getElementById("error").innerHTML=res.success+" ! Vous pouvez maintenant <a href=\"/login\">vous connecter</a>."
        } else {
            document.getElementById("error").textContent=res.error
        }
    }
    },
}
</script>

<style>

</style>