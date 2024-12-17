<template>
  <div class="logo">
    <div class="logo__circle">
      <img src="@/components/icons/ocean-iq.svg" alt="Icon" />
    </div>
    <div class="label">oceanIQ</div>
  </div>
</template>
<style lang='scss'>
.logo {
  display: flex;
  align-items: center;
  border-radius: 30px;
  background-color: var(--main-color-black);
  padding: 4px 5px;
  height: auto;
  width: 150px;
  &__circle {
    position: relative;
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    img {
      position: absolute;
      left: -1px;
      top: -1px;
      height: 42px;
      width: 42px;
      z-index: 2;
    }
  }
  .label {
    margin: 0 10px 0 10px;
    color: white;
    font-family: var(--main-font-offside);
  }
}
</style>