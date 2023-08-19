<template>
  <div :style="{ backgroundImage: `url(${news.image})` }" class="bg-center bg-cover min-h-screen relative">
    <!-- オーバーレイ -->
    <div class="absolute inset-0 bg-black bg-opacity-50" />
    <!-- タイトル -->
    <div id="title" class="p-8 z-10 absolute inset-x-0 top-0">
      <h1 class="text-3xl font-bold text-white mb-4">
        {{ truncatedTitle }}
      </h1>
    </div>
    <!-- フラッシュの表示 -->
    <div id="flash" class="p-8 z-10 absolute inset-x-0 flex flex-col justify-center h-full">
      <div class="p-6 mb-8">
        <span class="block text-center text-white text-5xl mb-4">{{ currentFlash }}</span>
      </div>
    </div>
    <!-- その他情報 -->
    <div id="info" class="p-8 font-semibold text-white text-right absolute inset-x-0 bottom-0 z-10">
      Link: <a :href="news.url" class="text-blue-500 hover:text-blue-700 underline mb-4">{{ news.source }}</a><br>
      Author: {{ news.author }}<br>
      Date: {{ news.published_at }}<br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowNews',

  data() {
    return {
      currentIndex: 0, // 現在表示しているインデックス
      speed: 300, // レンジスライダーの値

      // ニュース情報
      news: {
        id: null,
        source: null,
        author: null,
        title: null,
        description: null,
        url: null,
        image: null,
        content: null,
        flash: [],
        published_at: null
      }
    };
  },

  computed: {
    currentFlash() {
      return this.news.flash[this.currentIndex]; // 現在のインデックスの文節を返す
    },

    truncatedTitle() {
      if (this.news.title && this.news.title.length > 50) {
        return this.news.title.substring(0, 50) + '…';
      } else {
        return this.news.title;
      }
    }
  },

  mounted() {
    this.updateSpeed(); // ここで初期インターバルをセット

    // ニュースを取得
    this.$axios.get(`http://127.0.0.1:8000/get_news/${this.$route.params.id}`).then((res) => {
      this.news = res.data;
    }).catch((err) => {
      console.error(err);
      alert('Failed to retrieve the data');
    });
  },

  beforeDestroy() {
    // コンポーネントが破棄される前にインターバルをクリア
    clearInterval(this.interval);
  },

  methods: {
    updateSpeed() {
      // 既存のインターバルをクリア
      clearInterval(this.interval);
      // 新しいインターバルをセット
      this.interval = setInterval(this.updateFlash, this.speed);
    },

    updateFlash() {
      // インデックスを更新し、配列の最後に達したら0にリセット
      this.currentIndex = (this.currentIndex + 1) % this.news.flash.length;
    }
  }
};
</script>

<style scoped>

</style>
