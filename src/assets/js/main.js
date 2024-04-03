const $rangeSlider = document.querySelector(".range-slider");

if ($rangeSlider) {
  const $rangeSliderTrack = $rangeSlider.querySelector(".range-slider__track");
  const $rangeSliderThumb = $rangeSlider.querySelector(".range-slider__thumb");
  const $rangeDisplay = document.querySelector(".range-display");
  const $mainVisualMask = document.querySelector(".main-visual__mask");
  const denominator =
    $rangeSliderTrack.clientWidth - $rangeSliderThumb.offsetWidth;

  const $devStatus = document.querySelector(".dev-status");
  const $touch = $devStatus.querySelector(".touch");
  const $handle = $devStatus.querySelector(".handle");
  const $move = $devStatus.querySelector(".move");

  let shiftX;

  function thumbMove({ pointerPositionX }) {
    const adjustedX = pointerPositionX - shiftX;
    let ratio;

    if (adjustedX >= 0 && adjustedX <= denominator) {
      $rangeSliderThumb.style.left = `${adjustedX}px`;
      ratio = Math.trunc((adjustedX / denominator) * 100);
    } else if (adjustedX < 0) {
      $rangeSliderThumb.style.left = "0px";
      ratio = 0;
    } else {
      $rangeSliderThumb.style.left = `${denominator}px`;
      ratio = 100;
    }

    $rangeSliderTrack.style.backgroundImage = `linear-gradient(90deg, #555 ${adjustedX}px , #fff ${adjustedX}px )`;
    $mainVisualMask.style.backdropFilter = `blur(${Math.trunc(ratio / 5)}px)`;
    $mainVisualMask.style.WebkitBackdropFilter = `blur(${Math.trunc(
      ratio / 5
    )}px)`;
    $rangeDisplay.textContent = `${ratio}%`;

    $move.textContent = `Ratio: ${ratio} AdjustedX: ${adjustedX}`;
  }

  function handleMouseMove(e) {
    const pointerPositionX = e.clientX;

    thumbMove({ pointerPositionX });
  }

  function handleTouchMove(e) {
    const pointerPositionX = e.changedTouches[0].clientX;

    thumbMove({ pointerPositionX });

    $handle.textContent = `PositionX: ${pointerPositionX}`;
  }

  // ポイディングデバイスがマウスだった場合の処理
  $rangeSliderThumb.addEventListener("mousedown", (e) => {
    e.preventDefault();

    shiftX =
      e.clientX -
      ($rangeSliderThumb.getBoundingClientRect().left -
        $rangeSliderTrack.getBoundingClientRect().left);

    $rangeDisplay.classList.add("js-active");

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseup", () => {
      $rangeDisplay.classList.remove("js-active");
      document.removeEventListener("mousemove", handleMouseMove);
    });
  });

  // ポインティングデバイスがタッチだった場合の処理
  $rangeSliderThumb.addEventListener("touchstart", (e) => {
    e.preventDefault();

    shiftX =
      e.changedTouches[0].clientX -
      ($rangeSliderThumb.getBoundingClientRect().left -
        $rangeSliderTrack.getBoundingClientRect().left);

    $rangeDisplay.classList.add("js-active");

    $touch.textContent = `shiftX: ${shiftX}`;

    document.addEventListener("touchmove", handleTouchMove);

    document.addEventListener("touchend", () => {
      $rangeDisplay.classList.remove("js-active");
      document.removeEventListener("touchmove", handleTouchMove);
    });
  });
}

// TODO: ウィンドウサイズに関係なくタッチ操作を行えるようにする

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

  [...$footnotes].map((element, index) => {
    element.addEventListener("touch", (e) => {
      e.stopPropagation(); // イベントのバブリング（伝播）を防ぐためのメソッド
      $footnoteCaptions[index].classList.toggle("js-show");
    });
  });

  document.addEventListener("touch", () => {
    [...$footnotes].map((_, index) => {
      $footnoteCaptions[index].classList.remove("js-show");
    });
  });

  adjustFootnoteCaptions();

  window.addEventListener("resize", adjustFootnoteCaptions);
}
