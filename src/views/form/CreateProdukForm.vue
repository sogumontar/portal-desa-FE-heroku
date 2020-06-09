<template>
    <b-container class="mb-5">
        <h1>Tambah Produk</h1>
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
                            v-model="nama"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Harga</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-harga"
                            v-model="harga"
                            required
                            type="number"
                            min="0"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Deskripsi</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-textarea
                            id="input-deskripsi"
                            v-model="deskripsi"
                            required
                            rows="4"
                    ></b-textarea>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Gambar</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <div id="app">
                        <div v-if="!gambar">
                            <input type="file" @change="onFileChange">
                        </div>
                        <div v-else>
                            <img :src="gambar" width="120" height="100"/>
                            <button @click="removeImage">Remove image</button>
                        </div>
                    </div>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-md-center">
                <b-col col md="4" lg="2">

                </b-col>
                <b-col col md="2" lg="auto">

                </b-col>
                <b-col col md="auto" lg="auto" class="mt-3">
                    <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Simpan</button>
                </b-col>
            </b-form-row>
        </b-form>
    </b-container>
</template>

<script>

    import axios from "axios";

    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
                nama: '',
                harga: '',
                deskripsi: '',
                gambar: '',
                selectedFile: null,
            };
        },
        methods: {
            uploadImage(event) {
                this.selectedFile = event.target.files[0].name
            },
            async formSubmit(e) {
                console.log(this.nama)
                console.log(this.harga)
                console.log(this.deskripsi)
                e.preventDefault();
                let currentObj = this;
                axios.post('https://portal-desa.herokuapp.com/produk/add', {
                    nama: this.nama,
                    harga: this.harga,
                    deskripsi: this.deskripsi,
                    skuDesa: localStorage.getItem("sku")
                }, error => {
                    console.error(error);
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(function (response) {

                        alert("Tambah Produk Sukses"),
                            window.location.href = "/produk"
                        // this.$router.go('ProductPage')
                    })
                    .then(function () {
                        this.$router.push({name: 'ProductPage'})
                    })
                    .then(function () {
                        console.log("telah ke sini")
                    })
                    .catch(function (err) {
                        currentObj.output = err;
                    });
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
                    axios.post('https://portal-desa.herokuapp.com/produk/add/gambar', {
                        gambar: reader.result,
                        nama: localStorage.getItem('sku')
                    }).then(
                        alert("Add Desa Pict success")
                        // this.$router.push({name: 'daftarAdmin'})
                    )
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

</style>