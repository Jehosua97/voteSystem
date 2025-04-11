<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="login">
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />
              <div>
                <q-btn label="Login" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')
    let number = 0
    const router = useRouter()
    const login = () => {
      axios.post('http://localhost:3000/login', {
        username: username.value,
        password: password.value
      })
      .then(response => {
        if (response.data.success) {
          //alert('Login successful!')
          number = password.value.replace("password", "")
          console.log(number);
          router.replace({ path: '/Pricing', query: { username: number } }); // Pass username as query parameter
        } else {
          alert('Incorrect username or password!')
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
    }
    return {
      username,
      password,
      login
    }
  },
  data() {
    return {
      user: []
    };
  },
  mounted() {
    fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(data => {
        this.user = data;
        console.log(this.user);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }
})
</script>

<style>
.bg-image::before {
  /* ... other properties ... */
  opacity: 0.3;
  filter: brightness(0.4) contrast(1.3) grayscale(20%);
  background-blend-mode: multiply;
}

 


.q-card {
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9); /* Keep login card bright */
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Optional: Add some Canadian red to the login button */
.q-btn[type="submit"] {
  background-color: #D80621 !important;
}

.bg-image {
  background-image: url('/backgrounds/bg-login.jpg'); /* make sure path and name match */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
}

.bg-image::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.2); /* optional white tint */
  backdrop-filter: blur(4px); /* subtle blur */
  z-index: -1;
}
</style>