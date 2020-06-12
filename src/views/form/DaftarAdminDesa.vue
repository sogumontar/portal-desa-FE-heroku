<template>
    <div>
        <b-container class="mb-5">
            <br>
            <h1 align="center">Daftar Admin Desa</h1>
            <hr>
            <b-form @submit="formSubmit" class="mt-3">
                    <b-form-row class="justify-content-sm-center">
                        <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                            <p>Nama Desa</p>
                        </b-col>
                        <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                            <p>:</p>
                        </b-col>
                        <b-col cols="8"  col md="5" lg="4" sm="7">
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
                        <p>Kecamatan</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7" >
                        <b-select v-on:change="test" v-model="kec" required>
                            <b-select-option  v-for="kecamatan in kecamatan" :key="kecamatan.sku"  v-bind:value="kecamatan.nama">{{kecamatan.nama}}</b-select-option>
                        </b-select>
                    </b-col>
                </b-form-row>

                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                        <p>Username</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8"  col md="5" lg="4" sm="7">
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
                    <b-col cols="8"  col md="5" lg="4" sm="7">
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
                    <b-col cols="8"  col md="5" lg="4" sm="7">
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
                    <b-col cols="8"  col md="5" lg="4" sm="7">
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
                    <b-col col md="auto" lg="auto" >

                    </b-col>
                    <b-col col md="auto" lg="auto" class="mt-2">
                        <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Daftar</button>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "DaftarAdminDesa",
        data() {
            return {
                kecamatan: [],
                name : '',
                username : '',
                email : '',
                kec : '',
                password : '',
                confirmPassword : '',
                output: ''
            }
        },
        async mounted() {
            this.load()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/kecamatan/')
                this.kecamatan = response.data
            },
            test(){
                console.log("value : "+this.kec)
            },
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                if(this.password !== this.confirmPassword){
                    alert("Password harus sama")
                } else {
                    axios.post('https://portal-desa.herokuapp.com/adminDev/add', {
                        nama : this.name,
                        kecamatan : this.kec,
                        username : this.username,
                        email : this.email,
                        password : this.password,
                        confirmPassword : this.confirmPassword
                    }).then( (response) => {
                        console.log(response)
                        alert("Admin Desa Registered Successfully")
                        // this.$router.push({name: 'daftarAdmin'})
                    })
                        .then(
                            this.$router.push({name: 'daftarAdmin'})
                        )
                        .catch(function (err) {
                            currentObj.output = err;
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>