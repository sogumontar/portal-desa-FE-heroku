<template>
    <b-container>
        <h2 align="center" style="align-items: center" class="judul mt-3">Profile {{nama}}</h2>
        <hr>
        <b-row>
            <b-col col lg="1">

            </b-col>

            <b-col col lg="9">
                <br><br>
                <b-row class="mb-3 metric-tarif">

                    <b-col class="keterangan p-4">

                        <b-form-row class="justify-content-md-center" v-if="role === 'ROLE_MERCHANT'">
                            <b-col col md="4" lg="4">
                            </b-col>
                            <b-col col md="5" lg="5">
                            </b-col>
                            <b-col col md="auto" lg="3" class="mt-3">
                                <button type="submit"  class="pl-3 pr-3 btn btn-primary"><router-link :to="'updateDesa/'+profile.sku">Detail
                                    Desa</router-link>
                                </button>
                            </b-col>
                        </b-form-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Nama </p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="profile.name"
                                        required
                                        type="text"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Email</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="profile.email"
                                        required
                                        type="email"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Alamat</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="profile.alamat"
                                        required
                                        type="text"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-form-row class="justify-content-md-center">
                            <b-col col md="4" lg="5">

                            </b-col>
                            <b-col col md="5" lg="5">

                            </b-col>
                            <b-col col md="auto" lg="2" class="mt-3">
                                <button type="submit" id="tombol-daftar" @click="update"
                                        class="pl-3 pr-3 btn btn-primary">Ubah
                                </button>
                            </b-col>
                        </b-form-row>
                        <br><br>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <br><br>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ProfilePage",
        mounted() {
            this.load()
        },
        data() {
            var val = false;
            if (localStorage.getItem('token')) {
                val = true
            }
            return {
                role: localStorage.getItem("role"),
                sku: localStorage.getItem("sku"),
                metode: '',
                profile: '',
                nama: localStorage.getItem('nickName'),
                authenticated: val
            }
        },
        methods: {
            pesanPenginapan() {

            },
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/auth/findSku/' + this.sku)
                this.profile = response.data
                console.log(this.profile)
            },
            async update() {
                await axios.put('https://portal-desa.herokuapp.com/auth/update/' + this.sku, {
                    name: this.profile.name,
                    alamat: this.profile.alamat,
                    email: this.profile.email
                })
                    .then(
                        alert("Ubah Profile Sukses")
                    )
            }

        }
    }
</script>

<style scoped>
    .judul {
        text-align: left;
        font-family: "Arial Black";
    }

    .keterangan {
        font-family: "Times New Roman";
        font-size: 20px;
    }

    .metric-tarif {
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #DCE6EB;
        font-family: "Times New Roman";
        -webkit-box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.75);
    }

</style>