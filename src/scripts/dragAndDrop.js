const $indicator = document.querySelector(".indicator");

if ($indicator) {
  const $status = document.querySelector(".status");
  const $indicatorPointer = $indicator.querySelector(".indicator__pointer");
  const $mainVisualMask = document.querySelector(".main-visual__mask");

  let shiftX;
  // let shiftY;

  function updateBackdropFilter() {
    const denominator =
      $indicator.clientWidth - $indicatorPointer.clientWidth - 6;

    const ratio = Math.trunc(
      (($indicatorPointer.getBoundingClientRect().left -
        $indicator.getBoundingClientRect().left -
        2) /
        denominator) *
        100
    );

    $mainVisualMask.style.backdropFilter = `blur(${Math.trunc(ratio / 5)}px)`;
    $mainVisualMask.style.WebkitBackdropFilter = `blur(${Math.trunc(
      ratio / 5
    )}px)`;
    $status.textContent = `${ratio}%`;
  }

  function adjustIndicatorPosition(
    grabElementLeft,
    pointerPositionX,
    deviceType
  ) {
    $indicatorPointer.style.left = `${
      pointerPositionX - $indicator.getBoundingClientRect().left - shiftX
    }px`;

    if (grabElementLeft - 2 < $indicator.getBoundingClientRect().left) {
      $indicatorPointer.style.left = "2px";
      if (deviceType === "touch") {
        document.removeEventListener("touchmove", handleTouchMove);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    }

    if (
      grabElementLeft + $indicatorPointer.clientWidth + 4 >
      $indicator.getBoundingClientRect().left + $indicator.clientWidth
    ) {
      $indicatorPointer.style.left = `calc(100% - 4px - ${$indicatorPointer.clientWidth}px)`;
      if (deviceType === "touch") {
        document.removeEventListener("touchmove", handleTouchMove);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    }

    updateBackdropFilter();
  }

  function handleMouseMove(event) {
    const grabElementLeft = $indicatorPointer.getBoundingClientRect().left;

    const pointerPositionX = event.pageX;
    // let pointerPositionY = event.changedTouches[0].pageY ? event.changedTouches[0].pageY : event.pageY;

    adjustIndicatorPosition(grabElementLeft, pointerPositionX, "mouse");
  }

  function handleTouchMove(event) {
    const grabElementLeft = $indicatorPointer.getBoundingClientRect().left;

    let pointerPositionX = event.changedTouches[0].pageX;
    // let pointerPositionY = event.changedTouches[0].pageY ? event.changedTouches[0].pageY : event.pageY;

    adjustIndicatorPosition(grabElementLeft, pointerPositionX, "touch");
  }

  // ポインティングデバイスがマウスだった場合の処理
  $indicatorPointer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    $indicatorPointer.style.cursor = "grabbing";

    shiftX = event.clientX - $indicatorPointer.getBoundingClientRect().left;
    // shiftY = event.clientY - $indicatorPointer.getBoundingClientRect().top;

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseup", () => {
      $indicatorPointer.style.cursor = "grab";
      document.removeEventListener("mousemove", handleMouseMove);
    });
  });

  // ポインティングデバイスのがタッチだった場合の処理
  $indicatorPointer.addEventListener("touchstart", (event) => {
    event.preventDefault();

    shiftX =
      event.changedTouches[0].clientX -
      $indicatorPointer.getBoundingClientRect().left;

    document.addEventListener("touchmove", handleTouchMove);

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", handleTouchMove);
    });
  });
}
