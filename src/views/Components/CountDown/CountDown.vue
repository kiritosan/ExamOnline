<template>
  <div>倒计时：{{ countdown | display(2) }}</div>
</template>

<script>
export default {
  data() {
    return {
      now: NaN,
      time: 60 * 30,     // 剩余时间
    };
  },

  props: {
    submitPaper: {
      type: Function
    },
    item: {
      type: Object
    },
    questions: {
      type: Array
    },
    scores: {
      type: Array
    }
  },

  filters: {
    display(value, length) {
      const minute = ((value % 3.6e3) / 6e1) | 0,
        second = ((value % 6e1) / 1e0) | 0;

      const format = (number) =>
        String.prototype.padStart.call(number, length, "0");

      return `${format(minute)}:${format(second)}`;
     
    },
  },

  created() {
    const update = () => {
      this.now = (Date.now() / 1e3 | 0);
      requestAnimationFrame(update);
    };
    update();
  },

  computed: {
    // 结束时间
    finishTime() {
      return (Date.now()/1e3 | 0) + this.time;
    },
    //剩余的毫秒数
    countdown() {
      return Math.max(0, this.finishTime - this.now);
    },
  },

  watch: {
    countdown(countdown) {
      if (countdown === 0) {
        this.submitPaper(this.item)
      }
    },
  },
};
</script>
