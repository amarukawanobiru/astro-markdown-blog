const $indicator = document.querySelector(".indicator");

if ($indicator) {
  const $status = document.querySelector(".status");
  const $indicatorPointer = $indicator.querySelector(".indicator__pointer");
  const $mainVisualMask = document.querySelector(".main-visual__mask");

  let shiftX;
  // let shiftY;
  function mouseMove(event) {
    const grabElementLeft = $indicatorPointer.getBoundingClientRect().left;

    const pointerPositionX = event.pageX;
    // let pointerPositionY = event.changedTouches[0].pageY ? event.changedTouches[0].pageY : event.pageY;

    $indicatorPointer.style.left = `${
      pointerPositionX - $indicator.getBoundingClientRect().left - shiftX
    }px`;

    const denominator =
      $indicator.clientWidth - $indicatorPointer.clientWidth - 6;

    if (grabElementLeft - 2 < $indicator.getBoundingClientRect().left) {
      $indicatorPointer.style.left = "2px";
      document.removeEventListener("mousemove", mouseMove);
    }

    if (
      grabElementLeft + $indicatorPointer.clientWidth + 4 >
      $indicator.getBoundingClientRect().left + $indicator.clientWidth
    ) {
      $indicatorPointer.style.left = `calc(100% - 4px - ${$indicatorPointer.clientWidth}px)`;
      document.removeEventListener("mousemove", mouseMove);
    }

    const ratio = Math.trunc(
      (($indicatorPointer.getBoundingClientRect().left -
        $indicator.getBoundingClientRect().left -
        2) /
        denominator) *
        100
    );

    $mainVisualMask.style.backdropFilter = `blur(${Math.trunc(ratio / 5)}px)`;
    $status.textContent = `${ratio}%`;
  }

  function touchMove(event) {
    const grabElementLeft = $indicatorPointer.getBoundingClientRect().left;

    let pointerPositionX = event.changedTouches[0].pageX;
    // let pointerPositionY = event.changedTouches[0].pageY ? event.changedTouches[0].pageY : event.pageY;

    $indicatorPointer.style.left = `${
      pointerPositionX - $indicator.getBoundingClientRect().left - shiftX
    }px`;

    const denominator =
      $indicator.clientWidth - $indicatorPointer.clientWidth - 6;

    if (grabElementLeft - 2 < $indicator.getBoundingClientRect().left) {
      $indicatorPointer.style.left = "2px";
      document.removeEventListener("touchmove", touchMove);
    }

    if (
      grabElementLeft + $indicatorPointer.clientWidth + 4 >
      $indicator.getBoundingClientRect().left + $indicator.clientWidth
    ) {
      $indicatorPointer.style.left = `calc(100% - 4px - ${$indicatorPointer.clientWidth}px)`;
      document.removeEventListener("touchmove", touchMove);
    }

    const ratio = Math.trunc(
      (($indicatorPointer.getBoundingClientRect().left -
        $indicator.getBoundingClientRect().left -
        2) /
        denominator) *
        100
    );

    $mainVisualMask.style.backdropFilter = `blur(${Math.trunc(ratio / 5)}px)`;
    $status.textContent = `${ratio}%`;
  }

  $indicatorPointer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    $indicatorPointer.style.cursor = "grabbing";

    shiftX = event.clientX - $indicatorPointer.getBoundingClientRect().left;
    // shiftY = event.clientY - $indicatorPointer.getBoundingClientRect().top;

    document.addEventListener("mousemove", mouseMove);

    document.addEventListener("mouseup", () => {
      $indicatorPointer.style.cursor = "grab";
      document.removeEventListener("mousemove", mouseMove);
    });
  });

  $indicatorPointer.addEventListener("touchstart", (event) => {
    event.preventDefault();

    shiftX =
      event.changedTouches[0].clientX -
      $indicatorPointer.getBoundingClientRect().left;

    document.addEventListener("touchmove", touchMove);

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", touchMove);
    });
  });
}
