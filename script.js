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

  if (group.length < 2) {

    finalists.push(...group);

    startFinalRound(finalists);

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


  window.pick = function(id) {

    const el = document.querySelector("#p" + id);

    if (!el) return;


    if (firstId === null) {

      firstId = id;

      el.classList.add("selected");

    } else if (id === firstId) {

      firstId = null;

      el.classList.remove("selected");

    } else if (secondId === null) {

      secondId = id;

      el.classList.add("selected");

    } else if (id === secondId) {

      secondId = null;

      el.classList.remove("selected");

    } else {

      const old =
        document.querySelector("#p" + secondId);

      if (old) {
        old.classList.remove("selected");
      }

      secondId = id;

      el.classList.add("selected");
    }


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

        secondRound(index + 4);
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
 * 這裡就是你說的：
 *
 * A vs B → A
 * C vs D → D
 * E vs F → F
 * G vs H → H
 * I vs J → I
 *
 * 接著：
 *
 * A vs D
 * F vs H
 * ...
 *
 * 勝者繼續在上位組比。
 *
 * 敗者也會進入自己的排名組。
 *
 * 最後只取 TOP 9。
 */

function startFinalRound(pool) {

  const shuffled = shuffle(pool);

  rankingTournament(shuffled, []);
}


/* =========================
   排名賽
   ========================= */

function rankingTournament(pool, ranking) {

  /*
   * 已經排出9人
   */
  if (ranking.length >= 9) {

    result(ranking.slice(0, 9));

    return;
  }


  /*
   * 剩下的人少於等於9人
   */
  if (pool.length <= 9 - ranking.length) {

    ranking.push(...pool);

    result(ranking.slice(0, 9));

    return;
  }


  /*
   * 第一輪兩兩對決
   */

  const winners = [];
  const losers = [];

  let index = 0;

  function nextMatch() {

    if (index >= pool.length) {

      /*
       * 第一輪完成
       *
       * 勝者組繼續爭前面的名次
       * 敗者組進入後面的名次
       */

      continueWinners(winners, losers);

      return;
    }


    const a = pool[index];

    const b = pool[index + 1];


    /*
     * 奇數最後一人輪空
     */

    if (!b) {

      winners.push(a);

      index += 1;

      nextMatch();

      return;
    }


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

        winners.push(a);
        losers.push(b);

      } else {

        winners.push(b);
        losers.push(a);
      }

      index += 2;

      nextMatch();
    };
  }


  nextMatch();
}


/* =========================
   勝者組繼續比
   ========================= */

function continueWinners(winners, losers) {

  /*
   * 如果勝者組已經不足以繼續
   */
  if (winners.length <= 1) {

    const ranking = [
      ...winners,
      ...losers
    ];

    result(ranking.slice(0, 9));

    return;
  }


  /*
   * 勝者組再次兩兩配對
   *
   * 例如：
   *
   * A D F H I
   *
   * → A vs D
   * → F vs H
   * → I 輪空
   */

  const nextWinners = [];
  const nextLosers = [];

  let index = 0;


  function nextMatch() {

    if (index >= winners.length) {

      /*
       * 把勝者組繼續往上比
       */
      continueWinners(nextWinners, [
        ...nextLosers,
        ...losers
      ]);

      return;
    }


    const a = winners[index];

    const b = winners[index + 1];


    if (!b) {

      nextWinners.push(a);

      index += 1;

      nextMatch();

      return;
    }


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

        nextWinners.push(a);
        nextLosers.push(b);

      } else {

        nextWinners.push(b);
        nextLosers.push(a);
      }

      index += 2;

      nextMatch();
    };
  }


  nextMatch();
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
