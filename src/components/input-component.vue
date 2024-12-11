<template>
  <div>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
    />
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ["password", "email"].includes(value),
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    }
  },
  computed: {
    inputType() {
      return this.type;
    },
  },
};
</script>

<style>
.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}
</style>
