function flipImage(element) {
    element.classList.toggle("flipped");

    const backText = element.querySelector(".back p");
    if (backText) {
        if (element.classList.contains("flipped")) {
            backText.style.display = "block"; // 画像が裏返ったら表示
        } else {
            backText.style.display = "none"; // 表のときは非表示
        }
    }
}


function showSelectedImages() {
    // 画像セットを全て非表示にする
    const allImageSets = document.querySelectorAll('.image-container');
    allImageSets.forEach(set => {
        set.classList.add('hidden');
        set.classList.remove('flipped'); // flippedクラスを削除して表に戻す
    });
}