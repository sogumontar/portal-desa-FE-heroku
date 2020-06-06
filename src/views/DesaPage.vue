<template>
    <b-container>
        <h1 class="judul mt-3">Halaman Desa</h1>
        <hr>
        <p>Pilih salah satu nama kecamatan untuk melihat daftar desa yang ada</p>
        <div v-if="kecamatan.length!==0">
            <b-row class="">
                <b-col cols="12" col lg="4" sm="12" md="6" class="p-4" v-for="kecamatan in kecamatan.slice(batasbawah, batasatas)" :key="kecamatan.sku">
                    <router-link  :to="'/detailKecamatan/'+kecamatan.nama"><h5>{{kecamatan.nama}}</h5></router-link>
                    <b-img rounded=""
                           :src="'https://portal-desa.herokuapp.com/kecamatan/get/'+kecamatan.nama+'.jpg'"
                           width="300px" style="height: 200px"></b-img>
                </b-col>
            </b-row>
        </div>
        <div v-else>
            <center><img  alt="Vue logo" src="../assets/gif/25.gif" width="90px"></center>
        </div>

        <b-row class="mt-4 mb-5">
            <b-col cols="2" col sm="2" lg="2" md="2"></b-col>
            <b-col cols="8" col sm="8" lg="8" md="8" align="center">
                <b-button @click="first" size="sm" class="mr-1" variant="primary">First</b-button>
                <b-button @click="kurang" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-backward></b-icon-skip-backward> </b-button>
                <b-button @click="plus" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-forward></b-icon-skip-forward></b-button>
                <b-button @click="last" size="sm" class="mr-1" variant="primary">Last</b-button>
            </b-col>
            <b-col cols="2" col sm="2" lg="2" md="2"></b-col>
        </b-row>

    </b-container>
</template>

<script>
    import axios from 'axios'
    export default {
       devServer: {
           proxy:{
               '^/api/':{
                   target:'https://portal-desa.herokuapp.com/wisata/',
                   changeOrigin: true
               }
           }
       },
        data() {
            var val=false;
            if(localStorage.getItem('token')){
                val=true
            }
            return {
                perPage: 9,
                currentPage: 1,
                batasbawah: 0,
                batasatas: 9,
                lastpage: 1,
                authenticated: val,
                kecamatan: [],
                test: 1,
                val:1
            }
        },
        async mounted() {
            this.load()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/kecamatan/')
                this.kecamatan = response.data
                this.val=(Math.ceil(this.kecamatan.length/6))
            },
            tambah (current){
                console.log(current)
                this.test=current
                this.batasatas=(current)*9
                this.batasbawah=this.batasatas-9
            },
            kurang(){
                console.log(this.test);
                if(this.test>1) {
                    this.test -= 1;
                }
                this.batasatas=(this.test)*9
                this.batasbawah=this.batasatas-9
            },
            plus(){
                var test=this.test;
                console.log(test)
                if(this.test<Math.ceil(this.kecamatan.length/9)){
                    this.test+=1;
                }
                this.batasatas=(this.test)*9
                this.batasbawah=this.batasatas-9
            },
            first(){
                this.test=1;
                this.batasatas=(1)*9
                this.batasbawah=this.batasatas-9
            },
            last(){
                var test =(Math.ceil(this.kecamatan.length/9))
                this.test=test;
                this.batasatas=(test)*9
                this.batasbawah=this.batasatas-9
            }
        },
        computed: {
            rows() {
                return this.kecamatan.length
            }

        }
    }
</script>

<style scoped>
    .judul{
        text-align: left;
        font-family: "Arial Black";
    }
</style>