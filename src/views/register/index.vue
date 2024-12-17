<template>
  <div class='register'>
    <div class='register__window'>
      <logo />
      <div class='register__title'>
        {{ $t('register.title') }}
      </div>
      <ul v-if="errors.length" class="register__validation-list">
        <li
          v-for="(error, index) in errors"
          :key="index"
          class="register__validation-list--item"
        >
          {{ error }}
        </li>
      </ul>
      <input-component
        class='register__input'
        :label='"register.email"'
        :type='"email"'
        :has-error='isEmailInvalid'
        v-model:model-value='email'
      />
      <input-component
        class='register__input'
        :label='"register.password.label"'
        :type='"password"'
        :placeholder='"register.password.placeholder"'
        :has-error='isPasswordInvalid'
        v-model:model-value='password'
        @input='validatePassword'
      />
      <ul class="register__validation-list">
        <li
          v-for="(condition, index) in passwordValidationRules"
          :key="index"
          :class="{'valid': condition.valid, 'invalid': !condition.valid}"
        >
          {{ $t(`${condition.message}`) }}
        </li>
      </ul>
      <button
        class='register__btn'
        @click="validateForm"
      >
        {{ $t('register.btn') }}
      </button>
      <div class='register__agreement'>
        {{ $t('register.agreement') }}
      </div>
      <div class='register__redirect'>
        {{ $t('register.redirect') }}
      </div>
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
      email: "",
      errors: [],
      isEmailInvalid: false,
      isPasswordInvalid: false,
      passwordValidationRules: [
        { regex: /.{6,}/, message: "register.errors.passwordValidationRules.shortPass", valid: false },
        { regex: /[A-Z]/, message: "register.errors.passwordValidationRules.upperPass", valid: false },
        { regex: /[a-z]/, message: "register.errors.passwordValidationRules.lowerPass", valid: false },
        { regex: /[0-9]/, message: "register.errors.passwordValidationRules.digitPass", valid: false },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, message: "register.errors.passwordValidationRules.specPass", valid: false },
      ],
    }
  },
  methods: {
    validatePassword() {
      this.passwordValidationRules = this.passwordValidationRules.map(rule => {
        return { ...rule, valid: rule.regex.test(this.password) };
      });
    },
    validateForm() {
      this.errors = [];
      this.isEmailInvalid = false;
      this.isPasswordInvalid = false;

      const fields = [
        {
          value: this.email,
          errorKey: ["register.errors.emailRequired", "register.errors.emailInvalid"],
          invalidState: 'isEmailInvalid'
        },
        {
          value: this.password,
          errorKey: ["register.errors.passwordRequired", "register.errors.passwordShort"],
          invalidState: 'isPasswordInvalid'
        },
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      fields.forEach(field => {
        if (!field.value) {
          this.errors.push(this.$t(field.errorKey[0]));
          this[field.invalidState] = true;
        }

        if (field.value === this.email && !this[field.invalidState]) {
          if (!emailRegex.test(field.value)) {
            this.errors.push(this.$t(field.errorKey[1]));
            this[field.invalidState] = true;
          }
        }
      });

      this.validatePassword();

      if (this.errors.length === 0 && this.passwordValidationRules.every(rule => rule.valid)) {
        this.sendData();
      }
    },
    async sendData() {
      try {
        await axios.post('http://127.0.0.1:8000/api/register', {
          email: this.email,
          password: this.password
        });
      } catch (error) {
        if (error.response) {
          console.error('Ошибка от сервера:', error.response.data);
        } else {
          console.error('Ошибка сети:', error.message);
        }
      }
    }
  }
}
</script>
<style lang='scss'>
.register {
  height: 100vh;
  position: relative;
  background-color: #F9FAFF;
  &__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    max-width: 400px;
    border-radius: 7px;

    box-shadow: 0 12px 40px rgba(0, 0, 0, .12);
  }
  .logo {
    margin: 0 auto;
  }
  &__title {
    margin: 50px 0 0 0;
    font-family: var(--main-font-mona-sans);
    font-weight: bold;
    font-size: 25px;
  }
  &__validation-list {
    margin: 20px 0 0 15px;
  }
  &__validation-list--item {
    color: #f55;
  }
  &__input {
    margin: 30px 0 0 0;
  }
  &__btn {
    cursor: pointer;
    margin: 60px 0 0 0;
    padding: 10px 0;
    width: 100%;
    max-width: 320px;
    background-color: #000000;
    color: #fff;
    border-radius: 30px;
    font-family: var(--main-font-mona-sans);
    font-weight: bold;
    font-size: 15px;
    transition: all 0.2s;
    &:hover {
      scale: 1.05;
    }
  }
  &__agreement {
    margin: 20px 0 0 0;
    font-size: 10px;
  }

  &__redirect {
    margin: 40px 0 0 0;
    font-size: 14px;
    text-align: center;
  }
}
.valid {
  color: #28a745;
}
</style>