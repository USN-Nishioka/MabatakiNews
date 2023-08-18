<template>
  <div class="w-full md:w-1/3 px-2 py-4">
    <div class="bg-gray-100 mx-auto">
      <div class="max-w-5xl mx-auto p-4">
        <!-- ニュース情報の表示 -->
        <div class="relative rounded-lg shadow-lg overflow-hidden h-72">
          <!-- ニュースの画像 -->
          <div :style="{ backgroundImage: `url(${news.image})` }" class="bg-center bg-cover w-full h-full" />

          <!-- オーバーレイ情報 -->
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <!-- タイトル -->
            <div class="text-center">
              <span class="pl-2 pr-2 block text-white md:text-2xl lg:text-3xl xl:text-4xl mb-4">{{ news.title }}</span>

              <!-- URL, ソース, 作者, 日付 -->
              <div class="text-sm mb-2 mt-4">
                <span class="font-semibold text-white">Source:</span> {{ news.source }} |
                <span class="font-semibold text-white">Author:</span> {{ news.author }} |
                <span class="font-semibold text-white">Date:</span> {{ news.published_at }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowNews',

  props: {
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
  }
};
</script>
