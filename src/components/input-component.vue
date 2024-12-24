<template>
  <div class='input-item'>
    <div class='input-item__label'>
      {{ $t(`${this.label}`) }}
    </div>
    <div class='input-item__wrapper'>
      <input
        class="input-item__field"
        :class="{ 'input-item__field--error': hasError }"
        :type="visible ? 'text' : inputType"
        :value="modelValue"
        :placeholder="placeholder ? $t(`${placeholder}`) : placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span
        v-if='inputType === "password"'
        class="input-item__icon closed"
        ref="toggleIcon"
        @click="toggleVisibility"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  name: "InputComponent",
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    hasError: Boolean,
  },
  computed: {
    inputType() {
      return this.type;
    },
  },
  methods: {
    toggleVisibility() {
      const toggleIcon = this.$refs.toggleIcon;

      if (this.visible) {
        toggleIcon.classList.remove("open");
        toggleIcon.classList.add("closed");
      } else {
        toggleIcon.classList.remove("closed");
        toggleIcon.classList.add("open");
      }

      this.visible = !this.visible;
    },
  }
};
</script>

<style lang='scss'>
.input-item {
  width: 100%;
  &__wrapper {
    position: relative;
  }
  &__label {
    font-size: 15px;
    font-family: var(--main-font-mona-sans);
    font-weight: bold;
    margin: 0 0 7px 0;
  }
  &__field {
    position: relative;
    padding: 10px;
    border: 1px solid #e7e7e9;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    max-width: 320px;
    transition: box-shadow 0.3s ease;
    &--password {
      padding-right: 40px;
    }
    &--error {
      background-color: #f55;
      opacity: 0.5;
    }
    &:hover {
      outline: 3px solid rgba(238, 162, 227, 0.5);
    }
    &:focus, &:active {
      outline: 3px solid rgba(238, 162, 227, 0.9);
      border: 1px solid rgba(221, 150, 255, 1); /* Розовая граница */
    }
  }
  &__icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    &.open {
      background-image: url('@/components/icons/eye-open.png');
    }
    &.closed {
      background-image: url('@/components/icons/eye-closed.png');
    }
  }
}
</style>
