<template>
    <html>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="./assets/pict/logoP.png"/>
    <div>
        <b-navbar id="navb" toggleable="lg" type="dark">
            <b-navbar-brand href="/"><img alt="Vue logo" src="./assets/pict/logoP.png" width="70px"></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-navbar-nav class="ml-auto mt-1">
                    <b-navbar-nav class="mr-4">
                        <b-nav-item v-if="role!='ROLE_ADMIN'">
                            <router-link to="/produk">Produk</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="role!='ROLE_ADMIN'">
                            <router-link to="/desa">Desa</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="role!='ROLE_ADMIN'">
                            <router-link to="/penginapan">Penginapan</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="role=='ROLE_ADMIN'">
                            <router-link to="/admin/account">Data Akun</router-link>
                        </b-nav-item>
                        <b-nav-item v-if="role=='ROLE_ADMIN'">
                            <router-link to="/admin/desa">Data Desa</router-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <p class="h2">
                        <b-icon-people-circle></b-icon-people-circle>
                    </p>
                    <!--            <img alt="Vue logo" src="./assets/pict/profile.png" width="45px" height="45px" >-->
                    <b-nav-item-dropdown v-if="role=='ROLE_ADMIN'" right class="">
                        <b-dropdown-item>
                            <router-link to="/daftarAdmin">Daftarkan Admin Desa</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to="/admin/account">Daftar Akun</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to="/admin">Daftar Pesanan</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to="/artikelAll">Artikel Desa</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item><a v-on:click="logout" v-if="authenticated" href="/">Logout</a>
                            <router-link v-else to="/login">Login</router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown v-else-if="authenticated" right class="">
                        <b-dropdown-item>
                            <router-link to="/">Profile</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to="/">Pesanan</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item><a v-on:click="logout" v-if="authenticated" href="/">Logout</a>
                            <router-link v-else to="/login">Login</router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown v-else right class="">
                        <b-dropdown-item><a v-on:click="logout" v-if="authenticated" href="/">Logout</a>
                            <router-link v-else to="/login">Login</router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-navbar-brand>
                        <router-link to="/"></router-link>
                    </b-navbar-brand>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <router-view/>
    </html>
</template>

<script>
    export default {
        name: 'App',
        data() {
            if (localStorage.getItem('token')) {
                return {
                    authenticated: true,
                    role: localStorage.getItem('role')
                }
            }
            return {
                authenticated: false,
                role: ''
            }
        },
        methods: {
            logout: function () {
                console.log("testing")
                localStorage.clear()
                window.location.href = "/"
            }
        }

    }
</script>

<style>
    #navb {
        background-color: #ACE7EF;
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {

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
