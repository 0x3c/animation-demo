let itemWidth, itemHeight, maxH, maxW, canvas;
const list = [];
let paused = false;
const distancePF = 5;

const initPos = list => {
  list.forEach(ele => {
    ele.style.top = parseInt(Math.random() * maxH, 10) + "px";
    ele.style.left = parseInt(Math.random() * maxW, 10) + "px";
  });
};

const initStyle = () => {
  const vw = document.body.offsetWidth;
  const vh = document.body.offsetHeight;
  itemWidth = itemHeight = parseInt(0.03 * vw);
  maxH = vh - itemHeight;
  maxW = vw - itemWidth;
};

const initEvents = () => {
  const toggleEle = document.getElementById("toggle");
  const addEle = document.getElementById("add10");
  const sub10 = document.getElementById("sub10");
  toggleEle.onclick = () => {
    paused = !paused;
    toggleEle.innerText = paused ? "start" : "pause";
    !paused && requestAnimationFrame(runAnim);
  };
  addEle.onclick = () => {
    createEle(10);
  };
  sub10.onclick = () => {
    if (list.length < 10) return;
    const scrappedlist = list.splice(list.length - 1 - 10, 10);
    scrappedlist.map(ele => ele.remove());
  };
};

const createEle = num => {
  const fragment = document.createDocumentFragment();
  const canvas = document.getElementById("canvas");
  const tmpList = [];
  for (let i = 0; i < num; i++) {
    const ele = document.createElement("div");
    ele.classList.add("box", "mover", Math.random() > 0.5 ? "up" : "down");
    tmpList.push(ele);
    fragment.appendChild(ele);
  }
  initPos(tmpList);
  canvas.appendChild(fragment);
  list.push(...tmpList);
};

const runAnim = timestamp => {
  if (paused) {
    return;
  }
  list.forEach(ele => {
    let top = +ele.style.top.slice(0, ele.style.top.indexOf("px")) || 0;
    ele.classList.contains("up") ? (top -= distancePF) : (top += distancePF);
    if (top < 0) top = 0;
    if (top > maxH) top = maxH;
    if (top === 0) {
      ele.classList.add("down");
      ele.classList.remove("up");
    }
    if (top === maxH) {
      ele.classList.remove("down");
      ele.classList.add("up");
    }
    ele.style.top = top + "px";
  });
  requestAnimationFrame(runAnim);
};

const app = () => {
  initStyle();
  initEvents();
  list.push(...document.querySelectorAll(".box"));
  initPos(list);
  requestAnimationFrame(runAnim);
};

app();
