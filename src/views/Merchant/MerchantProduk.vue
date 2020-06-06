<template>
    <b-container>
        <div v-if="role=='ROLE_MERCHANT'">
            <h1> Data Produk : </h1>
        </div>
        <div v-else class="judul mt-3">
            <h1>Data Produk</h1>
        </div>
        <router-link v-if="role=='ROLE_MERCHANT'"  to=""><b-btn @click="check" class="btn btn-primary">Create produk</b-btn></router-link>
        <hr>
        <b-row class="baris-produk justify-content-md-center justify-content-lg-center justify-content-sm-center">
            <b-col class="metric-tarif p-4 m-3 mr-5" v-for="produk in produk.slice(batasbawah, batasatas)" :key="produk.sku" cols="10" col lg="3" sm="8" md="4">
                <router-link :to="'/detailProduk/'+produk.sku">
                    <b-img
                            rounded=""
                            :src="'https://portal-desa.herokuapp.com'+produk.gambar"
                            fluid
                            class="gambar-produk"></b-img>
                </router-link>
                <hr>
                <h5>Nama: {{ produk.nama }}</h5>
                <h5>Harga: Rp. {{ produk.harga | numFormat }}</h5>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center justify-content-lg-center justify-content-sm-center mt-2 mb-3" style="margin-left: -45px">
            <b-col cols="auto" col lg="auto" sm="auto" md="auto">
                <b-button @click="first" size="sm" class="mr-1" variant="primary">First</b-button>
                <b-button @click="kurang" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-backward></b-icon-skip-backward> </b-button>
                <b-button @click="plus" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-forward></b-icon-skip-forward></b-button>
                <b-button @click="last" size="sm" class="mr-1" variant="primary">Last</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'

    export default {
        devServer: {
            proxy: {
                '^/api/': {
                    target: 'http://localhost:9000/produk/',
                    changeOrigin: true
                }
            }
        },
        data() {
            return {
                produk: [],
                detail:'',
                role:'',
                test: 1,
                batasbawah: 0,
                batasatas: 6,
            }
        },
        async mounted() {
            this.load()
        },
        methods: {
            async load() {
                if(localStorage.getItem('token')){
                    this.role=localStorage.getItem("role")
                }else{
                    alert("Silahkan Login Terlebih Dahulu")
                    this.$router.push({name: 'Login'})
                }

                    const response = await axios.get('https://portal-desa.herokuapp.com/produk/skuDesa/'+localStorage.getItem("sku"))
                    this.produk = response.data

                const responses = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/'+localStorage.getItem("sku"))
                this.detail=responses.data
                console.log(responses.data)
            },
            check(){
                if(this.detail.data.namaKepalaDesa){
                    window.location.href="/createProduk"
                    this.$router.push({name: 'createProduk'})
                }else{
                    alert("anda harus mengisi detail data desa terlebih dahulu")
                    this.$router.push({path: '/updateDesa/'+localStorage.getItem('sku')})
                    window.location.href="/updateDesa/"+localStorage.getItem('sku')
                }
            },
            kurang(){
                console.log(this.test);
                if(this.test>1) {
                    this.test -= 1;
                }
                this.batasatas=(this.test)*6
                this.batasbawah=this.batasatas-6
            },
            plus(){
                var test=this.test;
                console.log(test)
                if(this.test<Math.ceil(this.produk.length/6)){
                    this.test+=1;
                }
                this.batasatas=(this.test)*6
                this.batasbawah=this.batasatas-6
            },
            first(){
                this.test=1;
                this.batasatas=(1)*6
                this.batasbawah=this.batasatas-6
            },
            last(){
                var test =(Math.ceil(this.produk.length/6))
                this.test=test;
                this.batasatas=(test)*6
                this.batasbawah=this.batasatas-6
            },
        }
    }
</script>

<style scoped>
    .judul{
        text-align: left;
        font-family: "Arial Black";
    }

    .metric-tarif{
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #DCE6EB;
        font-family:  "Times New Roman";
        -webkit-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
        box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.75);
    }

    .gambar-produk{
        width: 100%;
        height: 170px;
    }

</style>