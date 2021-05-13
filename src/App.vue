<template>
    <v-app id="app">

        <v-app-bar
            :fixed="stickyAppBar"
            color="blue lighter-4"
            dense
            dark
        >

            <v-app-bar-nav-icon
                @click.stop="collapseDrawer = !collapseDrawer"
                />
            <v-spacer />

            <v-toolbar-title>Sample Dashboard</v-toolbar-title>

            <v-spacer />

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu left offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <!-- Login or Avatar -->
                <v-list>
                    <template v-if="loggedin">
                        <v-list-item class="px-2">
                            <v-list-item-avatar>
                                <v-img :src="userData.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{userData.username}}</v-list-item-title>
                                <v-list-item-subtitle>{{userData.account}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else>
                        <v-list-item @click="appBarMenuControl('login')">
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-account-alert-outline
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Login</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>

                <v-divider />

                <v-list dense>
                    <v-list-item
                        v-for="(item, i) in getAppBarMenuItems()"
                        :key="i"
                        @click="appBarMenuControl(item.action)"
                        >

                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-title v-text="item.title">
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

        <v-navigation-drawer
            v-model="collapseDrawer"
            temporary
            >

            <v-list>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-dog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Main Menu</v-list-item-title>
                        <template v-if="!loggedin">
                            <v-list-item-subtitle>
                                Login required
                            </v-list-item-subtitle>
                        </template>
                    </v-list-item-content>
                    <v-btn
                        icon
                        @click.stop="collapseDrawer = !collapseDrawer"
                        >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                        v-for="item in getDrawerMenuItems()"
                        :key="item.title"
                        link
                        >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>

        <v-main>
            <router-view></router-view>
            <v-sheet style="height: 1000px">
                <v-card>
                    <div>loggedin: {{loggedin}}</div>
                    <div>stickyAppBar: {{stickyAppBar}}</div>
                    <div>collapseDrawer: {{collapseDrawer}}</div>
                </v-card>
            </v-sheet>
        </v-main>

    </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'

const appBarMenuItems = [
    { title: 'My Account', icon: 'mdi-account-outline', action: 'account-setting', requiredLogin: true },
    { title: 'Sticky Bar', icon: 'mdi-checkbox-blank-outline', action: 'collapse-app-bar', requiredLogin: false },
    { title: 'Option 1', requiredLogin: false },
    { title: 'Option 2', requiredLogin: true },
    { title: 'Settings', icon: 'mdi-cog-outline', action: 'setting', requiredLogin: false },
    { title: 'Logout', icon: 'mdi-logout', action: 'logout', requiredLogin: true }
]

const drawerMenuItems = [
    { title: 'Dashboard', icon: 'mdi-home-city', requiredLogin: true },
    { title: 'Charts', icon: 'mdi-chart-box-outline', requiredLogin: true },
    { title: 'Database', icon: 'mdi-database-outline', requiredLogin: true },
]

export default {
    name: 'App',
    components: {
    },
    data() {
        return {
            loggedin: false,
            stickyAppBar: false,
            collapseDrawer: false,
            userData: {},
        }
    },
    computed: {
    },
    mounted() { },
    created() { },
    methods: {
        appBarMenuControl(action) {
            if (action == 'collapse-app-bar') {
                this.stickyAppBar = !this.stickyAppBar;
                appBarMenuItems.filter((i)=>i.title=='Sticky Bar')[0].icon = this.stickyAppBar === true ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'
            } else if (action == 'login') {
                this.$router.push('/login')
                //this.loggedin = true
                //this.userData = sampleUserData;
            } else if (action == 'logout') {
                //this.loggedin = false
                //this.userData = {}
                this.$store.dispatch('logout')
            } else {
                console.log(action)
            }
        },
        getAppBarMenuItems() {
            return appBarMenuItems.filter((i)=>(
                i.requiredLogin===false||this.loggedin===true
            ))
        },
        getDrawerMenuItems() {
            return drawerMenuItems.filter((i)=>(
                i.requiredLogin===false||this.loggedin===true
            ))
        },
    },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
