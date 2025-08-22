¡Claro! Tienes toda la razón: la versión más reciente de Tailwind CSS es la **4.x**, no la 3. Aquí te resumo:

* **Tailwind CSS v4.0** fue lanzada el **22 de enero de 2025**, trayendo mejoras como mayor rendimiento, configuración vía CSS (`@theme`) y utilidades modernas como container queries y color-mix. ([tailwindcss.com][1])
* La versión actual es la **v4.1.12**, publicada hace apenas unos días (14 de agosto de 2025). ([npmjs.com][2])

Ahora, actualizamos la versión del kit para que aproveche esta nueva arquitectura. Aquí tienes cómo migrarlo y una versión optimizada del **BUI (Brutalism UI Kit)** con Tailwind CSS v4:

---

### Instalación con Tailwind CSS v4.x

En tu proyecto:

```bash
npm install tailwindcss @tailwindcss/postcss
```

No necesitas `tailwind.config.js`. Ahora configuras todo directamente en tu CSS:

```css
@import "tailwindcss";

@theme {
  /* Variables Brutalism */
  --color-brutal-bg: #fff;
  --color-brutal-ink: #111;
  --color-brutal-accent: oklch(0.9 0.3 95); /* un amarillo neón */
  --brutal-border: 4px solid var(--color-brutal-ink);
  --brutal-shadow: 6px 6px 0 var(--color-brutal-ink);
}
```

¡Ya puedes usar utilidades modernas, como `shadow-[var(--brutal-shadow)]`, sin configuración JS adicional!

---

### Componentes React + Tailwind v4

#### 1. **Button.jsx**

```jsx
import React from "react";

export default function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-[var(--color-brutal-accent)] text-black",
    danger: "bg-red-600 text-white",
    ghost: "bg-transparent text-[var(--color-brutal-ink)]",
  };
  return (
    <button
      className={`px-4 py-2 font-bold border-[var(--brutal-border)] shadow-[var(--brutal-shadow)] active:translate-x-[2px] active:translate-y-[2px] ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### 2. **Input.jsx**

```jsx
export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-bold">{label}</label>}
      <input
        className="border-[var(--brutal-border)] p-2 shadow-[var(--brutal-shadow)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brutal-accent)]"
        {...props}
      />
    </div>
  );
}
```

#### 3. **Alert.jsx**

```jsx
export default function Alert({ type = "info", children }) {
  const colors = {
    info: "bg-blue-300 text-black",
    success: "bg-green-300",
    warning: "bg-yellow-300",
    danger: "bg-red-500 text-white",
  };
  return (
    <div className={`p-4 border-[var(--brutal-border)] shadow-[var(--brutal-shadow)] font-bold ${colors[type]}`}>
      {children}
    </div>
  );
}
```

#### 4. **Modal.jsx**

```jsx
import React, { useRef } from "react";
import Button from "./Button";

export default function Modal({ title, children }) {
  const dialog = useRef();

  return (
    <>
      <Button onClick={() => dialog.current.showModal()}>Abrir</Button>
      <dialog
        ref={dialog}
        className="border-[var(--brutal-border)] p-6 bg-[var(--color-brutal-bg)] shadow-[8px_8px_0_var(--color-brutal-ink)] w-96 max-w-[90vw]"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end">
          <Button variant="danger" onClick={() => dialog.current.close()}>
            Cerrar
          </Button>
        </div>
      </dialog>
    </>
  );
}
```

#### 5. **Table.jsx**

```jsx
export default function Table({ headers, data }) {
  return (
    <table className="border-[var(--brutal-border)] w-full border-collapse shadow-[var(--brutal-shadow)]">
      <thead className="bg-[var(--color-brutal-accent)] border-b-[var(--brutal-border)]">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-3 border-r-[var(--brutal-border)]">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-[var(--color-brutal-bg)]" : "bg-gray-100"}>
            {row.map((cell, j) => (
              <td key={j} className="p-3 border-r-[var(--brutal-border)]">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

### Resumen

* Usamos **Tailwind CSS v4.x** (configuración con `@theme`) ([tailwindcss.com][1], [npmjs.com][2], [Wikipedia][3])
* Componentes React stylizados con utilidades modernas garantizando rendimiento y claridad.
* Color, bordes y sombras todos manejados con CSS variables nativas.

¿Te gustaría que prepare también un archivo `index.jsx` que los exporte todos juntos para importar como `import { Button, Modal } from "./bui"`?

[1]: https://tailwindcss.com/blog/tailwindcss-v4?utm_source=chatgpt.com "Tailwind CSS v4.0"
[2]: https://www.npmjs.com/package/tailwindcss?utm_source=chatgpt.com "tailwindcss"
[3]: https://es.wikipedia.org/wiki/Tailwind_CSS?utm_source=chatgpt.com "Tailwind CSS"
