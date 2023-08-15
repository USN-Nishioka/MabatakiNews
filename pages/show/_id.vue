<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div>
      <!--ニュース情報の表示-->
      {{ news.title }}<br>
      {{ news.source }}<br>
      {{ news.author }}<br>
      {{ news.published_at }}<br>
      {{ news.description }}<br>
      <a :href="news.url">{{ news.url }}</a><br>
      <img :src="news.image" alt="news.image"><br>
    </div>
    <div>
      <!-- フラッシュの表示 -->
      <span class="text-center text-blue-800 text-2xl mb-4">{{ currentFlash }}</span>
    </div>
    <div>
      <!-- フラッシュ表示速度調整 -->
      <input v-model="speed" class="w-1/2" type="range" min="0" max="1000" @input="updateSpeed">
      <span class="text-center mb-4">{{ speed }}</span>
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
