<template>
    <b-container class="mt-4">
        <h1 class="judul mt-3">Penginapan</h1>
        <hr>
        <b-row>
            <b-col>
                <router-link to="/penginapan/create" class="btn btn-primary" v-if="merchant">Tambah Penginapan</router-link>
<!--                <b-button variant="primary"><b-icon-plus></b-icon-plus> Tambah Penginapan</b-button>-->
            </b-col>
        </b-row>
        <div right v-if="penginapan.length!==0">
            <b-row class="">
                <b-col cols="12" col lg="4" sm="12" md="6" class="p-4" v-for="penginapan in penginapan.slice(batasbawah, batasatas)" :key="penginapan.sku">
                    <router-link  :to="'/penginapan/detail'">
                    <h5 style="color: black; text-decoration: none">{{penginapan.nama}}</h5>
                    <b-img rounded=""
                           :src="'https://s1.bukalapak.com/uploads/content_attachment/13aa121810e8d76210ec1fb5/w-744/penginapan_murah_di_batu_malang.jpg'"
                           fluid width="500px" height="500px"></b-img>
                    </router-link>
                </b-col>
            </b-row>
        </div>

        <div v-else>
            <center><img  alt="Vue logo" src="../assets/gif/25.gif" width="90px"></center>
        </div>

        <b-row>
            <b-col cols="2" col sm="2" lg="2" md="2"></b-col>
            <b-col cols="8" col sm="8" lg="8" md="8" align="center">
                <b-button @click="first" size="sm" class="mr-1" variant="primary">First</b-button>
                <b-button @click="kurang" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-backward></b-icon-skip-backward> </b-button>
                <b-button @click="plus" size="sm" class="mr-1" variant="outline-primary"><b-icon-skip-forward></b-icon-skip-forward></b-button>
                <b-button @click="last" size="sm" class="mr-1" variant="primary">Last</b-button>
            </b-col>
            <b-col cols="2" col sm="2" lg="2" md="2"></b-col>
        </b-row>

        <hr>

        <h2 class="mt-3 judul-populer">Penginapan Populer</h2>
        <b-row  v-for="populer in populer" v-bind:key="populer.nama">
            <b-col cols="12" col lg="5" sm="12">
                <b-img :src="populer.foto" class="gambar-populer" width="400px"></b-img>
            </b-col>
            <b-col col lg="5" cols="12" class="keterangan-populer">
                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Penginapan</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ populer.nama }}</h5>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="3" col lg="4">
                        <h5>Lokasi</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>:</h5>
                    </b-col>
                    <b-col cols="auto" col lg="auto">
                        <h5>{{ populer.alamat }}</h5>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row v-for="populer in populer" v-bind:key="populer.nama" class="mt-3">
            <b-col col lg="9">
                <p style="text-align: justify">{{ populer.deskripsi }}</p>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
    export default {
        name: "JpenginapanPage",
        data(){
            var val = false;
            var check = false;
            if(localStorage.getItem('token')){
                val=true
                if(localStorage.getItem('role')==='ROLE_MERCHANT'){
                    check = true;
                }
            }
            return{
                penginapan: [
                    {'sku' : '1', 'nama' : 'penginapan 1'},
                    {'sku' : '2', 'nama' : 'penginapan 2'},
                    {'sku' : '3', 'nama' : 'penginapan 3'},
                    {'sku' : '4', 'nama' : 'penginapan 4'},
                    {'sku' : '5', 'nama' : 'penginapan 5'},
                    {'sku' : '6', 'nama' : 'penginapan 6'},
                    {'sku' : '7', 'nama' : 'penginapan 7'},
                    {'sku' : '8', 'nama' : 'penginapan 8'},
                    {'sku' : '9', 'nama' : 'penginapan 9'},
                    {'sku' : '10', 'nama' : 'penginapan 10'},
                    {'sku' : '11', 'nama' : 'penginapan 11'},
                    {'sku' : '12', 'nama' : 'penginapan 12'},
                    {'sku' : '13', 'nama' : 'penginapan 13'},
                    {'sku' : '14', 'nama' : 'penginapan 14'},
                    {'sku' : '15', 'nama' : 'penginapan 15'},
                    {'sku' : '16', 'nama' : 'penginapan 16'},
                ],
                populer : [
                    {
                        'nama' : 'Penginapan 1',
                        'alamat' : 'Balige, Toba, Sumatera Utara',
                        'foto' : 'https://s1.bukalapak.com/uploads/content_attachment/13aa121810e8d76210ec1fb5/w-744/penginapan_murah_di_batu_malang.jpg',
                        'deskripsi' : 'Penginapan ini sangat bagus, pemandangan yang ada disini sangat indah, udaranya juga sangat segar karena banyak' +
                            'pepohonan yang lebat. Alam disini masih alami dan belom ada dirusak manusia. Lorem ipsum dolor sit amet, consectetur adipiscing ' +
                            'elit. Phasellus commodo accumsan velit sed fermentum. Maecenas vehicula tellus sed orci fringilla congue. Morbi eu pretium neque. ' +
                            'Proin feugiat nibh orci, eu convallis velit ultrices non. Pellentesque tempus consectetur porttitor. Vivamus consequat varius ' +
                            'ex a pellentesque. Aenean pulvinar orci a mauris consectetur euismod. Ut semper, lectus eget feugiat porta, turpis dui consectetur ' +
                            'orci, eu porttitor felis libero eu arcu. Suspendisse potenti. Nullam imperdiet orci ac mauris lobortis viverra. In libero est, ' +
                            'aliquam at elementum ultricies, mollis ut sapien. Fusce varius, orci sit amet sollicitudin luctus, tortor diam tincidunt nisl, ' +
                            'nec sodales nulla purus vel mauris. Nulla eu nisl et turpis ultricies placerat. Aliquam eget augue eu enim lobortis vehicula. ' +
                            'Quisque a blandit diam. Sed eu vehicula augue, id tincidunt augue.'
                    }
                ],
                authenticated: val,
                batasbawah: 0,
                batasatas: 6,
                test: 1,
                merchant: check,
            }
        },
        methods: {
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
                if(this.test<Math.ceil(this.penginapan.length/6)){
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
                var test =(Math.ceil(this.penginapan.length/6))
                this.test=test;
                this.batasatas=(test)*6
                this.batasbawah=this.batasatas-6
            }
        }
    }
</script>

<style scoped>
    .judul{
        text-align: left;
        font-family: "Arial Black";
    }
    .judul-populer{
        text-align: left;
        font-family: "Arial Black";
    }

    @media only screen and (max-width: 600px) {
        .gambar-populer{
            width: 400px;
        }
        .keterangan-populer{
            margin-top: 20px;
        }

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {

    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {

    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {

    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {

    }

</style>