<template>
    <div class="typewriter-container">
        <Transition name="fade" mode="out-in">
            <p :key="text">
                <span>{{ prefix }}</span>
                <span class="typewriter-text">{{ displayedText }}</span>
                <span class="typewriter-caret" :class="{ blink: isComplete }">|</span>
            </p>
        </Transition>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  typeByWord: {
    type: Boolean,
    default: false
  },
  typingSpeed: {
    type: Number,
    default: 100
  },
  prefix: {
    type: String,
    required: false,
    default: ""
  },
  startDelay: {
    type: Number,
    default: 200
  }
});
const displayedText = ref("");
const isComplete = ref(false);
const isTyping = ref(false);
const currentIndex = ref(0);
var timeout;
const textItems = computed(() => {
  if (props.typeByWord) {
    return props.text.split(" ");
  } else {
    return props.text.split("");
  }
});
function startTyping() {
  isTyping.value = true;
  displayedText.value = "";
  isComplete.value = false;
  currentIndex.value = 0;
  clearTimeout(timeout);
  const typeNextItem = () => {
    if (currentIndex.value < textItems.value.length) {
      if (props.typeByWord) {
        displayedText.value += (currentIndex.value === 0 ? "" : " ") + textItems.value[currentIndex.value];
      } else {
        displayedText.value += textItems.value[currentIndex.value];
      }
      currentIndex.value++;
      timeout = setTimeout(typeNextItem, props.typingSpeed);
    } else {
      isTyping.value = false;
      isComplete.value = true;
    }
  };
  timeout = setTimeout(typeNextItem, props.startDelay);
}
onMounted(() => {
  startTyping();
});
watch(() => props.text, startTyping);
</script>

<style scoped>
.typewriter-container{@apply inline-block}.typewriter-caret{@apply ml-[2px] text-current}.typewriter-caret.blink{animation:blink 1s step-end infinite}@keyframes blink{0%,to{opacity:1}50%{opacity:0}}
</style>
