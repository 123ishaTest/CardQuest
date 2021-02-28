<template>
  <div class="feature-tab">
    <p class="text-2xl font-semibold">Credits</p>
    <hr>
    <br>

    <div class="p-4">
      <p class="text-lg">This game was Developed in 7 days by <a href="http://github.com/ishadijcks/" target="_blank">Isha</a>
        for the <a href="https://incremental_games.reddit.com/" target="_blank">r/incremental_games</a> jam of 2021.</p>
      <p class="text-lg">It uses the <a href="https://github.com/123ishaTest/incremental-game-template" target="_blank">Incremental
        Game Template</a>.</p>
      <p class="text-lg">I realize it isn't the most traditional incremental game, but it should still be enjoyable
        :)</p>
      <br>
      <p class="text-lg">Thank you for playing, I hope you liked it.</p>
    </div>
    <div class="p-4">
      <p class="text-lg">Artwork taken from <a href="https://game-icons.net/" target="_blank">game-icons.net</a></p>
    </div>
  </div>
</template>

<script>

export default {
  name: "cq-credits",

}
</script>

<style scoped>
p {
  @apply text-white;
}

a {
  @apply text-blue-500;
}
</style>
