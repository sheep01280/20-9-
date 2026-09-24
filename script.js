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

      <h1>30代俳優さん好き顔9選</h1>

      <div class="sub">
        日本俳優
      </div>

      <button class="btn" onclick="start()">
        START
      </button>

      <p class="note">
        21人の俳優さんから選べます
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
        30代俳優さん好き顔9選
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
