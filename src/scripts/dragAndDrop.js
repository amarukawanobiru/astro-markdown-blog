export const dragAndDrop = () => {
  const $rangeSlider = document.querySelector(".range-slider");

  if ($rangeSlider) {
    const $rangeSliderTrack = $rangeSlider.querySelector(
      ".range-slider__track"
    );
    const $rangeSliderThumb = $rangeSlider.querySelector(
      ".range-slider__thumb"
    );
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
      let adjustedX = pointerPositionX - shiftX;
      let ratio;

      if (adjustedX >= 0 && adjustedX <= denominator) {
        $rangeSliderThumb.style.left = `${adjustedX}px`;
        ratio = Math.trunc((adjustedX / denominator) * 100);
      } else if (adjustedX < 0) {
        $rangeSliderThumb.style.left = "0px";
        adjustedX = 0;
        ratio = 0;
      } else {
        $rangeSliderThumb.style.left = `${denominator}px`;
        adjustedX = denominator;
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
};
