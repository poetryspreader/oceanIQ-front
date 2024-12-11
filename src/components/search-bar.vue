<template>
  <form
    class="search-bar"
    @submit.prevent="submitSearch"
  >
    <input
      v-model="query"
      type="text"
      class="search-bar__input"
      placeholder="Search..."
      required
    />
    <button type="submit" class="search-bar__button">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        aria-hidden="true"
      />
    </button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    async submitSearch() {
      try {
        const response = await axios.post("/search", { query: this.query });
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
}
</script>
<style lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 4px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0 0 50px;
  width: 100%;
  max-width: 800px;
  border: 2px solid transparent;
  transition: all 0.2s;
  &:hover {
    border: 2px solid #365d4f;
  }
  &__input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 30px;
    background-color: transparent;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: #365d4f;
    cursor: pointer;
    transition: background-color 0.3s;
    svg {
      width: 20px;
      height: 20px;
      color: white;
    }
  }
}
</style>
