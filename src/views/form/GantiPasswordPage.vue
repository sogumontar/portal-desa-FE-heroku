<template>
    <b-container>
        <h2 align="center" style="align-items: center" class="judul mt-3">Ganti Password</h2>
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
                                <p>Password Lama </p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        required
                                        v-model="passwordL"
                                        type="password"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Password Baru</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="passwordB"
                                        required
                                        type="password"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Ulangi Password Baru</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="rePassword"
                                        required
                                        type="password"
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
    // eslint-disable-next-line no-unused-vars
    import axios from "axios";

    export default {
        name: "GantiPasswordPage",
        data() {
            return {
                passwordL: '',
                passwordB: '',
                rePassword: '',
                sku: localStorage.getItem('sku')
            }
        },
        methods: {
            async update() {
                if (this.passwordB === "" || this.passwordL === "" || this.rePassword === "") {
                    alert("Semua Field Harus Di Isi")
                } else {
                    if (this.passwordB != this.rePassword) {
                        alert("Password Tidak Sama")
                    } else {
                        const response = await axios.put('https://portal-desa.herokuapp.com/auth/updatePassword/' + this.sku, {
                            currentPassword: this.passwordL,
                            newPassword: this.passwordB
                        })
                        console.log(response.data.status)
                        if(response.data.status === 400){
                            alert("Password Lama Anda Salah")
                        }else{
                            alert("Ganti Password Sukses")
                            window.location.href="/profile"
                        }
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