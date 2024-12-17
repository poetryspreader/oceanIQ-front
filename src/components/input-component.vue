<template>
  <div class='input-item'>
    <div class='input-item__label'>
      {{ $t(`${this.label}`) }}
    </div>
    <input
      class="input-item__field"
      :class="{ 'input-item__field--error': hasError }"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder ? $t(`${placeholder}`) : placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
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
};
</script>

<style lang='scss'>
.input-item {
  width: 100%;
  &__label {
    font-size: 15px;
    font-family: var(--main-font-mona-sans);
    font-weight: bold;
  }
  &__field {
    margin: 7px 0 0 0;
    padding: 10px;
    border: 1px solid #e7e7e9;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    max-width: 320px;
    transition: box-shadow 0.3s ease;
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
}
</style>
