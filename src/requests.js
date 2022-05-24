export const Requests = () => {
  const apiUrl = "https://frontappapi.dock7.66bit.ru/api";
  /* Все основные скрипты и запросы */

  const callEndpoint = async ({ path, method }) => {
    /* console.log(apiUrl + path); */
    /* Основной шлюз запроса */
    return await (
      await fetch(`${apiUrl}${path}`, {
        method,
      }).then((response) => {
        /* Обработка возможных ошибок */
        if (response.status > 400 && response.status < 600) {
          alert(
            "Извините, произошла неизвестная ошибка. Пожалуйста, перезагрузите страницу"
          );
        }
        return response;
      })
    ).json(); /* Данные возвращаются в json формате */
  };

  const getNews = async (page, count) => {
    /* Получение новостей */
    const qs = `page=${page}&count=${count}`;

    return await callEndpoint({ path: `/news/get?${qs}`, method: "GET" });
  };

  const getTheme = async (name) => {
    /* Получение темы */
    const qs = `name=${name}`;

    return await callEndpoint({ path: `/theme/get?${qs}`, method: "GET" });
  };

  return { getNews, getTheme };
};
