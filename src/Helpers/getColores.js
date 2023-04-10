export function getColores() {
  const Colors = [
    "#00FF00",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#F4A460",
    "#FF00FF",
    "#EE82EE",
    "#FF7F50",
    "#FFA500",
    "#FF69B4",
    "#FA8072",
    "#00FA9A",
    "#7FFFD4",
    "#FFE4E1",
  ];

  return Colors[Math.floor(Math.random() * Colors.length)];
}
