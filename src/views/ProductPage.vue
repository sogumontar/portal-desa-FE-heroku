<template>
    <b-container>
        <div v-if="role=='ROLE_MERCHANT'">
            <h1> Data Produk : </h1>
        </div>
        <div v-else class="judul mt-3">
            <h1>Data Produk</h1>

        </div>
        <router-link v-if="role=='ROLE_MERCHANT'" to="" class="container">
            <b-btn @click="check" class="btn btn-primary">Tambah Produk</b-btn>
        </router-link>
        <hr>
        <b-row class="mt-4 justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-xs-center">
            <b-col cols="10" col lg="10" md="10" sm="10">
                <b-navbar class="nav-search bg-color-primary text-white">
                    <b-navbar-nav class="d-flex align-center w-100">
                        <b-nav-item class="icon p-0 m-0">
                            <p class="font-size-24 m-0 text-white">
                                <b-icon icon="arrow-left-short" class="mr-3"/>
                            </p>
                        </b-nav-item>
                        <b-nav-form class="w-100 pr-3">
                            <b-input-group class="w-100 border-circle">
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input
                                        class="form-control"
                                        id="input-search"
                                        v-model="searchQuery"
                                        type="search"
                                        required
                                        placeholder="Cari Produk"
                                        style="width: 550px;"
                                ></b-form-input>
                            </b-input-group>

                        </b-nav-form>
                    </b-navbar-nav>
                </b-navbar>
            </b-col>
            <b-col cols="1" col lg="1" md="1" sm="1">
                <br>
                <img src="../assets/pict/filter.png" width="30px" style="margin-left: 90px;" alt="">
                <p style="margin-left: 90px;">Filter</p>
            </b-col>
            <b-col cols="1" col lg="1" md="1" sm="1">
                <b-nav-item-dropdown   class="">
                    <b-dropdown-item>
                        <a @click="filterNama"> Nama</a>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <a @click="filterHarga"> Harga</a>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-col>
        </b-row>
        <hr>
        <hr>
        <b-row class="baris-produk justify-content-md-center justify-content-lg-center justify-content-sm-center">
            <b-col class="metric-tarif p-4 m-3 mr-5" v-for="produk in filteredResources.slice(batasbawah, batasatas)"
                   :key="produk.sku" cols="10" col lg="3" sm="8" md="4">
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
                <h5 v-if="produk.jumlahPembelian != null">Total Pembelian: {{ produk.jumlahPembelian  }}</h5>
                <h5 v-else>Total Pembelian: 0</h5>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center justify-content-lg-center justify-content-sm-center mt-2 mb-3"
               style="margin-left: -45px">
            <b-col cols="auto" col lg="auto" sm="auto" md="auto">
                <b-button @click="first" size="sm" class="mr-1" variant="primary">First</b-button>
                <b-button @click="kurang" size="sm" class="mr-1" variant="outline-primary">
                    <b-icon-skip-backward></b-icon-skip-backward>
                </b-button>
                <b-button @click="plus" size="sm" class="mr-1" variant="outline-primary">
                    <b-icon-skip-forward></b-icon-skip-forward>
                </b-button>
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
                detail: '',
                role: '',
                test: 1,
                batasbawah: 0,
                searchQuery: '',
                batasatas: 6,
                indikator: 0,
                indikatorHarga: 0,
            }
        },
        computed: {
            filteredResources() {
                if (this.searchQuery) {
                    return this.produk.filter((produk) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => produk.nama.toLowerCase().includes(v))
                        // return item.nama.startsWith(this.searchQuery);
                    })
                } else {
                    return this.produk;
                }
            }
        },
        async mounted() {
            this.load()
        },
        methods: {
            async load() {
                if (localStorage.getItem('token')) {
                    this.role = localStorage.getItem("role")
                }
                // else{
                //     alert("Silahkan Login Terlebih Dahulu")
                //     this.$router.push({name: 'Login'})
                // }
                // const response = await axios.get('https://portal-desa.herokuapp.com/produk/skuDesa/'+localStorage.getItem("sku"))
                // this.produk = response.data
                // const responses = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/'+localStorage.getItem("sku"))
                const response = await axios.get('https://portal-desa.herokuapp.com/produk/')
                this.produk = response.data
                const responses = await axios.get('https://portal-desa.herokuapp.com/desa/desa/skuAdmin/' + localStorage.getItem("sku"))
                this.detail = responses.data
                console.log(response.data)
            },
            async filterNama(){
                let response=null;
                if(this.indikator%2==0) {
                    response = await axios.get('https://portal-desa.herokuapp.com/produk/ASC/')
                }else{
                    response = await axios.get('https://portal-desa.herokuapp.com/produk/DESC/')
                }
                this.indikator++;
                this.produk = response.data
            },
            async filterHarga(){
                let response=null;
                if(this.indikator%2==0) {
                    response = await axios.get('https://portal-desa.herokuapp.com/produk/harga/ASC/')
                }else{
                    response = await axios.get('https://portal-desa.herokuapp.com/produk/harga/DESC/')
                }
                this.indikator++;
                this.produk = response.data
            },
            check() {
                if (this.detail.data.namaKepalaDesa) {
                    window.location.href = "/createProduk"
                    this.$router.push({name: 'createProduk'})
                } else {
                    alert("anda harus mengisi detail data desa terlebih dahulu")
                    this.$router.push({path: '/updateDesa/'+localStorage.getItem('sku')})
                    window.location.href="/updateDesa/"+localStorage.getItem('sku')
                }
            },
            kurang() {
                console.log(this.test);
                if (this.test > 1) {
                    this.test -= 1;
                }
                this.batasatas = (this.test) * 6
                this.batasbawah = this.batasatas - 6
            },
            plus() {
                var test = this.test;
                console.log(test)
                if (this.test < Math.ceil(this.produk.length / 6)) {
                    this.test += 1;
                }
                this.batasatas = (this.test) * 6
                this.batasbawah = this.batasatas - 6
            },
            first() {
                this.test = 1;
                this.batasatas = (1) * 6
                this.batasbawah = this.batasatas - 6
            },
            last() {
                var test = (Math.ceil(this.produk.length / 6))
                this.test = test;
                this.batasatas = (test) * 6
                this.batasbawah = this.batasatas - 6
            },
        }
    }
</script>

<style scoped>
    .judul {
        text-align: left;
        font-family: "Arial Black";
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
    .gambar-produk {
        width: 100%;
        height: 170px;
    }
</style>
