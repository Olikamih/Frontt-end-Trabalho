const overflow = (value: 'hidden' | 'initial') =>
  (document.body.style.overflowY = value);

const progress = {
  start() {
    const $load = document.getElementById('load');
    if ($load) {
      $load.classList.add('loading');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });     
    }
    overflow('hidden');
  },
  done() {
    const $load = document.getElementById('load');
    if ($load) {
      $load.classList.remove('loading');
    }
    overflow('initial');
  },
};

export default progress;
