<template>
  <div class='login'>
    <div class='login__window'>
      <logo />
      <input-component
        :type='"email"'
        :placeholder='"мыло"'
        v-model:model-value='email'
      />
      <input-component
        :type='"password"'
        :placeholder='"пароль"'
        v-model:model-value='password'
      />
      <button @click="sendData">Вывести данные</button>
    </div>
  </div>
</template>
<script>
import Logo from '@/components/logo.vue'
import InputComponent from '@/components/input-component.vue'
import axios from 'axios'

export default {
  components: {
    Logo, InputComponent
  },
  data() {
    return {
      password: "",
      email: ""
    }
  },
  methods: {
    async sendData() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
          email: this.email,
          password: this.password
        });

        console.log('Успех:', response.data);
        alert('Данные успешно отправлены!');
      } catch (error) {
        if (error.response) {
          console.error('Ошибка от сервера:', error.response.data);
          alert('Ошибка: ' + (error.response.data.error || 'Не удалось отправить данные!'));
        } else {
          console.error('Ошибка сети:', error.message);
          alert('Ошибка сети: ' + error.message);
        }
      }
    }
  }
}
</script>
<style lang='scss'>
.login {
  height: 100vh;
  position: relative;
  background-color: #F9FAFF;
  &__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 300px;
    background-color: #fff;
  }
}
</style>