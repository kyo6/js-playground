class Animator {
  constructor() {
    this.durationTime = 0;
    this.easingFn = (k) => k;
    this.eventHandlers = new Map();
  }
  easing(fn) {
    if (typeof fn !== "function") {
      throw new Error("Easing must be a function, such as k => k");
    }
    this.easingFn = fn;
    return this;
  }
  duration(time) {
    if (typeof time !== "number") {
      throw new Error("Duration must be a number");
    }
    this.durationTime = time;
    return this;
  }
  on(type, hander) {
    console.log(hander, typeof hander);
    // if (typeof handler !== "function") {
    //   throw new Error("Handler must be a function");
    // }
    this.eventHandlers.set(type, hander);
    return this;
  }
  animate() {
    const duration = this.durationTime;
    const easing = this.easingFn;
    const update = this.eventHandlers.get("update") || ((t) => t);
    const complete = this.eventHandlers.get("complete") || (() => {});
    let timer = null;
    const startTime = +new Date();
    function step() {
      const percent = Math.min(1, (+new Date() - startTime) / duration);
      /**
       * easingFn 函数如何生效?
       * percent = 0.5;
       * easingFn = k => k * k;
       * easingPercent = 0.5 * 0.5 = 0.25
       */
      const easingPercent = easing(percent);
      if (percent < 1) {
        update(easingPercent);
        timer = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(timer);
        update(easing(1));
        complete();
      }
    }

    timer = requestAnimationFrame(step);
  }
}
