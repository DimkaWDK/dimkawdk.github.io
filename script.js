$(document).ready(function() {
  const steamApiKey = "6569325A8A038A851BB8CD5870282C04";
  const csmoneyApiKey = ""; // Здесь нужно добавить API-ключ для CS.Money, если он есть

  const itemNames = ["AK-47 | Redline", "M4A1-S | Hyper Beast", "AWP | Asiimov"];

  itemNames.forEach(function(itemName) {
    // Формируем URL для получения цены предмета на Steam
    const steamUrl = `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=AK-47%20%7C%20Redline%20%28Field-Tested%29`;

    // Получаем цену предмета на Steam
    $.getJSON(steamUrl, {jsonp: "callback"}, function(steamData) {
      const itemSteamPrice = steamData.lowest_price;

      // Если есть API-ключ для CS.Money, получаем цену предмета на нем
      if (csmoneyApiKey) {
        // Формируем URL для получения цены предмета на CS.Money
        const csMoneyUrl = `https://cs.money/prices/api/v1/get-by-item?item=${encodeURIComponent(itemName)}&key=${csmoneyApiKey}`;

        $.getJSON(csMoneyUrl, function(csMoneyData) {
          const itemCsMoneyPrice = csMoneyData.price;

          // Создаем новую строку в таблице с полученными данными
          const newRow = $("<tr></tr>");
          const nameCell = $("<td></td>").text(itemName);
          const steamCell = $("<td></td>").text(itemSteamPrice);
          const csMoneyCell = $("<td></td>").text(itemCsMoneyPrice);

          newRow.append(nameCell, steamCell, csMoneyCell);
          $("#item-table").append(newRow);
        });
      } else { // Если нет API-ключа для CS.Money, создаем строку только с ценой на Steam
        const newRow = $("<tr></tr>");
        const nameCell = $("<td></td>").text(itemName);
        const steamCell = $("<td></td>").text(itemSteamPrice);

        newRow.append(nameCell, steamCell);
        $("#item-table").append(newRow);
      }
    });
  });
});
