<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <span class="text-center text-blue-800 text-2xl mb-4">{{ currentFlash }}</span>
    <input v-model="speed" class="w-1/2" type="range" min="0" max="1000" @input="updateSpeed">
    <span class="text-center mb-4">{{ speed }}</span>
  </div>
</template>

<script>
export default {
  name: 'ShowFlash',

  data() {
    return {
      currentIndex: 0, // 現在表示しているインデックス
      speed: 300, // レンジスライダーの値

      news: {
        flash: [
          '新経済国家',
          'エリオディアは、',
          '本日、',
          '新たなデジタル通貨',
          '「エリオコイン」',
          'を発表しました。',
          'この通貨は、',
          'エリオディア',
          '中央銀行が',
          '監督し、',
          '国内の',
          'デジタル取引の',
          '安定を',
          '保証するもので、',
          '地域経済の',
          '活性化が',
          '期待されます。',
          'エリオコインの',
          '発表により、',
          'エリオディアの',
          '証券市場は',
          '一時5%',
          '上昇しましたが、',
          'その後は',
          '安定しました。',
          '専門家は、',
          'エリオコインが',
          '地域通貨としての',
          '地位を築くため、',
          '今後',
          '数か月間の',
          '市場動向に',
          '注目しています。'
        ]
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
