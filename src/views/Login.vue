<template>
    <v-app>
        <v-card class="mx-auto mt-5">
            <v-card-title>
                <span class="login">Login</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Username"
                        v-model="username"
                        prepend-icon="mdi-account-circle" />
                    <v-text-field label="Password"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" />
                    <v-card-actions>
                        <v-btn class="info"
                            @click="submit"
                            >Login</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>

const sampleUserData = {
    avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
    account: 'test1225',
    username: '手州都太郎',
}

export default {
    name: 'layout-login',
    data: () => ({
        username: '',
        password: '',
        showPassword : false,
    }),
    methods:{
        submit(){
            console.log(`username:${this.username} password:${this.password}`)
            this.$store.dispatch('authorized', sampleUserData)
        }
    }
}
</script>
