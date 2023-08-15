<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-5xl mx-auto p-8">
      <!-- ニュース情報の表示 -->
      <div class="rounded-lg shadow-lg bg-white p-6 mb-8">
        <h1 class="text-3xl font-bold mb-4">
          {{ news.title }}
        </h1>
        <img :src="news.image" alt="news.image" class="w-full rounded-lg mb-4">
        <div class="text-sm mb-2">
          <span class="font-semibold">Source:</span> {{ news.source }} |
          <span class="font-semibold">Author:</span> {{ news.author }} |
          <span class="font-semibold">Date:</span> {{ news.published_at }}
        </div>
        <p class="text-gray-700 mb-4">
          {{ news.description }}
        </p>
        <a :href="news.url" class="text-blue-500 hover:text-blue-700 hover:underline">{{ news.url }}</a>
      </div>
      <!-- フラッシュの表示 -->
      <div class="rounded-lg shadow-lg bg-white p-6 mb-8">
        <span class="block text-center text-blue-800 text-2xl mb-4">{{ currentFlash }}</span>
      </div>
      <!-- フラッシュ表示速度調整 -->
      <div class="rounded-lg shadow-lg bg-white p-6 flex items-center justify-between">
        <span class="text-gray-700">Flash Speed: {{ speed }}</span>
        <input v-model="speed" class="w-1/2 ml-4" type="range" min="0" max="1000" @input="updateSpeed">
      </div>
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
