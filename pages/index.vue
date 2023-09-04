<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <img src="/header_logo.png" alt="MabatakiNewsLogo" class="my-5">
    <div class="flex flex-wrap justify-center w-full px-4 md:px-0">
      <NewsCard v-for="(news, index) in newsList" :key="`news${index}`" :news="news" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      newsList: [],
      limit: 10
    };
  },

  mounted() {
    this.getNewsList();
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    getNewsList() {
      const url = `${process.env.getNewsListUrl}?limit=${this.limit}`;
      this.$axios.get(url).then((res) => {
        this.newsList = res.data;
      }).catch((err) => {
        console.error(err);
        alert('Failed to retrieve the data');
      });
    },

    updateNewsList() {
      this.limit += 10;
      this.getNewsList();
    },

    handleScroll() {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10; // "10" is a threshold value
      if (nearBottom) {
        this.updateNewsList();
      }
    }
  }
};
</script>
