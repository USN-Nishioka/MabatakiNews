<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-green-500 tracking-wider my-8">
      Mabataki NEWS
    </h1>
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
      newsList: []
    };
  },

  mounted() {
    this.getNewsList();
  },

  methods: {
    getNewsList() {
      const url = process.env.getNewsListUrl;
      this.$axios.get(url).then((res) => {
        this.newsList = res.data;
      }).catch((err) => {
        console.error(err);
        alert('Failed to retrieve the data');
      });
    }
  }
};
</script>
