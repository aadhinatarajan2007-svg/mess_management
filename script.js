let members = JSON.parse(localStorage.getItem("members")) || [];
let editId = null;

const nameInput = document.getElementById("name");
const roomInput = document.getElementById("room");
const planInput = document.getElementById("plan");
const submitBtn = document.getElementById("submitBtn");
const memberList = document.getElementById("memberList");

function saveToStorage() {
  localStorage.setItem("members", JSON.stringify(members));
}

function renderMembers() {
  memberList.innerHTML = "";

  members.forEach(member => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.room}</td>
      <td>${member.plan}</td>
      <td>
        <button onclick="startEdit('${member.id}')">Edit</button>
        <button onclick="deleteMember('${member.id}')">Delete</button>
      </td>
    `;

    memberList.appendChild(row);
  });
}

submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const room = roomInput.value.trim();
  const plan = planInput.value;

  if (!name || !room) {
    alert("Name and Room No are required");
    return;
  }

  if (editId) {
    // UPDATE
    const member = members.find(m => m.id === editId);
    member.name = name;
    member.room = room;
    member.plan = plan;

    editId = null;
    submitBtn.textContent = "Add Member";
  } else {
    // CREATE
    const newMember = {
      id: Date.now().toString(),
      name,
      room,
      plan
    };
    members.push(newMember);
  }

  saveToStorage();
  renderMembers();
  clearForm();
});

function startEdit(id) {
  const member = members.find(m => m.id === id);

  nameInput.value = member.name;
  roomInput.value = member.room;
  planInput.value = member.plan;

  editId = id;
  submitBtn.textContent = "Update Member";
}

function deleteMember(id) {
  if (!confirm("Are you sure you want to delete?")) return;

  members = members.filter(m => m.id !== id);
  saveToStorage();
  renderMembers();
}

function clearForm() {
  nameInput.value = "";
  roomInput.value = "";
}

renderMembers();
