<template>
    <b-container class="mb-5">

        <b-row class="justify-content-sm-center">
            <b-col col md="auto" sm="auto">
                <p id="logo">
                    <b-icon-people-circle></b-icon-people-circle>
                </p>
            </b-col>
        </b-row>

        <b-form @submit="formSubmit" class="mt-3">
            <b-form-row class="justify-content-sm-center">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Nama</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-nama"
                            v-model="name"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Alamat</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-textarea
                            id="input-alamat"
                            v-model="alamat"
                            required
                            rows="4"
                    ></b-textarea>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Username</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-username"
                            v-model="username"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Email</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-email"
                            v-model="email"
                            required
                            type="email"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Password</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-password"
                            v-model="password"
                            required
                            type="password"
                            name="password"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Ulang Password</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-ulang-password"
                            v-model="confirmPassword"
                            required
                            type="password"
                            name="ulang-password"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-md-center">
                <b-col col md="4" lg="2">

                </b-col>
                <b-col col md="auto" lg="auto">

                </b-col>
                <b-col col md="auto" lg="auto" class="mt-2">
                    <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Daftar</button>
                </b-col>
            </b-form-row>
        </b-form>
    </b-container>
</template>

<script>
    import axios from 'axios'

    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
                name: '',
                username: '',
                email: '',
                alamat: '',
                password: '',
                confirmPassword: '',
                output: ''
            };
        },
        methods: {
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                if (this.password !== this.confirmPassword) {
                    alert("Password harus sama")
                } else {
                    axios.post('https://portal-desa.herokuapp.com/auth/signup', {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        alamat: this.alamat,
                        password: this.password,
                        confirmPassword: this.confirmPassword,
                        role: "ROLE_USER"
                    }).then(function (response) {
                        var now = new Date().getTime();
                        currentObj.responses = response.data;
                        if (response.data.accessToken) {
                            localStorage.setItem('token', response.data.accessToken)
                            localStorage.setItem('role', "ROLE_USER")
                            localStorage.setItem('sku', response.data.skuLog)
                            localStorage.setItem('nickName', response.data.nickName)
                            localStorage.setItem('setupTime', now)
                            window.location.href = "/produk"
                            this.$router.push({name: 'ProductPage'})
                        }
                    })
                        .catch(function (err) {
                            currentObj.output = err;
                        });
                }
            }
        }
    }
</script>

<style scoped>
    #tombol-masuk {
        border-radius: 10px;
    }

    #logo {
        font-size: 7em;
        margin-top: 40px;
        text-align: center
    }

    #input-email, #input-password, #input-alamat, #input-nama, #input-ulang-password {
        border-radius: 10px;
    }


    @media only screen and (max-width: 600px) {
        #tombol-daftar {
            margin-left: 27px;
        }

        #font-register {
            font-size: 0.9em;
            margin-left: 0px;
        }
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        #tombol-daftar {
            margin-left: 20px;
        }

        #font-register {
            font-size: 0.9em;
            margin-left: 70px;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        #tombol-daftar {
            margin-left: 97px;
        }

        #font-register {
            font-size: 0.9em;
            margin-left: 10px;
        }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        #tombol-daftar {
            margin-left: 140px;
        }

        #font-register {
            font-size: 0.9em;
            margin-left: 40px;
        }
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        #tombol-daftar {
            margin-left: 190px;
        }

        #font-register {
            margin-left: 100px;
            font-size: 0.9em;
        }
    }

</style>