import { useState, useEffect } from "react";
import "./App.css";
import { Requests } from "./requests";
import PullToRefresh from "react-simple-pull-to-refresh";

function App() {
  const { getNews } = Requests();
  const [news, setNews] = useState([]);
  const { getTheme } = Requests();
  const [theme, setTheme] = useState({});
  const [page, setPage] = useState("home");
  const [numberPage, setNumberPage] = useState(1);
  const [auto, setAuto] = useState(false);

  const themes = (keyTheme) => {
    /* Смена тем */
    localStorage.setItem(
      "theme",
      keyTheme
    ); /* Сохранить тему при переключении */
    getTheme(keyTheme).then((data) => {
      const styles = {
        /* Заполнение стилей полученными темами */
        main: {
          backgroundColor: data.secondColor,
          color: data.textColor,
        },
        header: {
          backgroundColor: data.mainColor,
          color: data.textColor,
        },
        active: {
          fill: data.textColor,
        },
        nonActive: {
          fill: "grey",
        },
      };
      setTheme(styles);
    });
  };

  useEffect(() => {
    /* Получаю новости и сохраняю в переменную */
    getNews(numberPage, "10").then((data) => {
      setNews([...news, ...data]);
    });
  }, [numberPage]);

  useEffect(() => {
    let theme = localStorage.getItem("theme"); /* Получаем тему */
    if (!theme) {
      /* Если темы нет, назначаю светлую по умолчанию */
      localStorage.setItem("theme", "light");
      theme = localStorage.getItem("theme");
    }
    themes(theme);
  }, []);

  const renderNews = (variable) => {
    /* Рендер полученных новостей */
    if (variable.length > 0 && theme) {
      return variable.map((one_news, id) => (
        <div style={theme.main} className="one-news" key={id}>
          <div className="title">{one_news.title}</div>
          <div className="content">{one_news.content}</div>
          <div className="news-attr">
            <div className="createdAt">
              Статья создана:
              <br />
              {one_news.createdAt.substr(0, 10)} в{" "}
              {one_news.createdAt.substr(11, 8)}
            </div>
            <div className="updatedAt">
              Статья обновлена:
              <br />
              {one_news.updatedAt.substr(0, 10)} в{" "}
              {one_news.updatedAt.substr(11, 8)}
            </div>
          </div>
        </div>
      ));
    }
  };

  const renderThemesBtns = () => {
    /* Рендер страницы выбора тем */
    return (
      <div className="themes" style={theme.main}>
        <div className="themes__btns">
          <button className="btn theme1" onClick={() => themes("light")}>
            Светлая тема
          </button>
          <button className="btn theme2" onClick={() => themes("blue")}>
            Синяя тема
          </button>
          <button className="btn theme3" onClick={() => themes("dark")}>
            Тёмная тема
          </button>
        </div>
      </div>
    );
  };

  const onRefresh = () => {
    /* Обновление контента по скроллу или свайпу */
    return new Promise((res) => {
      setTimeout(() => {
        if (Number(numberPage) < 102) {
          setNumberPage(String(Number(numberPage) + 1));
          res("");
        }
      }, 50);
    });
  };

  return (
    <div className="App">
      <header className="header" style={theme.header}>
        {page === "home" ? "Новости" : "Темы"}
      </header>
      {page === "home" ? (
        <PullToRefresh
          onRefresh={onRefresh}
          canFetchMore={auto}
          onFetchMore={onRefresh}
          fetchMoreThreshold={100}
        >
          <main className="main">
            {renderNews(news)}
            <div className="btn-controls">
              <button
                className="btn-control next-page"
                onClick={() => onRefresh()}
              >
                Следующие новости
              </button>

              <button
                className="btn-control btn-auto"
                onClick={() => setAuto(true)}
              >
                Автоматический режим
              </button>
            </div>
          </main>
        </PullToRefresh>
      ) : (
        renderThemesBtns()
      )}
      <footer className="footer" style={theme.header}>
        <div className="footer__btn">
          <svg
            width="30"
            height="30"
            viewBox="0 0 512.000000 512.000000"
            style={page === "home" ? theme.active : theme.nonActive}
            className="footer__btn"
            onClick={() => setPage("home")}
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M512 5105 c-115 -25 -207 -78 -303 -174 -93 -93 -142 -171 -181 -286
                l-23 -70 -3 -1997 c-3 -2231 -8 -2072 69 -2228 82 -165 252 -297 434 -335 60
                -13 349 -15 2036 -15 1369 0 1983 3 2025 11 260 47 488 262 539 508 13 62 15
                335 13 2079 l-3 2007 -27 73 c-38 105 -83 176 -158 252 -76 75 -147 120 -252
                158 l-73 27 -2015 2 c-1674 1 -2026 -1 -2078 -12z m4098 -336 c70 -33 126 -89
                159 -159 l26 -55 0 -1990 0 -1990 -28 -56 c-33 -69 -99 -132 -175 -167 l-57
                -27 -1977 -3 -1977 -2 -58 21 c-78 30 -152 104 -182 182 l-21 58 2 1977 3
                1977 28 60 c30 64 93 137 142 162 80 43 17 42 2085 40 l1975 -2 55 -26z"
              />
              <path
                d="M1215 3826 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 26
                -8 449 -10 1354 -8 1312 3 1317 3 1344 24 53 39 69 71 69 134 0 63 -16 95 -69
                134 -27 21 -31 21 -1354 23 -1088 2 -1332 0 -1357 -11z"
              />
              <path
                d="M1215 2866 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 26
                -8 449 -10 1354 -8 1312 3 1317 3 1344 24 53 39 69 71 69 134 0 63 -16 95 -69
                134 -27 21 -31 21 -1354 23 -1088 2 -1332 0 -1357 -11z"
              />
              <path
                d="M1215 1906 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 26
                -8 449 -10 1354 -8 1312 3 1317 3 1344 24 53 39 69 71 69 134 0 63 -16 95 -69
                134 -27 21 -31 21 -1354 23 -1088 2 -1332 0 -1357 -11z"
              />
            </g>
          </svg>
        </div>
        <div className="footer__btn">
          <svg
            version="1.0"
            width="35"
            height="35"
            viewBox="0 0 1280.000000 1280.000000"
            preserveAspectRatio="xMidYMid meet"
            style={page === "themes" ? theme.active : theme.nonActive}
            onClick={() => setPage("themes")}
          >
            <g
              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M6135 11194 c-1192 -76 -2249 -543 -3088 -1364 -762 -745 -1247
                -1695 -1396 -2737 -38 -261 -46 -384 -45 -698 0 -443 38 -760 139 -1165 89
                -351 181 -602 350 -945 185 -376 364 -652 636 -980 118 -143 461 -481 616
                -608 711 -581 1539 -940 2440 -1057 312 -41 690 -50 798 -20 182 51 328 143
                434 275 130 161 191 350 177 555 -12 197 -68 325 -219 505 -67 80 -137 216
                -163 320 -25 96 -25 285 0 380 63 243 225 437 449 540 149 68 141 67 887 75
                371 4 686 10 700 13 14 4 70 13 125 22 536 84 1050 351 1447 752 324 327 539
                688 672 1133 108 360 133 810 70 1265 -186 1335 -1066 2512 -2379 3180 -582
                296 -1185 471 -1865 540 -147 15 -654 27 -785 19z m-840 -1094 c272 -86 474
                -296 547 -568 28 -109 28 -287 -1 -397 -74 -281 -295 -502 -576 -576 -114 -30
                -280 -30 -394 0 -277 73 -484 271 -571 546 -28 90 -38 267 -20 368 54 313 301
                570 614 642 94 22 312 14 401 -15z m2603 15 c315 -66 567 -325 622 -642 18
                -101 8 -278 -20 -368 -87 -275 -294 -473 -571 -546 -114 -30 -280 -30 -394 0
                -281 74 -502 295 -576 576 -30 112 -30 289 0 399 79 297 323 527 622 585 71
                14 242 12 317 -4z m-4308 -2126 c177 -28 313 -100 445 -233 133 -134 200 -272
                225 -464 32 -245 -61 -496 -247 -673 -98 -94 -201 -151 -340 -191 -102 -29
                -304 -31 -403 -4 -362 99 -600 408 -600 775 0 165 42 311 127 439 175 263 486
                401 793 351z m5958 -19 c348 -98 582 -408 582 -770 0 -165 -39 -297 -126 -433
                -250 -387 -770 -483 -1146 -210 -122 88 -238 250 -286 399 -88 271 -20 577
                175 785 123 130 271 213 438 245 96 19 269 11 363 -16z"
              />
            </g>
          </svg>
        </div>
      </footer>
    </div>
  );
}

export default App;
