<template>
    <b-container class="mb-5">

        <b-row class="justify-content-sm-center">
            <b-col col md="auto" sm="auto">
                <p id="logo">
                    <b-icon-people-circle></b-icon-people-circle>
                </p>
            </b-col>
        </b-row>

        <b-form @submit="formSubmit" class="mt-3" >
            <b-form-row class="justify-content-sm-center">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Gambar</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <div id="app">
                        <div v-if="!image">
                            <h2>Select an image</h2>
                            <input type="file" @change="onFileChange">
                        </div>
                        <div v-else>
                            <img :src="image" width="120" height="100" />
                            <button @click="removeImage">Remove image</button>
                        </div>
                    </div>
                </b-col>
            </b-form-row>
            <br>
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
                            v-model="detail.nama"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Nama Kepala Desa</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-kepalaDesa"
                            v-model="kepalaDesa"
                            required
                            type="text"
                    ></b-form-input>
                </b-col>
            </b-form-row>
            <b-form-row class="justify-content-sm-center mt-3">
                <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                    <p>Jumlah Penduduk</p>
                </b-col>
                <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                    <p>:</p>
                </b-col>
                <b-col cols="8" col md="5" lg="4" sm="7">
                    <b-form-input
                            id="input-jumlah"
                            v-model="jumlah"
                            required
                            type="number"
                            min="0"
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
                    <b-select  required  v-model="detail.kecamatan">
                        <b-select-option selected  v-for="kecamatan in kecamatan" :key="kecamatan.sku"  v-model="kecamatan.nama">{{kecamatan.nama}}</b-select-option>
                    </b-select>
                </b-col>
            </b-form-row>

            <b-form-row class="justify-content-md-center">
                <b-col col md="4" lg="2">

                </b-col>
                <b-col col md="auto" lg="auto">

                </b-col>
                <b-col col md="auto" lg="auto" class="mt-2">
                    <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Update</button>
                </b-col>
            </b-form-row>
        </b-form>
        <p>{{detail.data}}</p>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "FormDetailDesa",
        mounted() {
            this.load()
        },
        data(){
            return {
                detail:'',
                kecamatan :[],
                image:'',
                name: '',
                kepalaDesa: '',
                username: '',
                email :'',
                sku :'',
                jumlah : 0,
                kec:'',
                base64 : ''
            }
        },
        methods : {
            async load(){
                this.sku=localStorage.getItem("sku")
                const response = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/'+this.sku)
                this.detail=response.data.data
                console.log(this.detail)
                const responses = await axios.get('https://portal-desa.herokuapp.com/kecamatan/')
                this.kecamatan = responses.data
                this.kepalaDesa=this.detail.namaKepalaDesa
                this.jumlah=this.detail.jumlahPenduduk

            },
            formSubmit(){
                axios.put('https://portal-desa.herokuapp.com/desa/update/'+this.sku, {
                    nama: this.detail.nama,
                    namaKepalaDesa: this.kepalaDesa,
                    jumlahPenduduk: this.jumlah,
                    kecamatan : this.detail.kecamatan
                })
                .then(
                    console.log(this.kepalaDesa),
                    console.log(this.jumlah)
                )
                    // eslint-disable-next-line no-unused-vars

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
                    axios.put('https://portal-desa.herokuapp.com/desa/add/picture', {
                        base64File : reader.result,
                        skuDesa : localStorage.getItem("sku")
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