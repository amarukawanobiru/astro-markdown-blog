const $post = document.querySelector(".post");
const $footnotes = document.querySelectorAll(".footnote");
const $footnoteNumbers = document.querySelectorAll(".footnote__number");
const $footnoteCaptions = document.querySelectorAll(".footnote__caption");

// TODO: 読み込んだときに位置を確認して実行する
const adjustFootnoteCaptions = () => {
  const postLeft = $post.getBoundingClientRect().left;
  const threshold = 140;

  [...$footnoteNumbers].map((element, index) => {
    const elementLeft = element.getBoundingClientRect().left;
    if ($footnoteCaptions[index].classList.contains("js-left")) {
      $footnoteCaptions[index].classList.remove("js-left");
    }

    if ($footnoteCaptions[index].classList.contains("js-right")) {
      $footnoteCaptions[index].classList.remove("js-right");
    }

    if (elementLeft - postLeft < threshold) {
      $footnoteCaptions[index].classList.add("js-left");
    } else if (postLeft + $post.clientWidth < elementLeft + threshold) {
      $footnoteCaptions[index].classList.add("js-right");
    }
  });
};

adjustFootnoteCaptions();

window.addEventListener("resize", adjustFootnoteCaptions);

if (window.innerWidth <= 768) {
  [...$footnotes].map((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation(); // イベントのバブリング（伝播）を防ぐためのメソッド
      $footnoteCaptions[index].classList.toggle("js-show");
    });
  });

  document.addEventListener("click", () => {
    [...$footnotes].map((_, index) => {
      $footnoteCaptions[index].classList.remove("js-show");
    });
  });
}
