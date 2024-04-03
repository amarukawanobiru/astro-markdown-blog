// TODO: ウィンドウサイズに関係なくタッチ操作を行えるようにする

export const footnote = () => {
  const $post = document.querySelector(".post");
  const $footnotes = document.querySelectorAll(".footnote");

  if ($footnotes.length > 0) {
    const $footnoteNumbers = document.querySelectorAll(".footnote__number");
    const $footnoteCaptions = document.querySelectorAll(".footnote__caption");
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

    [...$footnotes].map((element, index) => {
      element.addEventListener("touchstart", (e) => {
        e.stopPropagation(); // イベントのバブリング（伝播）を防ぐためのメソッド
        const activeNote = document.querySelector(".js-show");
        if (activeNote) {
          activeNote.classList.remove("js-show");
        }
        $footnoteCaptions[index].classList.toggle("js-show");
      });
    });

    document.addEventListener("touchstart", () => {
      [...$footnotes].map((_, index) => {
        $footnoteCaptions[index].classList.remove("js-show");
      });
    });
  }
};
