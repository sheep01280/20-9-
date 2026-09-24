const people = [
  { id: 0, name: "三浦翔平", img: "三浦翔平.jpg" },
  { id: 1, name: "中村倫也", img: "中村倫也.jpg" },
  { id: 2, name: "千葉雄大", img: "千葉雄大.jpg" },
  { id: 3, name: "吉沢亮", img: "吉沢亮.jpg" },
  { id: 4, name: "坂口健太郎", img: "坂口健太郎.jpg" },
  { id: 5, name: "山田裕貴", img: "山田裕貴.jpeg" },
  { id: 6, name: "杉野遥亮", img: "杉野遥亮.jpg" },
  { id: 7, name: "松坂桃李", img: "松坂桃李.jpg" },
  { id: 8, name: "横浜流星", img: "横浜流星.webp" },
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
  { id: 20, name: "高杉真宙", img: "高杉真宙.webp" }
];

const app = document.querySelector("#app");

let groups = [];
let survivors = [];
let picked = [];


/* =========================
   共通
   ========================= */

const shuffle = array => {
  return [...array].sort(() => Math.random() - 0.5);
};


/* =========================
   候選人卡片
   ========================= */

const card = person => `
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


/* =========================
   開始
   ========================= */

function start() {
  groups = [];
  survivors = [];
  picked = [];

  const shuffled = shuffle(people);

  while (shuffled.length > 0) {
    groups.push(shuffled.splice(0, 4));
  }

  pre(0);
}


/* =========================
   首頁
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
   ROUND 1｜予選
   ========================= */

function pre(round) {

  // 第一關全部結束
  if (round >= groups.length) {
    secondRound(0, shuffle(survivors));
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

window.pick = function (id) {

  const element = document.querySelector("#p" + id);

  if (!element) return;

  if (picked.includes(id)) {

    picked = picked.filter(value => value !== id);

    element.classList.remove("selected");

  } else if (picked.length < 3) {

    picked.push(id);

    element.classList.add("selected");
  }
};


/* =========================
   ROUND 1 下一組
   ========================= */

function nextPre(round) {

  const group = groups[round];

  const selectedPeople = group.filter(person =>
    picked.includes(person.id)
  );

  survivors.push(...selectedPeople);

  pre(round + 1);
}


/* =========================
   ROUND 2｜本選
   ========================= */

function secondRound(index, pool) {

  // 沒有人或只剩一人
  if (pool.length < 2) {
    finalRound(shuffle(pool));
    return;
  }

  // 已經跑完所有候選
  if (index >= pool.length) {
    finalRound(shuffle(pool));
    return;
  }

  const group = pool.slice(index, index + 4);

  // 如果最後只剩一人
  if (group.length < 2) {
    finalRound(shuffle(pool));
    return;
  }

  let firstId = null;
  let secondId = null;

  app.innerHTML = `
    <section class="screen">

      <h2 class="title">
        ROUND 2｜本選
      </h2>

      <p class="sub" style="text-align:center">
        第1位と第2位を選んでください
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


  /*
   * ROUND 2 專用選擇
   */

  window.pick = function (id) {

    const element = document.querySelector("#p" + id);

    if (!element) return;


    // 第一次選擇
    if (firstId === null) {

      firstId = id;

      element.classList.add("selected");

    }

    // 點擊同一個第一名 → 取消
    else if (id === firstId) {

      firstId = null;

      element.classList.remove("selected");

    }

    // 第二次選擇
    else if (secondId === null) {

      secondId = id;

      element.classList.add("selected");

    }

    // 點擊同一個第二名 → 取消
    else if (id === secondId) {

      secondId = null;

      element.classList.remove("selected");

    }

    // 已經有兩人，再選其他人
    else {

      const oldSecond =
        document.querySelector("#p" + secondId);

      if (oldSecond) {
        oldSecond.classList.remove("selected");
      }

      secondId = id;

      element.classList.add("selected");
    }


    const confirmButton =
      document.querySelector("#ok");


    // 兩個人都選好
    if (firstId !== null && secondId !== null) {

      confirmButton.disabled = false;

      confirmButton.onclick = function () {

        const firstPerson =
          group.find(person => person.id === firstId);

        const secondPerson =
          group.find(person => person.id === secondId);

        const remaining =
          pool.slice(index + 4);

        /*
         * 保留第1、第2名，
         * 其他候選人繼續進下一輪
         */

        const nextPool = shuffle([
          firstPerson,
          secondPerson,
          ...remaining
        ]);

        secondRound(0, nextPool);
      };

    } else {

      confirmButton.disabled = true;
      confirmButton.onclick = null;
    }
  };
}


/* =========================
   FINAL｜一対一
   ========================= */

function finalRound(pool) {

  if (pool.length === 0) {
    result([]);
    return;
  }

  if (pool.length === 1) {
    result(pool);
    return;
  }

  const winners = [];

  let index = 0;


  function duel() {

    // 已經選出 9 人
    if (winners.length >= 9) {

      result(winners.slice(0, 9));

      return;
    }


    // 沒有更多候選
    if (index >= pool.length) {

      result(winners.slice(0, 9));

      return;
    }


    const current = pool[index];

    const next = pool[index + 1];


    // 只剩一人
    if (!next) {

      winners.push(current);

      result(winners.slice(0, 9));

      return;
    }


    const candidates = shuffle([
      current,
      next
    ]);


    app.innerHTML = `
      <section class="screen">

        <h2 class="title">
          FINAL｜一対一
        </h2>

        <p class="sub" style="text-align:center">
          どちらの顔が好き？
        </p>

        <div class="grid">
          ${candidates.map(card).join("")}
        </div>

      </section>
    `;


    window.pick = function (id) {

      const winner =
        candidates.find(person => person.id === id);

      if (!winner) return;

      winners.push(winner);

      index += 2;

      duel();
    };
  }


  duel();
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
