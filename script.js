const people = [
  { id: 0, name: "三浦翔平", img: "三浦翔平.jpg" },
  { id: 1, name: "中村倫也", img: "中村倫也.jpg" },
  { id: 2, name: "千葉雄大", img: "千葉雄大.jpg" },
  { id: 3, name: "吉沢亮", img: "吉沢亮.jpg" },
  { id: 4, name: "坂口健太郎", img: "坂口健太郎.jpg" },
  { id: 5, name: "山田裕貴", img: "山田裕貴.jpeg" },
  { id: 6, name: "杉野遥亮", img: "杉野遥亮.jpg" },
  { id: 7, name: "松坂桃李", img: "松坂桃李.jpg" },
  { id: 8, name: "横浜流星", img: "横浜流星.jpg" },
  { id: 9, name: "瀬戸康史", img: "瀬戸康史.jpg" },
  { id: 10, name: "犬飼貴丈", img: "犬飼貴丈.jpg" },
  { id: 11, name: "町田啓太", img: "町田啓太.webp" },
  { id: 12, name: "磯村勇斗", img: "磯村勇斗.jpg" },
  { id: 13, name: "神木隆之介", img: "神木隆之介.jpg" },
  { id: 14, name: "竜星涼", img: "竜星涼.jpg" },
  { id: 15, name: "竹内涼真", img: "竹内涼真.jpg" },
  { id: 16, name: "菅田将暉", img: "菅田将暉.jpg" },
  { id: 17, name: "赤楚衛二", img: "赤楚衛二.jpg" },
  { id: 18, name: "鈴木伸之", img: "鈴木伸之.jpg" },
  { id: 19, name: "間宮祥太朗", img: "間宮祥太朗.jpg" },
  { id: 20, name: "高杉真宙", img: "高杉真宙.jpg" },
  { id: 21, name: "柳楽優弥", img: "柳楽優弥.jpg" },
  { id: 22, name: "浅香航大", img: "浅香航大.jpg" },
  { id: 23, name: "白洲迅", img: "白洲迅.jpg" },
  { id: 24, name: "林遣都", img: "林遣都.jpg" },
  { id: 25, name: "野村周平", img: "野村周平.jpg" },
  { id: 26, name: "塩野瑛久", img: "塩野瑛久.jpg" },
  { id: 27, name: "工藤阿須加", img: "工藤阿須加.jpg" },
  { id: 28, name: "小関裕太", img: "小関裕太.jpg" },
  { id: 29, name: "福士蒼汰", img: "福士蒼汰.jpg" },
  { id: 30, name: "宮沢氷魚", img: "宮沢氷魚.jpg" },
  { id: 31, name: "中村蒼", img: "中村蒼.jpg" },
  { id: 32, name: "本郷奏多", img: "本郷奏多.jpg" },
  { id: 33, name: "山﨑賢人", img: "山﨑賢人.jpg" },
  { id: 34, name: "岡田将生", img: "岡田将生.jpg" },
  { id: 35, name: "志尊淳", img: "志尊淳.jpg" },
  { id: 36, name: "松下洸平", img: "松下洸平.jpg" },
  { id: 37, name: "成田凌", img: "成田凌.jpg" },
  { id: 38, name: "佐藤健", img: "佐藤健.jpg" },
  { id: 39, name: "溝端淳平", img: "溝端淳平.jpg" },
  { id: 40, name: "高橋文哉", img: "高橋文哉.jpg" },
  { id: 41, name: "中川大志", img: "中川大志.jpg" },
  { id: 42, name: "鈴鹿央士", img: "鈴鹿央士.jpg" },
  { id: 43, name: "眞栄田郷敦", img: "眞栄田郷敦.jpg" },
  { id: 44, name: "新田真剣佑", img: "新田真剣佑.jpg" },
  { id: 45, name: "板垣李光人", img: "板垣李光人.jpg" },
  { id: 46, name: "坂東龍汰", img: "坂東龍汰.jpg" },
  { id: 47, name: "本田響矢", img: "本田響矢.jpg" },
  { id: 48, name: "神尾楓珠", img: "神尾楓珠.jpg" },
  { id: 49, name: "瀬戸利樹", img: "瀬戸利樹.jpg" },
  { id: 50, name: "水上恒司", img: "水上恒司.jpg" },
  { id: 51, name: "加藤清史郎", img: "加藤清史郎.jpg" },
  { id: 52, name: "細田佳央太", img: "細田佳央太.jpg" },
  { id: 53, name: "野村康太", img: "野村康太.jpg" },
  { id: 54, name: "櫻井海音", img: "櫻井海音.jpg" },
  { id: 55, name: "前田公輝", img: "前田公輝.jpg" },
  { id: 56, name: "萩原利久", img: "萩原利久.jpg" },
  { id: 57, name: "宮世琉弥", img: "宮世琉弥.jpg" },
  { id: 58, name: "松本怜生", img: "松本怜生.jpg" },
  { id: 59, name: "前田拳太郎", img: "前田拳太郎.jpg" },
  { id: 60, name: "須賀健太", img: "須賀健太.jpg" },
];

const app = document.querySelector("#app");

let groups = [];
let survivors = [];
let finalists = [];
let picked = [];


/* =========================
   共通
   ========================= */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


/* =========================
   卡片
   ========================= */

function card(person) {
  return `
    <button
      class="card"
      id="p${person.id}"
      onclick="pick(${person.id})"
    >
      <span class="check">✓</span>
      <img src="${person.img}">
      <div class="name">${person.name}</div>
    </button>
  `;
}


/* =========================
   HOME
   ========================= */

function home() {

  app.innerHTML = `
    <section class="screen start">

      <h1>20代、30代俳優好き顔9選</h1>

      <div class="sub">
        男性
      </div>

      <button class="btn" onclick="start()">
        START
      </button>

      <p class="note">
      </p>

    </section>
  `;
}


/* =========================
   START
   ========================= */

function start() {

  groups = [];
  survivors = [];
  finalists = [];
  picked = [];

  const pool = shuffle(people);

  for (let i = 0; i < pool.length; i += 4) {
    groups.push(pool.slice(i, i + 4));
  }

  pre(0);
}


/* =========================
   ROUND 1｜予選
   ========================= */

function pre(round) {

  if (round >= groups.length) {

    if (survivors.length < 2) {
      result(survivors);
      return;
    }

    finalists = [];

    secondRound(0);

    return;
  }

  picked = [];

  const group = groups[round];

  app.innerHTML = `
    <section class="screen">

      <h2 class="title">
        ROUND 1｜予選
      </h2>

      <p class="sub" style="text-align:center">
        最大3人まで。0人でもOK。
      </p>

      <div class="grid">
        ${group.map(card).join("")}
      </div>

      <div style="text-align:center">

        <button
          class="btn"
          onclick="nextPre(${round})"
        >
          次へ
        </button>

      </div>

    </section>
  `;
}


/* =========================
   ROUND 1 選擇
   ========================= */

window.pick = function(id) {

  const el = document.querySelector("#p" + id);

  if (!el) return;

  if (picked.includes(id)) {

    picked = picked.filter(x => x !== id);

    el.classList.remove("selected");

  } else if (picked.length < 3) {

    picked.push(id);

    el.classList.add("selected");
  }
};


/* =========================
   ROUND 1 下一組
   ========================= */

function nextPre(round) {

  const group = groups[round];

  const selected = group.filter(person =>
    picked.includes(person.id)
  );

  survivors.push(...selected);

  pre(round + 1);
}


/* =========================
   ROUND 2｜本選
   ========================= */

function secondRound(index) {
  if (index >= survivors.length) {
    if (finalists.length < 2) {
      result(finalists);
      return;
    }
    startFinalRound(finalists);
    return;
  }
  const group = survivors.slice(index, index + 4);
  let firstId = null;
  let secondId = null;
  app.innerHTML = `
    <section class="screen">
      <h2 class="title">
        ROUND 2｜本選
      </h2>
      <p class="sub" style="text-align:center">
        第1位と第2位を順番に選んでください
      </p>
      <div class="grid">
        ${group.map(card).join("")}
      </div>
      <div style="text-align:center">
        <button
          class="btn"
          id="ok"
          disabled
        >
          決定
        </button>
      </div>
    </section>
  `;
  window.pick = function(id) {
    const el = document.querySelector("#p" + id);
    if (!el) return;
    /* =========================
       已經選過的人
       ========================= */
    if (id === firstId) {
      firstId = null;
      el.classList.remove("selected");
      const mark = el.querySelector(".check");
      if (mark) {
        mark.textContent = "✓";
      }
    } else if (id === secondId) {
      secondId = null;
      el.classList.remove("selected");
      const mark = el.querySelector(".check");
      if (mark) {
        mark.textContent = "✓";
      }
    }
    /* =========================
       選第1位
       ========================= */
    else if (firstId === null) {
      firstId = id;
      el.classList.add("selected");
      const mark = el.querySelector(".check");
      if (mark) {
        mark.textContent = "①";
      }
    }
    /* =========================
       選第2位
       ========================= */
    else if (secondId === null) {
      secondId = id;
      el.classList.add("selected");
      const mark = el.querySelector(".check");
      if (mark) {
        mark.textContent = "②";
      }
    }
    /* =========================
       已經有兩個人
       再點第三個
       → 取消第2位
       ========================= */
    else {
      const oldSecond =
        document.querySelector("#p" + secondId);
      if (oldSecond) {
        oldSecond.classList.remove("selected");
        const oldMark =
          oldSecond.querySelector(".check");
        if (oldMark) {
          oldMark.textContent = "✓";
        }
      }
      secondId = id;
      el.classList.add("selected");
      const mark = el.querySelector(".check");
      if (mark) {
        mark.textContent = "②";
      }
    }
    /* =========================
       決定按鈕
       ========================= */
    const button =
      document.querySelector("#ok");
    if (firstId !== null && secondId !== null) {
      button.disabled = false;
      button.onclick = function() {
        const first =
          group.find(p => p.id === firstId);
        const second =
          group.find(p => p.id === secondId);
        finalists.push(first);
        finalists.push(second);
        secondRound(index + group.length);
      };
    } else {
      button.disabled = true;
      button.onclick = null;
    }
  };
}

/* =====================================================
   ROUND 3｜最終選考
   ===================================================== */

/*
 * 這一輪不是單純淘汰。
 *
 * 會進行「比較排序」。
 *
 * 例如：
 *
 * A B C D E F G H I J
 *
 * 第一輪：
 *
 * A vs B → A
 * C vs D → D
 * E vs F → F
 * G vs H → H
 * I vs J → I
 *
 * 接著：
 *
 * 勝者組：
 * A vs D
 * F vs H
 * I 輪空
 *
 * 敗者組：
 * B vs C
 * E vs G
 * J 輪空
 *
 * 最後把比較結果整理成完整排名。
 */


/* =========================
   開始最終排序
   ========================= */

function startFinalRound(pool) {

  const list = shuffle(pool);

  mergeSortRanking(list, function(sorted) {

    result(sorted);
  });
}


/* =========================
   Merge Sort 排名
   ========================= */

function mergeSortRanking(list, callback) {

  if (list.length <= 1) {

    callback(list);
    return;
  }

  const middle = Math.floor(list.length / 2);

  const left = list.slice(0, middle);
  const right = list.slice(middle);

  mergeSortRanking(left, function(sortedLeft) {

    mergeSortRanking(right, function(sortedRight) {

      mergeRanking(
        sortedLeft,
        sortedRight,
        callback
      );

    });

  });
}


/* =========================
   兩組排名合併
   ========================= */

function mergeRanking(left, right, callback) {

  const resultList = [];

  let leftIndex = 0;
  let rightIndex = 0;


  function compareNext() {

    if (leftIndex >= left.length) {

      resultList.push(
        ...right.slice(rightIndex)
      );

      callback(resultList);

      return;
    }


    if (rightIndex >= right.length) {

      resultList.push(
        ...left.slice(leftIndex)
      );

      callback(resultList);

      return;
    }


    const a = left[leftIndex];
    const b = right[rightIndex];


    app.innerHTML = `
      <section class="screen">

        <h2 class="title">
          ROUND 3｜最終選考
        </h2>

        <p class="sub" style="text-align:center">
          どちらの顔が好き？
        </p>

        <div class="grid">

          ${card(a)}

          ${card(b)}

        </div>

      </section>
    `;


    window.pick = function(id) {

      if (id === a.id) {

        resultList.push(a);

        leftIndex++;

      } else if (id === b.id) {

        resultList.push(b);

        rightIndex++;

      } else {

        return;
      }

      compareNext();
    };
  }


  compareNext();
}


/* =========================
   結果
   ========================= */

function result(list) {

  const top9 = list.slice(0, 9);

  app.innerHTML = `
    <section class="screen">

      <h2 class="title">
        20代、30代俳優好き顔9選
      </h2>

      <p class="sub" style="text-align:center">
        YOUR TOP 9
      </p>

      <div class="result">

        ${top9.map((person, index) => `
          <div>
            <img src="${person.img}">
            <div>
              ${index + 1}｜${person.name}
            </div>
          </div>
        `).join("")}

      </div>

      <div style="text-align:center">

        <button
          class="btn"
          onclick="home()"
        >
          もう一回やる
        </button>

      </div>

    </section>
  `;
}


/* =========================
   啟動
   ========================= */

home();
