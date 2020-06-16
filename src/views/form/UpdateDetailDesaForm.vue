<template>
    <b-container>
        <h2 align="center" style="align-items: center" class="judul mt-3">Detail Desa</h2>
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
                                <p>Nama Desa </p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="profile.nama"
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
                                <p>Nama KepalaDesa</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="profile.namaKepalaDesa"
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
                                <p>Jumlah Penduduk</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <b-form-input
                                        id="input-harga"
                                        v-model="profile.jumlahPenduduk"
                                        required
                                        type="number"
                                        min="0"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Kecamatan</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                {{profile.kec}}
                            </b-col>
                        </b-row>
                        <br><br>
                        <b-row>
                            <b-col col lg="2">
                            </b-col>
                            <b-col col lg="3">
                                <p>Gambar</p>
                            </b-col>
                            <b-col col lg="auto">
                                <p>:</p>
                            </b-col>
                            <b-col col lg="6">
                                <div>
                                    <img :src="'https://portal-desa.herokuapp.com/desa/get/'+profile.sku+'.png'" width="120"
                                         height="100"/>
                                    <input type="file" @change="onFileChange">
                                </div>
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
                gambar: '',
                selectedFile: null,
                nama: localStorage.getItem('nickName'),
                authenticated: val
            }
        },
        methods: {
            pesanPenginapan() {

            },
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/' + this.sku)
                this.profile = response.data.data
                console.log(this.profile)
            },
            async update() {
                await axios.put('https://portal-desa.herokuapp.com/desa/update/' + this.sku, {
                    nama: this.profile.nama,
                    namaKepalaDesa: this.profile.namaKepalaDesa,
                    jumlahPenduduk: this.profile.jumlahPenduduk,
                    kecamatan: this.profile.kec
                })
                    .then((response) => {
                        console.log(response)
                        alert("Ubah Detail Desa Sukses")
                    })
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                console.log(e.target.files)
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                // eslint-disable-next-line no-unused-vars
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    console.log(e.target.result)
                    axios.put('https://portal-desa.herokuapp.com/desa/add/picture', {
                        base64File: reader.result,
                        skuDesa: this.profile.sku
                    }).then((response)=> {
                        console.log(response)
                        alert("Add gambar success")
                        // this.$router.push({name: 'daftarAdmin'})
                    })
                };
                reader.readAsDataURL(file);

            },
            removeImage: function () {
                this.image = '';
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
