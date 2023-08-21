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
    <!-- カウントダウンの表示 -->
    <div v-if="countdown > 0" class="z-10 absolute inset-x-0 flex flex-col justify-center h-full text-center text-white text-5xl">
      {{ countdown }}
    </div>
    <!-- フラッシュの表示 -->
    <div v-else id="flash" class="p-8 z-10 absolute inset-x-0 flex flex-col justify-center h-full">
      <div class="p-6 mb-8">
        <span class="block text-center text-white text-5xl mb-3">{{ currentFlash }}</span>
      </div>
    </div>
    <!-- フッター -->
    <div id="info" class="p-8 font-semibold text-white text-right absolute inset-x-0 bottom-0 z-10">
      <!-- その他情報 -->
      <div class="mb-3">
        Link: <a :href="news.url" class="text-blue-500 hover:text-blue-700 underline mb-4">{{ news.source }}</a><br>
        Author: {{ news.author }}<br>
        Date: {{ news.published_at }}<br>
      </div>
      <!-- 再生後表示ボタン -->
      <div class="z-10 inset-x-0 flex flex-col justify-center h-full text-center space-y-4">
        <button class="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600" @click="goToNextNews">
          &gt;&gt; NEXT
        </button>
        <button class="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600" @click="goToPrevNews">
          &lt;&lt; PREV
        </button>
        <button class="bg-green-500 text-white px-4 py-2 hover:bg-green-600" @click="replayNews">
          ✓ REPLAY
        </button>
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
      speed: 350, // レンジスライダーの値
      countdown: 3, // カウントダウンの初期値

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
    // カウントダウンの実行
    const countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(countdownInterval); // カウントダウンが終了したらインターバルをクリア
        this.updateSpeed(); // フラッシュの初期インターバルをセット
      }
    }, this.speed);

    // ニュースを取得
    this.$axios.get(`http://127.0.0.1:8000/get_news/${this.$route.params.id}`).then((res) => {
      this.news = res.data;
    }).catch((err) => {
      console.error(err);
      alert('Failed to retrieve the data');
    });
  },

  beforeDestroy() {
    clearInterval(this.interval); // コンポーネントが破棄される前にインターバルをクリア
  },

  methods: {
    updateSpeed() {
      clearInterval(this.interval); // 既存のインターバルをクリア
      this.interval = setInterval(this.updateFlash, this.speed); // 新しいインターバルをセット
    },

    updateFlash() {
      // インデックスが配列の最後に達した場合
      if (this.currentIndex >= this.news.flash.length - 1) {
        clearInterval(this.interval); // インターバルをクリアしてflashの表示を停止
        // 5s後に次のニュースに遷移
        setTimeout(() => {
          this.goToNextNews();
        }, 5000);
      } else {
        this.currentIndex++; // インデックスを更新
      }
    },

    goToPrevNews() {
      const prevId = parseInt(this.$route.params.id, 10) - 1;
      this.$router.push(`/show/${prevId}`);
    },

    goToNextNews() {
      const nextId = parseInt(this.$route.params.id, 10) + 1;
      this.$router.push(`/show/${nextId}`);
    },

    replayNews() {
      this.$router.go(0);
    }
  }
};
</script>

<style scoped>

</style>
