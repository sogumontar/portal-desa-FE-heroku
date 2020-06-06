<template>
    <b-container class="mt-4">
        <b-row>
            <b-col>
                <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
            </b-col>
            <b-col>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p id="judul">Selamat datang di Aplikasi Portal Desa.</p>
                <p>Aplikasi dari Kabupaten Toba yang menyediakan informasi setiap
                    desa yang terdapat di Kabupaten Toba</p>
            </b-col>
        </b-row>
        <hr>
        <div v-if="kecamatan.length!=0">
            <b-row class="">
                    <b-col cols="12" col lg="4" sm="12" md="6" class="p-4" v-for="item in filteredResources.slice(batasbawah, batasatas)" :key="item.sku">
                        <router-link  :to="'/detailKecamatan/'+item.nama"><h5>{{item.nama}}</h5></router-link>
                        <b-img rounded=""
                               :src="'https://portal-desa.herokuapp.com/kecamatan/get/'+item.nama+'.jpg'"
                               width="300px" style="height: 200px"></b-img>
                    </b-col>
            </b-row>
        </div>
        <div v-else>
            <center><img  alt="Vue logo" src="../assets/gif/25.gif" width="90px"></center>
        </div>
        <br><br>
        <b-row>
            <b-col cols="2" col sm="2" lg="2" md="2"></b-col>
            <b-col cols="8" col sm="8" lg="8" md="8" align="center">
                <b-button @click="first" size="sm" class="mr-1" variant="primary">First</b-button>
                <b-button @click="kurang" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-backward></b-icon-skip-backward> </b-button>
                <b-button @click="plus" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-forward></b-icon-skip-forward></b-button>
                <b-button @click="last" size="sm" class="mr-1" variant="primary">Last</b-button>
<!--                <a @click="first()"> first </a>-->
<!--                <a @click="kurang()"> previous </a>-->
<!--                <div v-for="test in val" :key ="test">-->
<!--                    <a @click="tambah(test)">{{test}}</a>-->
<!--                </div>-->
<!--                <a @click="plus()"> next </a>-->
<!--                <a @click="last()"> last </a></b-col>-->
            </b-col>
            <b-col cols="2" col sm="2" lg="2" md="2"></b-col>
        </b-row>
        <div>

<!--            <b-pagination-->
<!--                    v-model="currentPage"-->
<!--                    :total-rows="rows"-->
<!--                    :per-page="perPage"-->
<!--                    @change="tambah(currentPage)"-->
<!--                    align="center"-->
<!--            ></b-pagination>-->
        </div>

        <hr>
        <p id="judul-desa-populer" class="p-2">Produk Populer</p>
        <b-row class="p-2 pb-4">
            <b-col cols="12" col lg="6" sm="12" md="6">
                <b-img rounded=""
                       width="200px"
                       height="500px"
                       align="center"
                       :src="'https://portal-desa.herokuapp.com'+popular.gambar"
                       fluid></b-img>
            </b-col>
            <b-col>
                <table id="table">
                    <tr>
                        <td>Nama Produk</td>
                        <td>:</td>
                        <td>{{popular.nama}}</td>
                    </tr>
                    <tr>
                        <td>Harga</td>
                        <td>:</td>
                        <td>{{popular.harga}}</td>
                    </tr>
                    <tr>
                        <td>Jumlah Pembelian</td>
                        <td>:</td>
                        <td>{{popular.jumlahPembelian}}</td>
                    </tr>

                </table>
            </b-col>
        </b-row>
        <b-row class="p-4">
            <p><b>Deskripsi</b>:{{popular.deskripsi}}</p>
        </b-row>
        <br><br><br>
    </b-container>
</template>

<script>
    import axios from 'axios'

    export default {
        devServer: {
            // proxy: {
            //     '^/api/': {
            //         target: 'http://localhost:9000/kecamatan/',
            //         changeOrigin: true
            //     }
            // }
        },
        data() {
            var val=false;
            if(localStorage.getItem('token')){
                val=true
            }
            return {
                perPage: 6,
                currentPage: 1,
                batasbawah: 0,
                batasatas: 6,
                lastpage: 1,
                authenticated: val,
                kecamatan: [],
                test: 1,
                val:1,
                popular :[],
                searchQuery:'',
            }
        },
        async mounted() {
            this.load()
            this.loadPopular()
        },
        methods: {
            async load() {
                const response = await axios.get('https://portal-desa.herokuapp.com/kecamatan/')
                this.kecamatan = response.data
                this.val=(Math.ceil(this.kecamatan.length/6))
            },
            async loadPopular() {
                const response = await axios.get('https://portal-desa.herokuapp.com/produk/popular/')
                this.popular = response.data
                console.log(this.popular)
            },
            tambah (current){
                console.log(current)
                this.test=current
                    this.batasatas=(current)*6
                    this.batasbawah=this.batasatas-6
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
                if(this.test<Math.ceil(this.kecamatan.length/6)){
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
                var test =(Math.ceil(this.kecamatan.length/6))
                this.test=test;
                this.batasatas=(test)*6
                this.batasbawah=this.batasatas-6
            }
        },
        computed: {
            filteredResources (){
                if(this.searchQuery){
                    return this.kecamatan.filter((item)=>{
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.nama.toLowerCase().includes(v))
                        // return item.nama.startsWith(this.searchQuery);
                    })
                }else{
                    return this.kecamatan;
                }
            }
        }
    }

</script>

<style scoped>

    td {
        font-size: 1.3em;
        padding-right: 10px;
    }

    @media only screen and (max-width: 600px) {
        #judul {
            font-size: 1.5em;
            font-weight: bolder
        }

        #judul-desa-populer {
            font-size: 1.2em;
            font-weight: bold;
        }

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        #judul {
            font-size: 1.5em;
            font-weight: bolder
        }

        #judul-desa-populer {
            font-size: 1.2em;
            font-weight: bold;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        #judul {
            font-size: 1.9em;
            font-weight: bolder
        }

        #judul-desa-populer {
            font-size: 1.5em;
            font-weight: bold;
        }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        #judul {
            font-size: 2em;
            font-weight: bolder
        }

        #judul-desa-populer {
            font-size: 1.7em;
            font-weight: bold;
        }
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        #judul {
            font-size: 2.4em;
            font-weight: bolder
        }

        #judul-desa-populer {
            font-size: 1.9em;
            font-weight: bold;
        }
    }
</style>