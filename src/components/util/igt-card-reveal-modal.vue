<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container w-min mx-auto p-4 bg-cq-slate shadow-xl">

          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">

              <div class="flex flex-row w-full p-4">

                <div :key="'hand-' + card.id + '-' + index" v-for="(card, index) in cards">

                  <div class="memory-tile" :class="isOpen[index] ? 'flip-container': 'flip-container flipped'">
                    <div class="flipper">
                      <div class="front">
                        <cq-card :is-in-hand="false" :is-disabled="false" :card=card :can-click="false"></cq-card>
                      </div>
                      <div class="back">
                        <div class="w-48 h-72 p-2 m-2 border-4"></div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-green" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import CqCard from "@/components/cq-card";

export default {
  name: "igt-modal",
  components: {CqCard},
  data() {
    return {
      isOpen: []
    }
  },

  props: {
    cards: {
      type: Array,
      required: true
    },
  },

  mounted() {
    for (let i = 0; i < this.cards.length; i++) {
      setTimeout(() => {
        this.isOpen.push(true);
      }, 650 * i)
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}


.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Flipcard style */


.flipper {
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  position: relative;
}

.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
}

.back {
  display: flex;
  justify-content: center;
  flex-direction: column;

  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}

.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.front {
  z-index: 2;
}


</style>
