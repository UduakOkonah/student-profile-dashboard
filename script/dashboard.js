document.addEventListener("DOMContentLoaded", () => {
    fetch("data/students.json")
      .then((response) => response.json())
      .then((students) => {
        renderStudentTable(students);
        updateStats(students);
      })
      .catch((error) => console.error("Error loading student data:", error));
  });
  
  function renderStudentTable(students) {
    const tableBody = document.getElementById("student-table-body");
    tableBody.innerHTML = "";
  
    students.forEach((student, index) => {
      const row = document.createElement("tr");
  
      const subjects = student.subjects.join(", ");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${subjects}</td>
        <td>${student.attendance}%</td>
        <td>${student.progress}%</td>
        <td>
          <button class="edit-btn" onclick="editStudent(${index})">✏️</button>
          <button class="delete-btn" onclick="deleteStudent(${index})">🗑️</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }
  
  function updateStats(students) {
    const total = students.length;
    const avgAttendance = (
      students.reduce((sum, s) => sum + s.attendance, 0) / total
    ).toFixed(1);
    const avgProgress = (
      students.reduce((sum, s) => sum + s.progress, 0) / total
    ).toFixed(1);
  
    const subjectSet = new Set();
    students.forEach((s) => s.subjects.forEach((sub) => subjectSet.add(sub)));
  
    document.getElementById("total-students").textContent = total;
    document.getElementById("avg-attendance").textContent = `${avgAttendance}%`;
    document.getElementById("avg-progress").textContent = `${avgProgress}%`;
    document.getElementById("active-courses").textContent = subjectSet.size;
  }
  
  // Optional placeholders for edit/delete
  function editStudent(index) {
    alert(`Edit function not yet implemented for student ${index + 1}`);
  }
  
  function deleteStudent(index) {
    alert(`Delete function not yet implemented for student ${index + 1}`);
  }
  