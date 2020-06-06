<template>
    <b-container>

    <b-row class="justify-content-sm-center">
        <b-col col md="auto" sm="auto">
            <p id="logo"><b-icon-people-circle></b-icon-people-circle></p>
        </b-col>
    </b-row>

        <b-form @submit="onSubmit" class="mt-3">
            <b-form-row class="justify-content-sm-center">
                <b-col cols="auto" col md="auto" lg="1" class="mt-2">
                    <p>Username</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8"  col md="5" lg="4" sm="7">
                    <b-form-input id="input-email" v-model="username" required type="text"></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="auto" col md="auto" lg="1" class="mt-2">
                    <p>Password</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input id="input-password" v-model="password" required type="password"></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-md-center">
                <b-col col md="4" lg="2">

                </b-col>
                <b-col col md="auto" lg="auto" >

                </b-col>
                <b-col col md="auto" lg="auto" class="mt-4">
                    <b-button type="submit" variant="primary" id="tombol-masuk" class="pl-3 pr-3">Masuk</b-button>
                </b-col>
                <div id="load">

                </div>
            </b-form-row>
            <b-row class="justify-content-sm-center ">
                <b-col cols="3" col md="2" lg="1">

                </b-col>
                <b-col cols="auto" col md="1" lg="1">

                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" class="mt-3">
                    <p id="font-register">Belum punya akun?<router-link to="/register">Register</router-link></p>
                </b-col>
            </b-row>
        </b-form>


<!--    </b-form>-->
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data(){
          return {
                  username: '',
                  password: '',
                  responses : ''
          }
        },
        name: "JloginPage",
        methods: {
            onSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                // const html = `<img  src="../assets/gif/25.gif" width="90px">`
                // window.load.innerHTML =html
                // document.getElementById("load").append('<img src="../assets/gif/25.gif" width="90px">')
                axios.post('https://portal-desa.herokuapp.com/auth/signin', {
                    username : this.username,
                    password : this.password
                })
                    .then(function (response) {
                        console.log(response)
                        var now = new Date().getTime();
                        currentObj.responses = response.data;
                        if(response.data.accessToken){
                            localStorage.setItem('token',response.data.accessToken)
                            localStorage.setItem('role',response.data.role)
                            localStorage.setItem('sku',response.data.skuLog)
                            localStorage.setItem('nickName',response.data.nickName)
                            localStorage.setItem('setupTime',now)
                            if(response.data.role === "ROLE_MERCHANT"){
                                window.location.href="/produk"
                            }else if(response.data.role === "ROLE_ADMIN") {
                                window.location.href="/admin"
                            }else{
                                window.location.href="/"
                                // this.$router.push({name: 'home'})
                            }
                            // this.$router.push({name: 'ProductPage'})
                        }
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(function (response) {
                        alert("Username atau password salah")
                        currentObj.responses = "Login Failed, Check your username/password";
                    });
            }
        }
    }
</script>

<style scoped>
    #tombol-masuk{
        border-radius: 10px;
    }
    #logo{
        font-size: 7em;
        margin-top: 40px;
        text-align: center
    }
    #input-email{
        border-radius: 10px;
    }
    #input-password{
        border-radius: 10px;
    }


    @media only screen and (max-width: 600px) {
        #tombol-masuk{
            margin-left: 2px;
        }
        #font-register{
            font-size: 0.9em;
            margin-left: 126px;
        }
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        #tombol-masuk{
            margin-left: 20px;
        }
        #font-register{
            font-size: 0.9em;
            margin-left: 70px;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        #tombol-masuk{
            margin-left: 50px;
        }
        #font-register{
            font-size: 0.9em;
            margin-left: 10px;
        }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        #tombol-masuk{
            margin-left: 140px;
        }
        #font-register{
            font-size: 0.9em;
            margin-left: 40px;
        }
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        #tombol-masuk{
            margin-left: 190px;
        }
        #font-register{
            margin-left: 100px;
            font-size: 0.9em;
        }
    }

</style>