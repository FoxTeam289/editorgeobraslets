/** @format */

export const addToBag = async () => {
  const btn = document.querySelector("[data-add-to-bag]");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const inputs = [...document.querySelectorAll("[data-input]")].filter(
      (input) => input.checked,
    );
    const coords = {
      n: document.querySelector("[data-coord-n]").textContent,
      e: document.querySelector("[data-coord-e]").textContent,
    };
    const text = document.querySelector("[data-input-text]");

    const data = {
      total: Number(document.querySelector("[data-total]").textContent),
    };

    inputs.forEach((input) => {
      const el = input.closest("[data-el]");
      const name = el.dataset.el;

      data[name] = input.value;
    });

    if (!coords.n || !coords.e) return;
    data["Координаты"] = `${coords.n} - ${coords.e}`;

    text.value && (data["Надпись внутри"] = text.value);

    const encryptedData = await encryptData(JSON.stringify(data));
    const newUrl = `https://astrostori.ru/geo-editor?data=${encodeURIComponent(encryptedData)}`;
    window.location.href = newUrl;
  });
};

const encryptData = async (data) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("h2g5f8a1b9c3e7d4"), // Секретный ключ
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(data),
  );
  return `${btoa(String.fromCharCode(...new Uint8Array(iv)))}.${btoa(String.fromCharCode(...new Uint8Array(encrypted)))}`;
};
