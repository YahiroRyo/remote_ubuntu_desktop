import "./style.css";
import axios from "axios";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `<p class="connecting">接続中・・・</p>`;

try {
  const res = axios.get("http://localhost:8080/web");
} catch(e) {

}