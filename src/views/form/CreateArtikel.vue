<template>
    <b-container class="mb-5">
        <h1 class="judul mt-3">Tambah Artikel</h1>
        <hr>
        <b-form class="mt-3">
            <b-form-row class="justify-content-sm-center">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Judul</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-nama"
                            v-model="judul"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Jenis</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <select v-model="jenis" class="form-control">
                        <option value="Artikel">Artikel</option>
                        <option value="Berita">Berita</option>
                        <option value="Pengumuman">Pengumuman</option>
                    </select>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Isi</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-textarea
                            id="input-deskripsi"
                            v-model="isi"
                            required
                            rows="7"
                    ></b-textarea>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Sumber</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>

                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-nama"
                            v-model="sumber"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Penulis</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>

                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-nama"
                            v-model="penulis"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form-row class="justify-content-md-center">
            <b-col col md="4" lg="2">

            </b-col>
            <b-col col md="2" lg="2">

            </b-col>
            <b-col col md="auto" lg="auto" class="mt-3">
                <button type="submit" id="tombol-daftar" @click="simpan" class="pl-3 pr-3 btn btn-primary">Simpan
                </button>
            </b-col>
        </b-form-row>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CreateArtikel",
        async mounted() {
            this.load()
        },
        data() {
            return {
                judul: '',
                jenis: '',
                isi: '',
                sumber: '',
                penulis: '',
                sku: localStorage.getItem('sku'),
                desa:''
            }
        },
        methods: {
            async load(){
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/' + this.sku)
                this.desa=response.data.data.nama
                console.log(this.desa)
            },
            async simpan() {
                console.log(this.sku)
                axios.post('https://portal-desa.herokuapp.com/artikel/add/' + this.sku, {
                    judul: this.judul,
                    jenis: this.jenis,
                    isi: this.isi,
                    sumber: this.sumber,
                    penulis: this.penulis
                }).then((value) => {
                    console.log(value)
                    alert("Tambah Artikel Sukses")
                    window.location.href = "/detailDesa/artikel/" + this.desa
                    // expected output: "Success!"
                });
            }
        }
    }
</script>

<style scoped>
    .judul {
        text-align: left;
        font-family: "Arial Black";
    }
</style>
