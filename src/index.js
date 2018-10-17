let boardState = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

// 상태로부터 화면을 그리는 함수
function drawBoard() {
  //  board에 있는 row를 하나씩 본다
  document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
    // row아래의 col을 하나씩 본다
    rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
      if (boardState[rowIndex][colIndex] === 1) {
        colEl.classList.add("checked");
      } else {
        colEl.classList.remove("checked");
      }
    });
  });
  if (bingo(boardState)) {
    document.querySelector(".result").textContent = "Bingo!";
    document.querySelector(".reset").classList.add("show");
  } else {
    document.querySelector(".result").textContent = "";
    document.querySelector(".reset").classList.remove("show");
  }
}

// 빙고인지 아닌지 판별하는 부분
function bingo(arr) {
  // 가로줄 확인
  // 한줄 한줄 보는 작업
  for (let i = 0; i < 5; i++) {
    //내가 지금까지 본 것이 모두 X 표시이면 true, 아니면 false
    let checked = true;
    // 한칸 한칸 보는 작업
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] === 0) {
        checked = false;
      }
    }
    // 한 줄을 다 봤는데도 checked가 true이면 빙고!
    if (checked) {
      return true;
    }
  }
  // 세로줄 확인
  for (let i = 0; i < 5; i++) {
    //내가 지금까지 본 것이 모두 X 표시이면 true, 아니면 false
    let checked = true;
    // 한칸 한칸 보는 작업
    for (let j = 0; j < 5; j++) {
      if (arr[j][i] === 0) {
        checked = false;
      }
    }
    // 한 줄을 다 봤는데도 checked가 true이면 빙고!
    if (checked) {
      return true;
    }
  }
  // 대각선 확인
  let checked = true;
  for (let i = 0; i < 5; i++) {
    if (arr[i][i] === 0) {
      checked = false;
    }
  }
  if (checked) {
    return true;
  }
  // 반대쪽 대각선 확인
  let checked2 = true;
  for (let i = 0; i < 5; i++) {
    if (arr[i][4 - i] === 0) {
      checked2 = false;
    }
  }
  if (checked2) {
    return true;
  }
  return false;
}

// 클릭이 되었을 때 상태를 변경시켜주는 부분[한번만 해줘도 되는 부분]
document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
  // row아래의 col을 하나씩 본다
  rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
    colEl.addEventListener("click", e => {
      if (!bingo(boardState)) {
        boardState[rowIndex][colIndex] = 1;
        drawBoard();
      }
    });
  });
});

// 다시 시작 버튼을 만든 후, 클릭이벤트가 일어났을 때 화면을 다시 그려줌
document.querySelector(".reset").addEventListener("click", e => {
  boardState = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];
  drawBoard();
});

drawBoard();
