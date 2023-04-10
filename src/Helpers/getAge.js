export function getAge(PetsAge) {
  let now = new Date();
  const dateBorn = now - Date.parse(PetsAge);
  let date = new Date(dateBorn);
  let fullYear = date.getFullYear() - 1970;
  let fullMonth = date.getMonth();
  let year = "";
  let month = "";

  if (fullYear === 1 || fullYear % 10 === 1) {
    year = "год";
  } else {
    if (
      (fullYear >= 2) & (fullYear <= 4) ||
      (fullYear % 10 >= 2) & (fullYear % 10 <= 4)
    ) {
      year = "года";
    } else {
      if (fullYear === 0) {
        fullYear = "";
      } else {
        year = "лет";
      }
    }
  }

  if (fullMonth === 1) {
    month = "месяц";
  } else {
    if ((fullMonth >= 2) & (fullMonth <= 4)) {
      month = "месяца";
    } else {
      if (fullMonth === 0) {
        fullMonth = "";
      } else {
        month = "месяцев";
      }
    }
  }

  const Age = `${fullYear} ${year} ${fullMonth} ${month}`;
  return Age;
}
