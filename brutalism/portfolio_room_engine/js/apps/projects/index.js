import { data } from "./data.js";
//console.log(data);
//const projects = data.portfolio.projects;
//console.log(projects);

export const getProjectYear = (excelDate) =>
  new Date((excelDate - (25567 + 1)) * 86400 * 1000).getFullYear();

function formatYear(date) {
  if (!date) return 0; // 👈 importante para sort
  if (typeof date === "number") return getProjectYear(date);
  return new Date(date).getFullYear() || 0;
}

function normalizeProject(p, index) {
  return {
    id: index + 1,
    title: p.title,
    category: p.category || "web",
    date: getProjectYear(p.date) || 2025,
    client: p.client || "Personal",
    description: p.description || "",
    stack: p.stack || [],
    features: p.features || [],
    architecture: p.architecture || {},
    cover: p.thumbnail || "",
    images: p.screenshots || [],
    liveUrl: p.liveUrl || "",
    githubUrl: p.githubUrl || "",
    youtubeUrl: p.youtubeUrl || "",
    isFeatured: p.isFeatured || false,
  };
}
const projects = data.portfolio.projects.map(normalizeProject);

function getProjectData() {
  const featured = projects.filter((p) => p.isFeatured);
  const rest = projects.filter((p) => !p.isFeatured);

  return {
    featured,
    rest,
    all: projects,
  };
}

function getFeaturedHTML(featured) {
  return `
    <section class="space-y-6">

      <h2 class="text-xl font-semibold">⭐ Featured Projects</h2>

      <div class="grid md:grid-cols-2 gap-6">

        ${featured
          .map((p) => {
            const cover = p.cover;

            return `
              <div 
                class="project-item group relative rounded-xl overflow-hidden cursor-pointer"
                data-id="${p.id}"
              >

                <!-- IMAGE -->
                <div class="h-52 bg-neutral-800 overflow-hidden">
                  ${
                    cover
                      ? `<img src="${cover}" 
                           class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />`
                      : `<div class="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                           No Image
                         </div>`
                  }
                </div>

                <!-- OVERLAY -->
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">

                  <h3 class="text-lg font-semibold">
                    ${p.title}
                  </h3>

                  <p class="text-xs text-neutral-300 mt-1">
                    ${p.category} • ${p.client || "Personal"}
                  </p>

                  <p class="text-[11px] text-neutral-400 mt-2 line-clamp-2">
                    ${p.description || ""}
                  </p>

                  <div class="flex flex-wrap gap-1 mt-3">
                    ${(p.stack || [])
                      .slice(0, 4)
                      .map(
                        (t) => `
                        <span class="text-[10px] bg-neutral-800 px-2 py-1 rounded">
                          ${t}
                        </span>
                      `,
                      )
                      .join("")}
                  </div>

                </div>

              </div>
            `;
          })
          .join("")}

      </div>

    </section>
  `;
}

function getAllProjectsHTML(projects) {
  return `
    <section class="mt-10 space-y-4">

      <h2 class="text-xl font-semibold">📁 All Projects</h2>

      <div id="projectFilters" class="flex gap-2 text-xs">
        <button data-filter="all" class="filter-btn active">All</button>
        <button data-filter="web" class="filter-btn">Web</button>
        <button data-filter="mobile" class="filter-btn">Mobile</button>
        <button data-filter="enterprise" class="filter-btn">Enterprise</button>
      </div>

      <div id="projectList" class="flex flex-col divide-y divide-neutral-800">

       ${[...projects] // ← importante clonar
         .sort((a, b) => {
           return b.date - a.date;
         })
         .map(
           (p) => `
      <div class="project-item flex justify-between items-center py-3 px-2 hover:bg-neutral-900 transition"
        data-id="${p.id}"
        data-category="${p.category}">

        <div>
          <p class="text-sm">${p.title}</p>
          <p class="text-xs text-neutral-500">
            ${p.category} • ${p.client || "Personal"}
          </p>
        </div>

        <div class="flex gap-3 text-xs text-neutral-500">
          <span>${p.date}</span>
          ${
            p.liveUrl
              ? `<a href="${p.liveUrl}" target="_blank" class="text-blue-400">Live</a>`
              : ""
          }
        </div>

      </div>
    `,
         )
         .join("")}

      </div>

    </section>
  `;
}

function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".project-item");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // UI active state
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

function renderProjectDetail(projectId) {
  const project = projects.find((p) => p.id == projectId);

  if (!project) return;

  console.log(project);

  const html = `
    <section class="space-y-10 p-6 text-sm text-neutral-200">

<button data-action="back-projects" class="mb-4 text-xs text-neutral-400">
  ← Back to Projects
</button>

      <!-- HEADER -->
      <header class="space-y-3">

        <h1 class="text-3xl font-bold">
          ${project.title}
        </h1>

        <p class="text-neutral-400 max-w-2xl text-sm">
          ${project.description || "No description"}
        </p>

        <div class="flex flex-wrap gap-2 pt-2">
          ${(project.stack || [])
            .map(
              (t) => `
            <span class="tech">${t}</span>
          `,
            )
            .join("")}
        </div>

        <div class="text-xs text-neutral-500 pt-2">
          ${project.category} • ${project.client || "Personal"} • ${project.date}
        </div>

      </header>

      <!-- GALLERY -->
      <div class="project-gallery grid grid-cols-2 gap-4">
        ${(project.images || [])
          .map(
            (img) => `
          <img src="${img}" class="rounded-lg" />
        `,
          )
          .join("")}
      </div>

      <!-- FEATURES -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Key Features</h2>

        <div class="grid md:grid-cols-2 gap-4 text-sm text-neutral-300">
          ${(project.features || [])
            .map(
              (f) => `
            <div class="feature">${f}</div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- ARCHITECTURE -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Architecture</h2>

        <pre class="code-block"><code>
Frontend: ${project.architecture?.frontend || "-"}
Backend: ${project.architecture?.backend || "-"}
Database: ${project.architecture?.database || "-"}
Infrastructure: ${project.architecture?.infra || "-"}
        </code></pre>
      </div>

      <!-- ACTIONS -->
      <div class="flex gap-4 pt-4 flex-wrap">

        ${
          project.liveUrl
            ? `
          <a href="${project.liveUrl}" target="_blank" class="project-btn">
            Live Demo
          </a>
        `
            : ""
        }

        ${
          project.githubUrl
            ? `
          <a href="${project.githubUrl}" target="_blank" class="project-btn-secondary">
            Source Code
          </a>
        `
            : ""
        }

        ${
          project.youtubeUrl
            ? `
          <a href="${project.youtubeUrl}" target="_blank" class="project-btn-secondary">
            Watch Demo
          </a>
        `
            : ""
        }

      </div>

    </section>
  `;

  document.getElementById("editorContent").innerHTML = html;
}

function renderProjectsView() {
  const { featured, all } = getProjectData();
  console.log("featured", featured);
  console.log("all", all);
  const html = `
    <div class="p-6 text-sm text-neutral-200">

      ${getFeaturedHTML(featured)}

      ${getAllProjectsHTML(all)}

    </div>
  `;

  document.getElementById("editorContent").innerHTML = html;

  initProjectFilters();
}

export function initProjects() {
  renderProjectsView();
}

document.addEventListener("click", (e) => {
  const backBtn = e.target.closest("[data-action='back-projects']");
  if (backBtn) {
    renderProjectsView();
    return;
  }

  const file = e.target.closest("[data-file]");
  if (file) {
    if (file.dataset.file === "projects") {
      renderProjectsView();
    }
  }

  const project = e.target.closest(".project-item");
  if (project) {
    const id = project.dataset.id;
    renderProjectDetail(id);
  }
});

/* document.addEventListener("click", (e) => {
  const item = e.target.closest("[data-file]");
  if (!item) return;

  const file = item.dataset.file;
  console.log("clicked:", file);

  switch (file) {
    case "projects":
      renderProjectsView();
      break;

    case "experience":
      console.log("render experience");
      break;

    // future views aquí
  }
});
 */
