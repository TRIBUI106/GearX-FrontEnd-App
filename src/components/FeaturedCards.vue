<script setup lang="ts">
interface Card {
  img: string
  title: string
  desc: string
}

const cards: Card[] = [
  {
    img: '../assets/images/games/game1.jpg',
    title: 'Gói thuê Valorant',
    desc: 'Tài khoản rank cao, giá tốt, bảo hành 24h.'
  },
  {
    img: '../assets/images/games/game2.jpg',
    title: 'Gói GTA V',
    desc: 'Thoải mái lái xe, mod skin, chơi roleplay.'
  },
  {
    img: '../assets/images/games/game3.jpg',
    title: 'Steam Premium',
    desc: 'Nhiều game hot, login nhanh bằng QR.'
  },
  {
    img: '../assets/images/games/game4.jpg',
    title: 'Liên Minh Huyền Thoại',
    desc: 'Nick xịn, full skin giới hạn, giá hời.'
  },
  {
    img: '../assets/images/games/game5.jpg',
    title: 'CS2 Prime',
    desc: 'Rank Global, không VAC, chơi mượt mà.'
  }
]
</script>

<template>
  <div class="w-full max-w-6xl">
    <h2 class="text-2xl font-semibold mb-6 text-center">Nổi bật hôm nay</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <img
          :src="card.img"
          alt="img"
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2 truncate">{{ card.title }}</h3>
          <p class="text-gray-500 text-sm line-clamp-2">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
