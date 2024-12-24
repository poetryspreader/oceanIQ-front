<template>
  <div class='auth'>
    <close />
    <div class='auth__window'>
      <raznos class='auth__logo' />
      <div class='auth__title'>
        {{ this.type === 'register' ? $t('register.title') : $t('login.title') }}
      </div>
      <ul v-if="errors.length" class="auth__validation-list">
        <li
          v-for="(error, index) in errors"
          :key="index"
          class="auth__validation-list--item"
        >
          {{ error }}
        </li>
      </ul>
      <input-component
        class='auth__input'
        :label='"register.email"'
        :type='"email"'
        :has-error='isEmailInvalid'
        v-model:model-value='email'
      />
      <input-component
        v-if='this.type === "register"'
        class='auth__input password'
        :label='"register.password.label"'
        :type='"password"'
        :placeholder='"register.password.placeholder"'
        :has-error='isPasswordInvalid'
        v-model:model-value='password'
        @input='validatePassword'
      />
      <input-component
        v-else
        class='auth__input password'
        :label='"register.password.label"'
        :type='"password"'
        v-model:model-value='password'
      />
      <ul v-if='this.type === "register"' class="auth__validation-list">
        <li
          v-for="(condition, index) in passwordValidationRules"
          :key="index"
          :class="{'valid': condition.valid, 'invalid': !condition.valid}"
        >
          {{ $t(`${condition.message}`) }}
        </li>
      </ul>
      <button
        class='auth__btn'
        @click="validateForm"
      >
        {{ $t('register.btn') }}
      </button>
      <div class='auth__agreement'>
        {{ $t('register.agreement') }}
      </div>
      <div class='auth__redirect'>
        {{ this.type === 'register' ? $t('register.redirect.body') : $t('login.redirect.body') }}
        <router-link v-if="this.type === 'register'" to="/login">
          {{ $t('register.redirect.link') }}
        </router-link>
        <router-link v-else to="/register">
          {{ $t('login.redirect.link') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from '@/components/logo.vue'
import InputComponent from '@/components/input-component.vue'
import axios from 'axios'
import Close from '@/components/buttons/close.vue'
import Raznos from '@/components/icons/raznos.vue'

export default {
  components: {
    Logo, InputComponent, Close, Raznos
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
  props: {
    type: {
      type: String,
      required: true
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
        this.registerUser();
      }
    },
    async registerUser() {
      try {
        await axios.post('http://127.0.0.1:8000/register', {
          email: this.email,
          password: this.password
        });
        window.location.href = "/";
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
.auth {
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
  &__logo {
    margin: 0 auto;
    scale: 1.5;
  }
  &__title {
    margin: 10px 0 0 0;
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
    &.password input{
      
    }
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
    border: none;
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