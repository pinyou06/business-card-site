async function fetchData() {
    try {
        const response = await fetch("https://business-card-site-new.vercel.app/api/data");
        const data = await response.json();
        console.log("フロントエンド取得データ:", data); // デバッグ用

        if (!Array.isArray(data)) {
            console.error("データが配列ではありません:", data);
            return;
        }

        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = ""; // 一度クリア

        data.forEach(row => {
            console.log("各行のデータ:", row); // デバッグ用
            
            const nickname = row[0];  // B列（ニックネーム）
            const name = row[1];  // C列（名前）
            const favoriteFood = row[2];  // D列（好きな食べ物）
            const hobby = row[3];  // E列（趣味）
            const imageUrl = row[4];  // F列（画像URL）

            // Google Drive の画像URLを取得し、直接表示できる形式に変換
            const fileId = imageUrl.split("id=")[1]; 
            const imageSrc = fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w500` : "";

            console.log("画像URL:", imageUrl);
            console.log("変換後の画像URL:", imageSrc);

            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h2>${nickname} (${name})</h2>
                <div class="image-container" onclick="flipImage(this)">
                    <div class="image-inner">
                        <img src="${imageSrc}" alt="${name}の名刺" class="front">
                        <div class="back">
                            <p>好きな食べ物: ${favoriteFood} <br>
                            趣味: ${hobby} </p>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("データ取得エラー:", error);
    }
}

fetchData();
