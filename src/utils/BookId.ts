export default function BookId() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const fullNumericDate = `${yyyy}${mm}${dd}${hh}${min}${ss}`;
  console.log(fullNumericDate); // ➤ 20250517121545
 const id = "SS" + fullNumericDate;
  return id;
}
