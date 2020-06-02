<template>
    <div class="container">
        <br>
        <h3>Daftar Pesanan Anda, {{namaLogin}}</h3>
        <hr>
        <div>
            <b-card body-class="text-center" header-tag="nav">
                <template v-slot:header>
                    <b-nav card-header tabs>
                        <b-nav-item v-bind:active="tab === 1" v-on:click="tab1">Keranjang</b-nav-item>
                        <b-nav-item v-bind:active="tab === 2" v-on:click="tab2">Belum Bayar</b-nav-item>
                        <b-nav-item v-bind:active="tab === 3" v-on:click="tab3">Pesanan Selesai</b-nav-item>
                    </b-nav>
                </template>
                <div>
                    <p v-if="data.length===0 && tab==1">Keranjang Anda Kosong</p>
                    <p v-if="data.length===0 && tab==2">Tidak Ada Pesanan</p>
                    <b-card-text v-for="data in data" :key="data.sku">
                        <p>Nama : {{data[5]}}</p>
                        <p>Alamat Pengiriman : {{data[2]}}</p>
                        <p>Harga Pesanan : {{data[3]}}</p>
                        <p>Metode Pembayaran : {{data[4]}}</p>
                        <img src="../../assets/pict/logo.png" alt="">
                        <b-btn variant="primary" v-if="tab === 2" @click="show(data[8])">Bayar</b-btn>
                    </b-card-text>
                </div>
            </b-card>
        </div>
        <modal name="hello-world">
            <b-form @submit="formSubmit" class="mt-3" >
                <b-form-row class="justify-content-sm-center mt-3">
                    <b-col cols="3" col md="2" sm="2" lg="1" class="mt-2">
                        <p>Resi Pembayaran</p>
                    </b-col>
                    <b-col cols="auto" col md="auto" lg="auto" sm="auto" class="mt-2">
                        <p>:</p>
                    </b-col>
                    <b-col cols="8" col md="5" lg="4" sm="7">
                        <div id="app">
                            <div v-if="!image">
                                <input type="file" @change="onFileChange">
                            </div>
                            <div v-else>
                                <img :src="image" width="120" height="100" />
                            </div>
                        </div>
                    </b-col>
                </b-form-row>
                <b-form-row class="justify-content-md-center">
                    <b-col col md="4" lg="2">

                    </b-col>
                    <b-col col md="auto" lg="auto">

                    </b-col>
                    <b-col col md="auto" lg="auto" class="mt-2">
                        <button type="submit" id="tombol-daftar" class="pl-3 pr-3 btn btn-primary">Bayar</button>
                    </b-col>
                </b-form-row>
                <hr>
            </b-form>
        </modal>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "DaftarPesananCustomer",
        data() {
            return {
                sku: '',
                tab:1,
                data: [],
                resi : '',
                image : '',
                selected:'',
                namaLogin : ''
            }
        }, async mounted() {
            this.sku=localStorage.getItem('sku')
            this.namaLogin=localStorage.getItem("nickName")
            this.load()
            this.tab1()
        },
        methods: {
            async load() {
            },
            show (val) {
                this.selected=val
                this.$modal.show('hello-world');
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                console.log(e.target.files)
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },createImage(file) {
                // eslint-disable-next-line no-unused-vars
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    axios.put('https://portal-desa.herokuapp.com/transaksi/bayar/'+this.selected, {
                        resi : reader.result,
                        skuCustomer : localStorage.getItem("sku")
                    }).then(
                        // this.$router.push({name: 'daftarAdmin'})
                    )
                };
                reader.readAsDataURL(file);

            },
            async tab1(){
                this.tab=1
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/cart/' + this.sku)
                this.data=response.data
                console.log(this.data)
            },
            async tab2(){
                this.tab=2
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/pesan/' + this.sku)
                this.data=response.data
                console.log(this.data[0])
            },
            async tab3(){
                this.tab=3
                const response = await axios.get('https://portal-desa.herokuapp.com/transaksi/sku/bayar/' + this.sku)
                this.data=response.data
            },
            formSubmit(){

            }
        }
    }
</script>

<style scoped>

</style>