<template>
    <div class="container">
        <br>
        <h3>Daftar Pesanan </h3>
        <hr>
        <div>
            <b-card body-class="text-center" header-tag="nav">
                <template v-slot:header>
                    <b-nav card-header tabs>
                        <b-nav-item v-bind:active="tab === 1" v-on:click="tab1">Akun Merchant</b-nav-item>
                        <b-nav-item v-bind:active="tab === 2" v-on:click="tab2">Akun Customer</b-nav-item>
                    </b-nav>
                </template>
                <div class="card">
                    <div class="row">
                        <div class="col-md-3" >
                            <h2>Nama </h2>
                        </div>
                        <div class="col-md-4" >
                            <h2>Alamat</h2>
                        </div>
                        <div class="col-md-4" >
                            <h2>Email</h2>
                        </div>
                        <div>
                            <h2>Aksi</h2>
                        </div>
                    </div>
                    <hr>
                    <br>
                    <p v-if="data.length===0 ">Tidak Ada Akun</p>
                    <b-card-text v-for="data in data" :key="data.sku">
                        <div class="row">
                            <div class="col-md-3">
                                <p align="center">{{data.name}}</p>
                            </div>
                            <div class="col-md-4" >
                                <p align="left">{{data.alamat}}</p>
                            </div>
                            <div class="col-md-4" >
                                <p align="left">{{data.email}}</p>
                            </div>
                            <div>
                                <b-btn style="margin-left: -10px" align="left" variant="danger" v-if="data.status === 1" @click="block(data.sku)">
                                    Block
                                </b-btn>&nbsp;&nbsp;&nbsp;&nbsp;
                                <b-btn style="margin-left: -10px" align="left" variant="success" v-else @click="activate(data.sku)">Activate
                                </b-btn>
                            </div>
                        </div>
                    </b-card-text>
                </div>
            </b-card>
        </div>

        <br><br><br>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "ListAccount",
        mounted() {
            this.loadData()
        },
        data() {
            return {
                fields: ['name', 'alamat', 'username', 'email'],
                fields_customer: ['name', 'alamat', 'username', 'email'],
                perPage: 5,
                currentMerchantPage: 1,
                accountMerchant: [],
                accountCustomer: [],
                data: [],
                tab: 1,
                currentCustomerPage: 1
            }
        },
        methods: {
            async loadData() {
                const response = await axios.get('https://portal-desa.herokuapp.com/adminDev/account/merchant')
                this.accountMerchant = response.data
                this.data = response.data
                const responses = await axios.get('https://portal-desa.herokuapp.com/adminDev/account/customer')
                this.accountCustomer = responses.data
                console.log(responses.data)
            },
            async tab1() {
                const response = await axios.get('https://portal-desa.herokuapp.com/adminDev/account/merchant')
                this.accountMerchant = response.data
                this.data = response.data
                this.tab = 1
            },
            async tab2() {
                const responses = await axios.get('https://portal-desa.herokuapp.com/adminDev/account/customer')
                this.accountCustomer = responses.data
                this.data = responses.data
                this.tab = 2
            },
            async block(sku){
               await axios.get('https://portal-desa.herokuapp.com/adminDev/account/suspend/'+sku)
                    .then((response) => {
                    console.log(response)
                        alert("Blocked Akun Berhasil")
                        window.location.href="/admin/account"
                })
            },
            async activate(sku){
                 await axios.get('https://portal-desa.herokuapp.com/adminDev/account/activate/'+sku)
                    .then((response) => {
                        console.log(response)
                        alert("Blocked Akun Berhasil")
                        window.location.href="/admin/account"
                    })
            }
        },
        computed: {
            rows_merchant() {
                return this.accountMerchant.length
            }
        }
    }

</script>

<style scoped>

</style>
