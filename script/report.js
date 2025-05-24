document.addEventListener("DOMContentLoaded", () => {
  fetch("data/students.json")
    .then(res => res.json())
    .then(students => {
      renderTable(students);
      generateCharts(students);
      document.getElementById("report-filter").addEventListener("change", (e) => {
        const filtered = filterStudents(students, e.target.value);
        renderTable(filtered);
        generateCharts(filtered);
      });
    });
});

// Filter students based on selection
function filterStudents(students, criteria) {
  if (criteria === "all") return students;
  if (criteria === "high-progress") return students.filter(s => s.progress >= 80);
  if (criteria === "low-attendance") return students.filter(s => s.attendance < 50);
  return students;
}

function renderTable(students) {
  const tbody = document.querySelector("#report-table tbody");
  tbody.innerHTML = "";

  students.forEach(student => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
  <td>${student.name}</td>
  <td>${student.age}</td>
  <td>${student.subjects.join(", ")}</td>
  <td>${student.attendance}%</td>
  <td>${student.progress}%</td>
`;
  tbody.appendChild(tr);
  });
}

// Charts
function generateCharts(students) {
  const ctx1 = document.getElementById("progressChart").getContext("2d");
  const ctx2 = document.getElementById("attendanceChart").getContext("2d");

  const progressData = students.map(s => s.progress);
  const attendanceData = students.map(s => s.attendance);
  const labels = students.map(s => s.name);

  if (window.progressChart) window.progressChart.destroy();
  if (window.attendanceChart) window.attendanceChart.destroy();

  window.progressChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Progress (%)",
        data: progressData,
        backgroundColor: "#6a5acd"
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  window.attendanceChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Attendance (%)",
        data: attendanceData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "#ff4c68",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

// Export table data as CSV
function exportCSV() {
  const rows = [["Name", "Age", "Subjects", "Attendance", "Progress"]];
  const trs = document.querySelectorAll("#report-table tbody tr");

  trs.forEach(tr => {
    const cells = [...tr.children].map(td => td.textContent);
    rows.push(cells);
  });

  let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "student_report.csv");
  document.body.appendChild(link);
  link.click();
}
