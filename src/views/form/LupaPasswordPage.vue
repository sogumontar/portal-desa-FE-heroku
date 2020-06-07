<template>
    <b-container>
        <h2 align="center" style="align-items: center" class="judul mt-3">Lupa Password</h2>
        <hr>
        <b-row>
            <b-col col lg="1">

            </b-col>

            <b-col col lg="9">
                <br><br>
                <b-row class="mb-3 metric-tarif">

                    <b-col class="keterangan p-4">

                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Username</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        required
                                        v-model="passwordL"
                                        type="text"
                                ></b-form-input>
                                <br>
                                <h6><b>Kode verifikasi akan dikirim ke email yang terdaftar pada akun ini.</b></h6>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="9">

                            </b-col>
                            <b-col col lg="auto">
                            </b-col>
                            <b-col col lg="6">
                            </b-col>
                        </b-row>

                        <b-form-row class="justify-content-md-center">
                            <b-col col md="4" lg="8">
                            </b-col>
                            <b-col col md="5" lg="1">
                            </b-col>
                            <b-col col md="auto" lg="1" class="mt-3">
                                <button type="submit" id="tombol-daftar" @click="update"
                                        class="pl-3 pr-3 btn btn-primary">Kirim
                                </button>
                            </b-col>
                        </b-form-row>
                        <b-form-row class="justify-content-md-center">
                            <b-col col md="4" lg="8">
                            </b-col>
                            <b-col col md="5" lg="1">
                            </b-col>
                            <b-col col md="auto" lg="3" class="mt-3">

                                <router-link to="/verifikasiCode">Verifikasi kode</router-link>
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
    // eslint-disable-next-line no-unused-vars
    import axios from "axios";

    export default {
        name: "LupaPasswordPage",
        data() {
            return {
                passwordL: '',
            }
        },
        methods: {
            async update() {
                if (this.passwordL === "") {
                    alert("Field Username Harus Di Isi")
                } else {
                    const response = await axios.get('https://portal-desa.herokuapp.com/auth/forgetPassword/' + this.passwordL)
                    console.log(response.data.status)
                    if (response.data.status === 400) {
                        alert("Username tidak terdaftar")
                    } else {
                        alert("Kode verifikasi sudah dikirim ke email anda.")
                    }

                }

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
